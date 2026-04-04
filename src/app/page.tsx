import Link from "next/link";

const features = [
  {
    title: "Smart Meeting Summaries",
    description:
      "Capture key decisions instantly and turn long discussions into concise, searchable summaries.",
    icon: "A",
  },
  {
    title: "AI Agents That Execute",
    description:
      "Trigger next steps automatically with intelligent agents that turn plans into actions.",
    icon: "B",
  },
  {
    title: "Organized Team Follow-ups",
    description:
      "Keep everyone aligned with structured updates, reminders, and clear ownership of tasks.",
    icon: "C",
  },
];

const steps = [
  {
    number: "01",
    title: "Connect",
    description: "Set up your workflow and invite your team in minutes.",
  },
  {
    number: "02",
    title: "Capture",
    description: "Let Elevate AI join conversations and extract what matters.",
  },
  {
    number: "03",
    title: "Execute",
    description: "Convert discussions into clear next actions and momentum.",
  },
];

const Page = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
      <div className="pointer-events-none fixed -left-48 -top-48 h-[34rem] w-[34rem] rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none fixed -right-48 top-1/3 h-[34rem] w-[34rem] rounded-full bg-cyan-400/20 blur-3xl" />
      <div
        className="pointer-events-none fixed inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.2) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-10">
            <Link href="/" className="text-2xl font-black tracking-tight text-slate-900">
              Elevate AI
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/auth/sign-in"
              className="hidden rounded-full px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 sm:block"
            >
              Sign In
            </Link>
            <Link
              href="/auth/sign-up"
              className="rounded-full bg-gradient-to-r from-blue-700 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition-transform hover:scale-[1.02]"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-28">
        <section className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 pb-24 pt-8 md:grid-cols-2 lg:px-8 lg:pb-32 lg:pt-14">
          <div className="max-w-2xl space-y-8">
            <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.03em] text-slate-900 md:text-7xl">
              Turn Every Meeting Into <span className="text-blue-700">Action</span>
            </h1>
            <p className="text-lg leading-relaxed text-slate-600 md:text-xl">
              Elevate AI captures conversations, highlights decisions, and transforms ideas into trackable next steps with intelligent agents.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/auth/sign-in"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-700 to-blue-500 px-9 py-4 text-base font-bold text-white shadow-xl shadow-blue-700/20"
              >
                Sign In
              </Link>
              <Link
                href="/auth/sign-up"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-9 py-4 text-base font-bold text-slate-800 transition-colors hover:bg-slate-100"
              >
                Sign Up
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-blue-500/10 blur-2xl" />
            <div className="relative aspect-video overflow-hidden rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-800 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(56,189,248,0.35),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(96,165,250,0.3),transparent_40%)]" />
              <div className="absolute bottom-6 left-6 rounded-xl border border-white/30 bg-white/85 p-4 shadow-lg backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-800">Analysis complete</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">4 key action items generated</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-7 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-[0_20px_40px_rgba(15,23,42,0.08)] transition-shadow hover:shadow-[0_30px_60px_rgba(15,23,42,0.14)]"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-lg font-black text-blue-700">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">{feature.title}</h3>
                <p className="leading-relaxed text-slate-600">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl overflow-hidden px-6 py-16 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">The Intelligent Workflow</h2>
          </div>
          <div className="relative grid gap-10 md:grid-cols-3">
            <div className="pointer-events-none absolute left-[16%] right-[16%] top-12 hidden h-px bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 md:block" />
            {steps.map((step, index) => (
              <div key={step.number} className="relative z-10 mx-auto max-w-xs text-center">
                <div
                  className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 text-2xl font-black shadow-xl ${
                    index === 1
                      ? "border-blue-500 bg-blue-700 text-white"
                      : "border-slate-200 bg-white text-blue-700"
                  }`}
                >
                  {step.number}
                </div>
                <h4 className="mb-2 text-2xl font-bold text-slate-900">{step.title}</h4>
                <p className="text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mb-16 w-full max-w-7xl px-6 py-16 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-10 text-center md:p-16">
            <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-blue-500/35 blur-3xl" />
            <div className="relative z-10 mx-auto max-w-3xl">
              <h2 className="text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
                Start free and bring clarity to every conversation.
              </h2>
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/auth/sign-in"
                  className="inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-lg font-bold text-blue-700"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="inline-flex items-center justify-center rounded-full border-2 border-white/25 px-10 py-4 text-lg font-bold text-white transition-colors hover:bg-white/10"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Page;