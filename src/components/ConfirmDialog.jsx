import { useEffect, useRef } from "react";

export default function ConfirmDialog({ subscription, onConfirm, onCancel }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onCancel();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll("button");
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
  }, [onCancel]);

  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-desc"
        className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-xl"
      >
        <h2 id="confirm-title" className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          Delete subscription?
        </h2>
        <p id="confirm-desc" className="text-sm text-slate-500 dark:text-slate-400 mb-5">
          This will permanently remove "{subscription.name}" from your list. This can't be undone.
        </p>
        <div className="flex gap-2">
          <button
            onClick={onConfirm}
            autoFocus
            className="flex-1 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold py-2 transition-colors"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium py-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
