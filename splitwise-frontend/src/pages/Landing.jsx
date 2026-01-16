import Navbar from "../components/layout/Navbar";
import {
  FiUsers,
  FiTrendingUp,
  FiShield,
  FiSmartphone,
  FiCheckCircle,
} from "react-icons/fi";

export default function Landing() {
  return (
    <>
      {/* GLOBAL BACKGROUND EFFECTS */}
      <div className="fixed inset-0 -z-10 bg-slate-950 overflow-hidden">
        <div className="absolute top-[-300px] left-[-300px] w-[600px] h-[600px] bg-cyan-500/10 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-[-300px] right-[-300px] w-[600px] h-[600px] bg-indigo-500/10 blur-3xl rounded-full animate-pulse" />
      </div>

      <Navbar />

      {/* ===========================
          🔥 YOUR ORIGINAL CODE START
         =========================== */}

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-32 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Split expenses. <br />
            <span className="text-cyan-400">Not friendships.</span>
          </h1>

          <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
            Track group expenses, see who owes whom, and settle up instantly —
            without awkward conversations.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <a
              href="/register"
              className="px-8 py-3 rounded-xl bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition"
            >
              Get Started Free
            </a>
            <a
              href="/login"
              className="px-8 py-3 rounded-xl border border-slate-700 text-white hover:bg-slate-800 transition"
            >
              Login
            </a>
          </div>
        </div>

        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/20 blur-3xl rounded-full" />
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Group Expenses",
            desc: "Create groups and track shared expenses effortlessly.",
          },
          {
            title: "Instant Balances",
            desc: "Know exactly who owes whom at any time.",
          },
          {
            title: "Easy Settlements",
            desc: "Settle up with friends in one click.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500 transition"
          >
            <h3 className="text-xl font-semibold text-cyan-400">
              {item.title}
            </h3>
            <p className="mt-4 text-slate-400">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center mb-16">
          How <span className="text-cyan-400">SplitWise</span> Works
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              step: "01",
              title: "Create a Group",
              desc: "Add friends, roommates, or trip buddies into one group in seconds.",
            },
            {
              step: "02",
              title: "Add Expenses",
              desc: "Log expenses instantly and SplitWise does the math for you.",
            },
            {
              step: "03",
              title: "Settle Up",
              desc: "Clear balances with minimal transactions and zero confusion.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="relative group bg-slate-900 border border-slate-800 rounded-2xl p-10 hover:border-cyan-500 transition duration-300"
            >
              <span className="absolute -top-6 left-6 text-6xl font-extrabold text-cyan-500/10">
                {item.step}
              </span>
              <h3 className="text-xl font-semibold text-cyan-400 mt-6">
                {item.title}
              </h3>
              <p className="mt-4 text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===========================
          🔥 YOUR ORIGINAL CODE END
         =========================== */}

      {/* 🔥 VALUE PROPOSITION */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-4 gap-8">
        {[
          { icon: FiUsers, text: "Built for groups of any size" },
          { icon: FiTrendingUp, text: "Always accurate calculations" },
          { icon: FiShield, text: "Secure & private data" },
          { icon: FiSmartphone, text: "Works perfectly on mobile" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 text-center hover:border-cyan-500 transition"
          >
            <item.icon className="mx-auto text-cyan-400 text-3xl mb-4" />
            <p className="text-slate-300">{item.text}</p>
          </div>
        ))}
      </section>

      {/* 🔥 SOCIAL PROOF / STATS */}
      <section className="border-y border-slate-800 py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 text-center gap-12">
          {[
            { value: "10K+", label: "Active Users" },
            { value: "50K+", label: "Expenses Tracked" },
            { value: "99.9%", label: "Calculation Accuracy" },
          ].map((item, i) => (
            <div key={i}>
              <h3 className="text-4xl font-extrabold text-cyan-400">
                {item.value}
              </h3>
              <p className="mt-2 text-slate-400">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔥 FINAL TRUST CTA */}
      <section className="py-32 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold">
          Built to <span className="text-cyan-400">protect friendships</span>
        </h2>
        <p className="mt-6 text-slate-400 max-w-2xl mx-auto">
          No confusion. No awkward talks. Just clear expenses and happy groups.
        </p>

        <div className="mt-10 flex justify-center gap-6">
          <a
            href="/register"
            className="px-10 py-4 rounded-2xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition"
          >
            Start Free
          </a>
          <span className="flex items-center gap-2 text-slate-400">
            <FiCheckCircle className="text-cyan-400" />
            No credit card required
          </span>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-6 text-center text-slate-500">
        © {new Date().getFullYear()} SplitWise — Built with ❤️
      </footer>
    </>
  );
}
