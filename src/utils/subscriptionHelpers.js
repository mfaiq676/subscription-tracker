export function validateSubscription(formData) {
  const errors = {};
  const trimmedName = formData.name.trim();
  const amount = Number(formData.amount);

  if (!trimmedName) {
    errors.name = "Name is required.";
  }
  if (formData.amount === "" || !Number.isFinite(amount)) {
    errors.amount = "Enter a valid amount.";
  } else if (amount <= 0) {
    errors.amount = "Amount must be greater than 0.";
  }

  return errors;
}

export function createSubscription(formData) {
  const now = Date.now();
  return {
    id: now.toString(),
    name: formData.name.trim(),
    amount: Number(formData.amount),
    category: formData.category,
    createdAt: now,
  };
}

export function updateSubscription(subscription, formData) {
  return {
    ...subscription,
    name: formData.name.trim(),
    amount: Number(formData.amount),
    category: formData.category,
  };
}

export function validateBudget(rawValue) {
  const value = Number(rawValue);
  if (rawValue === "" || !Number.isFinite(value)) {
    return "Enter a valid budget amount.";
  }
  if (value < 0) {
    return "Budget can't be negative.";
  }
  return "";
}
