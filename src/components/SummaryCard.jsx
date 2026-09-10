export default function SummaryCard({ monthlyTotal, activeCount }) {
  return (
    <section className="rounded-2xl bg-slate-800 dark:bg-slate-900 p-6 sm:p-7 text-white">
      <p className="text-xs font-semibold tracking-widest uppercase text-slate-300 mb-3">
        Total Monthly Spending
      </p>

      <p className="text-4xl sm:text-5xl font-extrabold tracking-tight">
        ${monthlyTotal.toFixed(2)}
        <span className="text-base font-normal text-slate-300 ml-2">/ month</span>
      </p>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/15 text-sm">
        <span className="text-slate-300">
          {activeCount} active subscription{activeCount !== 1 ? "s" : ""}
        </span>
        <span className="bg-black/25 rounded-lg px-3 py-1 font-medium">
          Yearly: ${(monthlyTotal * 12).toFixed(2)}
        </span>
      </div>
    </section>
  );
}
