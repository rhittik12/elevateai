# ElevateAI

ElevateAI is an innovative platform that enables real-time video conversations with AI agents. Experience seamless interaction as you talk face-to-face with intelligent AI personalities, designed to elevate your professional potential through immersive communication.

## Live Demo

Check out the live application here: [https://elevateai-five.vercel.app/](https://elevateai-five.vercel.app/)

## Features

- **Dashboard**: A centralized hub for managing your activities and insights.
- **Authentication**: Secure user authentication powered by Better Auth.
- **Video Calls**: Real-time video communication capabilities using Stream IO.
- **AI Integration**: Leverages OpenAI for intelligent features and interactions.
- **Responsive Design**: Built with Tailwind CSS for a seamless experience across devices.

## Tech Stack

This project is built using a modern, robust technology stack:

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [Neon](https://neon.tech/) (PostgreSQL) with [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **Real-time Video**: [Stream IO](https://getstream.io/)
- **AI**: [OpenAI](https://openai.com/)
- **API**: [tRPC](https://trpc.io/) & [TanStack Query](https://tanstack.com/query/latest)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

- `DATABASE_URL`
- `BETTER_AUTH_URL`
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `POLAR_ACCESS_TOKEN`
- `NEXT_PUBLIC_STREAM_CHAT_API_KEY`
- `STREAM_CHAT_SECRET_KEY`
- `NEXT_PUBLIC_STREAM_VIDEO_API_KEY`
- `STREAM_VIDEO_SECRET_KEY`
- `OPENAI_API_KEY`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
