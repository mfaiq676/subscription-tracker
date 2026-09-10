import { validateBudget } from "../utils/subscriptionHelpers";

export default function BudgetCard({ budget, onBudgetChange, monthlyTotal }) {
  const budgetError = validateBudget(budget);
  const numericBudget = Number(budget);
  const isValidBudget = budgetError === "";

  const percentage =
    isValidBudget && numericBudget > 0
      ? Math.min((monthlyTotal / numericBudget) * 100, 100)
      : 0;

  const isOverBudget = isValidBudget && monthlyTotal > numericBudget;

  return (
    <section className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
        Monthly Budget
      </h3>

      <label htmlFor="budget-input" className="sr-only">
        Monthly budget amount
      </label>
      <input
        id="budget-input"
        type="number"
        value={budget}
        onChange={(e) => onBudgetChange(e.target.value)}
        aria-invalid={!isValidBudget}
        aria-describedby={budgetError ? "budget-error" : undefined}
        className={`w-full max-w-[180px] rounded-lg border px-3 py-2 text-sm outline-none
          bg-white dark:bg-slate-900 text-slate-900 dark:text-white
          ${budgetError ? "border-red-400 focus:border-red-500" : "border-slate-300 dark:border-slate-600 focus:border-slate-500"}`}
      />
      {budgetError && (
        <p id="budget-error" className="text-xs text-red-500 mt-1">
          {budgetError}
        </p>
      )}

      <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden mt-4 mb-3">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            isOverBudget ? "bg-red-500" : "bg-emerald-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {isValidBudget && (
        <p
          className={`text-sm ${
            isOverBudget
              ? "text-red-500 font-medium"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          {isOverBudget
            ? `$${(monthlyTotal - numericBudget).toFixed(2)} over budget`
            : `$${(numericBudget - monthlyTotal).toFixed(2)} remaining`}
        </p>
      )}
    </section>
  );
}
