import { EditIcon, TrashIcon } from "../icons";

export default function SubscriptionItem({ subscription, onEdit, onDeleteRequest }) {
  return (
    <div className="flex items-center justify-between gap-3 py-4 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
          {subscription.name}
        </h3>
        <span className="inline-block mt-1 text-xs bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 rounded px-2 py-0.5">
          {subscription.category}
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <strong className="text-base font-bold text-slate-900 dark:text-white">
          ${Number(subscription.amount).toFixed(2)}
        </strong>

        <button
          onClick={() => onEdit(subscription)}
          aria-label={`Edit ${subscription.name}`}
          className="flex flex-col items-center justify-center gap-0.5 w-12 h-11 rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition-colors"
        >
          <EditIcon size={14} />
          <span className="text-[10px] font-medium leading-none">Edit</span>
        </button>

        <button
          onClick={() => onDeleteRequest(subscription)}
          aria-label={`Delete ${subscription.name}`}
          className="flex flex-col items-center justify-center gap-0.5 w-12 h-11 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
        >
          <TrashIcon size={14} />
          <span className="text-[10px] font-medium leading-none">Delete</span>
        </button>
      </div>
    </div>
  );
}
