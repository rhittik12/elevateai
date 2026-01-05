import { and, eq, not } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import {
    MessageNewEvent,
    CallEndedEvent,
    CallTranscriptionReadyEvent,
    CallSessionParticipantLeftEvent,
    CallRecordingReadyEvent,
    CallSessionStartedEvent,
} from "@stream-io/node-sdk";

import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { streamVideo } from "@/lib/stream-video";
import { inngest } from "@/inngest/client";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { generateAvatarUri } from "@/lib/avatar";
import { streamChat } from "@/lib/stream-chat";

const openaiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

function verifyVideoWebhook(body: string, signature: string): boolean {
    return streamVideo.verifyWebhook(body, signature);
}

function verifyChatWebhook(body: string, signature: string): boolean {
    return streamChat.verifyWebhook(body, signature);
}

export async function POST(req: NextRequest) {
    const signature = req.headers.get("x-signature");
    const apiKey = req.headers.get("x-api-key");

    if (!signature || !apiKey) {
        return NextResponse.json(
            { error: "Missing signature or API key" },
            { status: 400 }
        );
    }

    const body = await req.text();

    let payload: unknown;

    try {
        payload = JSON.parse(body) as Record<string, unknown>;
    } catch {
        return NextResponse.json(
            { error: "Invalid JSON" },
            { status: 400 }
        );
    }

    const eventType = (payload as Record<string, unknown>)?.type;

    // Use different verification based on event type
    const isChatEvent = eventType === "message.new";

    if (isChatEvent) {
        if (!verifyChatWebhook(body, signature)) {
            return NextResponse.json(
                { error: "Invalid signature" },
                { status: 401 }
            );
        }
    } else {
        if (!verifyVideoWebhook(body, signature)) {
            return NextResponse.json(
                { error: "Invalid signature" },
                { status: 401 }
            );
        }
    }

    if (eventType === "call.session_started") {
        const event = payload as CallSessionStartedEvent;
        const meetingId = event.call.custom?.meetingId;

        if (!meetingId) {
            return NextResponse.json(
                { error: "Missing meetingId" },
                { status: 400 }
            );
        }

        const [existingMeeting] = await db
            .select()
            .from(meetings)
            .where(
                and(
                    eq(meetings.id, meetingId),
                    not(eq(meetings.status, "completed")),
                    not(eq(meetings.status, "active")),
                    not(eq(meetings.status, "cancelled")),
                    not(eq(meetings.status, "processing"))
                )
            );

        if (!existingMeeting) {
            return NextResponse.json(
                { error: "Meeting not found" },
                { status: 404 }
            );
        }

        await db
            .update(meetings)
            .set({
                status: "active",
                startedAt: new Date(),
            })
            .where(eq(meetings.id, existingMeeting.id));

        const [existingAgent] = await db
            .select()
            .from(agents)
            .where(eq(agents.id, existingMeeting.agentId));

        if (!existingAgent) {
            return NextResponse.json(
                { error: "Agent not found" },
                { status: 404 }
            );
        }

        const call = streamVideo.video.call("default", meetingId);

        try {
            console.log("🤖 Connecting to OpenAI Realtime...");

            const realtimeClient = await streamVideo.video.connectOpenAi({
                call,
                openAiApiKey: process.env.OPENAI_API_KEY!,
                agentUserId: existingAgent.id,
            });

            console.log("✅ OpenAI connected, updating session...");

            realtimeClient.updateSession({
                instructions: existingAgent.instructions ?? "",
                modalities: ["text", "audio"],
                input_audio_transcription: {
                    model: "whisper-1",
                },
                turn_detection: {
                    type: "server_vad",
                },
                voice: "alloy",
            });

            console.log("✅ Session updated with instructions");
        } catch (error) {
            console.error("❌ OpenAI Realtime connection failed:", error);
            return NextResponse.json(
                { error: "OpenAI connection failed", details: String(error) },
                { status: 500 }
            );
        }

    } else if (eventType === "call.session_participant_left") {
        const event = payload as CallSessionParticipantLeftEvent;
        const meetingId = event.call_cid.split(":")[1];

        if (!meetingId) {
            return NextResponse.json(
                { error: "Missing meetingId" },
                { status: 400 }
            );
        }

        const call = streamVideo.video.call("default", meetingId);
        await call.end();

    } else if (eventType === "call.session_ended") {
        const event = payload as CallEndedEvent;
        const meetingId = event.call.custom?.meetingId;

        if (!meetingId) {
            return NextResponse.json(
                { error: "Missing meetingId" },
                { status: 400 }
            );
        }

        await db
            .update(meetings)
            .set({
                status: "processing",
                endedAt: new Date(),
            })
            .where(
                and(
                    eq(meetings.id, meetingId),
                    eq(meetings.status, "active")
                )
            );

    } else if (eventType === "call.transcription_ready") {
        const event = payload as CallTranscriptionReadyEvent;
        const meetingId = event.call_cid.split(":")[1];

        const [updatedMeeting] = await db
            .update(meetings)
            .set({
                transcriptUrl: event.call_transcription.url,
            })
            .where(eq(meetings.id, meetingId))
            .returning();

        if (!updatedMeeting) {
            return NextResponse.json(
                { error: "Meeting not found" },
                { status: 404 }
            );
        }

        await inngest.send({
            name: "meetings/processing",
            data: {
                meetingId: updatedMeeting.id,
                transcriptUrl: updatedMeeting.transcriptUrl,
            },
        });

    } else if (eventType === "call.recording_ready") {
        const event = payload as CallRecordingReadyEvent;
        const meetingId = event.call_cid.split(":")[1];

        await db
            .update(meetings)
            .set({
                recordingUrl: event.call_recording.url,
            })
            .where(eq(meetings.id, meetingId));

    } else if (eventType === "message.new") {
        const event = payload as MessageNewEvent;

        const userId = event.user?.id;
        const channelId = event.channel_id;
        const text = event.message?.text;

        if (!userId || !channelId || !text) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const [existingMeeting] = await db
            .select()
            .from(meetings)
            .where(
                and(
                    eq(meetings.id, channelId),
                    eq(meetings.status, "completed")
                )
            );

        if (!existingMeeting) {
            // Return 200 for events we intentionally ignore
            return NextResponse.json({ status: "ok - not a completed meeting" });
        }

        const [existingAgent] = await db
            .select()
            .from(agents)
            .where(eq(agents.id, existingMeeting.agentId));

        if (!existingAgent) {
            return NextResponse.json(
                { error: "Agent not found" },
                { status: 404 }
            );
        }

        // Ignore messages from the AI agent itself
        if (userId === existingAgent.id) {
            return NextResponse.json({ status: "ok - agent message ignored" });
        }

        const instructions = `
            You are an AI assistant helping the user revisit a recently completed meeting.

            Below is the meeting summary:
            ${existingMeeting.summary}

            Behavioral guidelines from the original meeting assistant:
            ${existingAgent.instructions}

            IMPORTANT RULES:
            - When asked for the summary, provide it directly and concisely WITHOUT rephrasing or elaborating multiple times.
            - Keep responses short and to the point.
            - Do not repeat information unnecessarily.
            - If asked a specific question, answer it directly.
            - Only elaborate when specifically asked for more details.
            - Use the conversation history for context, but avoid redundancy.

            If the summary doesn't contain enough information to answer a question, briefly let the user know.
        `;

        const channel = streamChat.channel("messaging", channelId);
        await channel.watch();

        const previousMessages = channel.state.messages
            .slice(-5)
            .filter((msg) => msg.text && msg.text.trim() !== "")
            .map<ChatCompletionMessageParam>((message) => ({
                role:
                    message.user?.id === existingAgent.id
                        ? "assistant"
                        : "user",
                content: message.text || "",
            }));

        const GPTResponse = await openaiClient.chat.completions.create({
            messages: [
                { role: "system", content: instructions },
                ...previousMessages,
                { role: "user", content: text },
            ],
            model: "gpt-4o",
        });

        const GPTResponseText = GPTResponse.choices[0].message.content;

        if (!GPTResponseText) {
            return NextResponse.json(
                { error: "No response from GPT" },
                { status: 400 }
            );
        }

        const avatarUrl = generateAvatarUri({
            seed: existingAgent.name,
            variant: "botttsNeutral",
        });

        await streamChat.upsertUser({
            id: existingAgent.id,
            name: existingAgent.name,
            image: avatarUrl,
        });

        await channel.sendMessage({
            text: GPTResponseText,
            user_id: existingAgent.id,
        });
    }

    return NextResponse.json({ status: "ok" });
}