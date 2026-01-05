import { useState } from "react";
import { DefaultVideoPlaceholder, StreamTheme, StreamVideoParticipant, useCall } from "@stream-io/video-react-sdk";
import { CallLobby } from "./call-lobby";
import { authClient } from "@/lib/auth-client";
import { generateAvatarUri } from "@/lib/avatar";
import { CallActive } from "./call-active";
import { CallEnded } from "./call-ended";

interface Props {
    meetingName: string;
};


export const CallUI = ({ meetingName }: Props) => {
    const call = useCall();
    const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");

    const handleJoin = async () => {
        if (!call) return;

        try {
            // Join the call first
            await call.join({ create: false });
            console.log("✅ Joined call");

            // IMPORTANT: Enable microphone after joining
            await call.microphone.enable();
            console.log("✅ Microphone enabled");

            // Optionally enable camera too
            // await call.camera.enable();

            setShow("call");
        } catch (error) {
            console.error("❌ Failed to join call:", error);
        }
    };

    const handleLeave = () => {
        if (!call) return;

        call.endCall();
        setShow("ended");
    };

    return (
        <StreamTheme className="h-full">
            {show === "lobby" && <CallLobby onJoin={handleJoin} />}
            {show === "call" && <CallActive onLeave={handleLeave} meetingName={meetingName} />}
            {show === "ended" && <CallEnded />}
        </StreamTheme>
    );

};
