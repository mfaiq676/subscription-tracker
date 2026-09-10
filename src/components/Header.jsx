import { SunIcon, MoonIcon } from "../icons";

export default function Header({ isDark, onToggleDark }) {
  return (
    <header className="flex items-center justify-between rounded-2xl bg-slate-900 dark:bg-black p-5 sm:p-6 text-white">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Subscription Tracker
        </h1>
        <p className="text-sm text-slate-300 mt-0.5">
          Manage your monthly subscriptions
        </p>
      </div>

      <button
        onClick={onToggleDark}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>
    </header>
  );
}
