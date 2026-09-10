import { useEffect, useRef } from "react";
import { CloseIcon } from "../icons";
import { CATEGORIES } from "../data/subscriptions";

export default function SubscriptionModal({
  formData,
  errors,
  isEditing,
  onFieldChange,
  onSubmit,
  onClose,
}) {
  const nameInputRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          "input, select, button"
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 id="modal-title" className="text-lg font-semibold text-slate-900 dark:text-white">
            {isEditing ? "Edit Subscription" : "Add Subscription"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
          >
            <CloseIcon size={16} />
          </button>
        </div>

        <form onSubmit={onSubmit} noValidate>
          <label htmlFor="sub-name" className="block text-sm text-slate-700 dark:text-slate-300 mb-1">
            Name
          </label>
          <input
            id="sub-name"
            ref={nameInputRef}
            type="text"
            value={formData.name}
            onChange={(e) => onFieldChange("name", e.target.value)}
            placeholder="Netflix"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`w-full rounded-lg border px-3 py-2 mb-1 text-sm outline-none
              bg-white dark:bg-slate-900 text-slate-900 dark:text-white
              ${errors.name ? "border-red-400" : "border-slate-300 dark:border-slate-600"}`}
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-red-500 mb-3">
              {errors.name}
            </p>
          )}
          {!errors.name && <div className="mb-3" />}

          <label htmlFor="sub-amount" className="block text-sm text-slate-700 dark:text-slate-300 mb-1">
            Monthly Amount
          </label>
          <input
            id="sub-amount"
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => onFieldChange("amount", e.target.value)}
            placeholder="9.99"
            aria-invalid={!!errors.amount}
            aria-describedby={errors.amount ? "amount-error" : undefined}
            className={`w-full rounded-lg border px-3 py-2 mb-1 text-sm outline-none
              bg-white dark:bg-slate-900 text-slate-900 dark:text-white
              ${errors.amount ? "border-red-400" : "border-slate-300 dark:border-slate-600"}`}
          />
          {errors.amount && (
            <p id="amount-error" className="text-xs text-red-500 mb-3">
              {errors.amount}
            </p>
          )}
          {!errors.amount && <div className="mb-3" />}

          <label htmlFor="sub-category" className="block text-sm text-slate-700 dark:text-slate-300 mb-1">
            Category
          </label>
          <select
            id="sub-category"
            value={formData.category}
            onChange={(e) => onFieldChange("category", e.target.value)}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 mb-4 text-sm outline-none
                       bg-white dark:bg-slate-900 text-slate-900 dark:text-white [color-scheme:light] dark:[color-scheme:dark]"
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full rounded-lg bg-slate-800 hover:bg-slate-700 dark:bg-slate-600 dark:hover:bg-slate-500
                       text-white font-semibold py-2.5 transition-colors"
          >
            {isEditing ? "Save Changes" : "Add Subscription"}
          </button>
        </form>
      </div>
    </div>
  );
}
