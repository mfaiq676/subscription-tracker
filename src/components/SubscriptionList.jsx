import SubscriptionItem from "./SubscriptionItem";

export default function SubscriptionList({ subscriptions, onEdit, onDeleteRequest }) {
  return (
    <section className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
        Your Subscriptions
      </h2>

      {subscriptions.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400 py-4">
          No subscriptions found.
        </p>
      ) : (
        <div>
          {subscriptions.map((subscription) => (
            <SubscriptionItem
              key={subscription.id}
              subscription={subscription}
              onEdit={onEdit}
              onDeleteRequest={onDeleteRequest}
            />
          ))}
        </div>
      )}
    </section>
  );
}
