import { useState, useMemo, useEffect } from "react";
import Header from "./components/Header";
import SummaryCard from "./components/SummaryCard";
import BudgetCard from "./components/BudgetCard";
import SearchAndFilters from "./components/SearchAndFilters";
import SubscriptionList from "./components/SubscriptionList";
import SubscriptionModal from "./components/SubscriptionModal";
import ConfirmDialog from "./components/ConfirmDialog";
import { initialSubscriptions } from "./data/subscriptions";
import {
  validateSubscription,
  createSubscription,
  updateSubscription,
} from "./utils/subscriptionHelpers";

const emptyFormData = { name: "", amount: "", category: "Entertainment" };

export default function App() {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("recent");
  const [budget, setBudget] = useState("150");
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  const [showModal, setShowModal] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [formData, setFormData] = useState(emptyFormData);
  const [errors, setErrors] = useState({});

  const [pendingDelete, setPendingDelete] = useState(null);

  // Tailwind's `dark:` classes respond to this class on <html>,
  // not to component state directly — see index.css setup note.
  // The preference is also saved to localStorage so it survives a refresh.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const monthlyTotal = useMemo(
    () => subscriptions.reduce((total, sub) => total + Number(sub.amount), 0),
    [subscriptions]
  );

  const filteredSubscriptions = useMemo(() => {
    let result = [...subscriptions];

    if (search.trim() !== "") {
      const query = search.toLowerCase();
      result = result.filter((sub) => sub.name.toLowerCase().includes(query));
    }

    if (selectedCategory !== "All") {
      result = result.filter((sub) => sub.category === selectedCategory);
    }

    if (sortBy === "high") result.sort((a, b) => b.amount - a.amount);
    else if (sortBy === "low") result.sort((a, b) => a.amount - b.amount);
    else if (sortBy === "name") result.sort((a, b) => a.name.localeCompare(b.name));
    else result.sort((a, b) => b.createdAt - a.createdAt); // "recent" — newest first

    return result;
  }, [subscriptions, search, selectedCategory, sortBy]);

  function openAddModal() {
    setEditingSubscription(null);
    setFormData(emptyFormData);
    setErrors({});
    setShowModal(true);
  }

  function openEditModal(subscription) {
    setEditingSubscription(subscription);
    setFormData({
      name: subscription.name,
      amount: String(subscription.amount),
      category: subscription.category,
    });
    setErrors({});
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingSubscription(null);
    setFormData(emptyFormData);
    setErrors({});
  }

  function handleFieldChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear that field's error as soon as the user starts fixing it
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateSubscription(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (editingSubscription) {
      setSubscriptions((prev) =>
        prev.map((sub) =>
          sub.id === editingSubscription.id ? updateSubscription(sub, formData) : sub
        )
      );
    } else {
      setSubscriptions((prev) => [createSubscription(formData), ...prev]);
    }

    closeModal();
  }

  function confirmDelete() {
    setSubscriptions((prev) => prev.filter((sub) => sub.id !== pendingDelete.id));
    setPendingDelete(null);
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors py-6 px-4 sm:px-8">
      <div className="max-w-2xl mx-auto space-y-5">
        <Header isDark={isDark} onToggleDark={() => setIsDark((d) => !d)} />
        <SummaryCard monthlyTotal={monthlyTotal} activeCount={subscriptions.length} />
        <BudgetCard budget={budget} onBudgetChange={setBudget} monthlyTotal={monthlyTotal} />

        <SearchAndFilters
          search={search}
          onSearchChange={setSearch}
          sortBy={sortBy}
          onSortChange={setSortBy}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onAddClick={openAddModal}
        />

        <SubscriptionList
          subscriptions={filteredSubscriptions}
          onEdit={openEditModal}
          onDeleteRequest={setPendingDelete}
        />
      </div>

      {showModal && (
        <SubscriptionModal
          formData={formData}
          errors={errors}
          isEditing={!!editingSubscription}
          onFieldChange={handleFieldChange}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      )}

      {pendingDelete && (
        <ConfirmDialog
          subscription={pendingDelete}
          onConfirm={confirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </div>
  );
}
