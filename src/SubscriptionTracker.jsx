import { useState, useMemo } from "react";

const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...iconProps}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-4-4" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...iconProps}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" {...iconProps}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 013 3L8 18l-4 1 1-4z" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" {...iconProps}>
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v5M14 11v5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...iconProps}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...iconProps}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...iconProps}>
      <path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z" />
    </svg>
  );
}

function CreditCardIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...iconProps}>
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function TrendingUpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" {...iconProps}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function PiggyBankIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" {...iconProps}>
      <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-3.5c1-.5 1.5-1 2-2.5V8c0-.5-.5-1-1-1h-1c-.2-.6-1.5-2-3-2z" />
      <path d="M16 11h.01" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" {...iconProps}>
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

const initialSubscriptions = [
  { id: 1, name: "Netflix", amount: 15.99, category: "Entertainment" },
  { id: 2, name: "Spotify", amount: 9.99, category: "Entertainment" },
  { id: 3, name: "Notion", amount: 8, category: "Software" },
  { id: 4, name: "Electricity", amount: 62.4, category: "Utilities" },
  { id: 5, name: "Gym Membership", amount: 29.99, category: "Fitness" },
];

const categories = [
  "All",
  "Entertainment",
  "Utilities",
  "Software",
  "Fitness",
  "Other",
];

export default function SubscriptionTracker() {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("recent");
  const [budget, setBudget] = useState(150);
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "Entertainment",
  });

  const monthlyTotal = useMemo(() => {
    return subscriptions.reduce(
      (total, subscription) => total + Number(subscription.amount),
      0
    );
  }, [subscriptions]);

  const filteredSubscriptions = useMemo(() => {
    let result = [...subscriptions];

    if (search.trim() !== "") {
      result = result.filter((subscription) =>
        subscription.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter(
        (subscription) => subscription.category === selectedCategory
      );
    }

    if (sortBy === "high") {
      result.sort((a, b) => b.amount - a.amount);
    } else if (sortBy === "low") {
      result.sort((a, b) => a.amount - b.amount);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [subscriptions, search, selectedCategory, sortBy]);

  const budgetPercentage =
    budget > 0
      ? Math.min((monthlyTotal / Number(budget)) * 100, 100)
      : 0;

  function handleSubmit(event) {
    event.preventDefault();

    if (
      formData.name.trim() === "" ||
      formData.amount === "" ||
      Number(formData.amount) <= 0
    ) {
      alert("Please enter a valid name and amount.");
      return;
    }

    if (editingSubscription) {
      setSubscriptions((previousSubscriptions) =>
        previousSubscriptions.map((subscription) =>
          subscription.id === editingSubscription.id
            ? {
                ...subscription,
                name: formData.name,
                amount: Number(formData.amount),
                category: formData.category,
              }
            : subscription
        )
      );
    } else {
      const newSubscription = {
        id: Date.now(),
        name: formData.name,
        amount: Number(formData.amount),
        category: formData.category,
      };

      setSubscriptions((previousSubscriptions) => [
        newSubscription,
        ...previousSubscriptions,
      ]);
    }

    closeModal();
  }

  function handleEdit(subscription) {
    setEditingSubscription(subscription);
    setFormData({
      name: subscription.name,
      amount: subscription.amount,
      category: subscription.category,
    });
    setShowModal(true);
  }

  function handleDelete(id) {
    setSubscriptions((previousSubscriptions) =>
      previousSubscriptions.filter((subscription) => subscription.id !== id)
    );
  }

  function closeModal() {
    setShowModal(false);
    setEditingSubscription(null);
    setFormData({
      name: "",
      amount: "",
      category: "Entertainment",
    });
  }

  const appStyle = {
    minHeight: "100vh",
    backgroundColor: darkMode ? "#0b132b" : "#f1f5f9",
    color: darkMode ? "#f8fafc" : "#0f172a",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  };

  // Navy Header Banner
  const headerHeroStyle = {
    background: "linear-gradient(135deg, #0b192c 0%, #1e3e62 100%)",
    borderRadius: "16px",
    padding: "20px 24px",
    marginBottom: "25px",
    color: "#ffffff",
    boxShadow: "0 10px 20px -5px rgba(11, 25, 44, 0.25)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
  };

  // Midnight Navy Monthly Spending Card
  const monthlySpendingCardStyle = {
    background: "linear-gradient(135deg, #0b192c 0%, #1e3e62 60%, #000000 100%)",
    borderRadius: "20px",
    padding: "28px",
    marginBottom: "20px",
    color: "#ffffff",
    boxShadow: "0 10px 25px -5px rgba(11, 25, 44, 0.4)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
  };

  // Clean, Standard Card Style (No Gradient Theme)
  const cleanCardStyle = {
    backgroundColor: darkMode ? "#1c2541" : "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "20px",
    boxShadow: darkMode
      ? "0 4px 12px rgba(0,0,0,0.3)"
      : "0 4px 12px rgba(0,0,0,0.06)",
    border: darkMode ? "1px solid #334155" : "1px solid #e2e8f0",
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: darkMode ? "1px solid #334155" : "1px solid #cbd5e1",
    backgroundColor: darkMode ? "#0b192c" : "#ffffff",
    color: darkMode ? "#ffffff" : "#0f172a",
    width: "100%",
    boxSizing: "border-box",
    marginTop: "5px",
    marginBottom: "15px",
  };

  const buttonStyle = {
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  };

  return (
    <div style={appStyle}>
      <div style={{ maxWidth: "900px", margin: "auto" }}>
        
        {/* Navy Themed Top Header Banner */}
        <div
          style={{
            ...headerHeroStyle,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1 style={{ margin: "0 0 4px 0", fontSize: "24px", color: "#ffffff" }}>
              Subscription Tracker
            </h1>
            <p style={{ margin: 0, opacity: 0.8, fontSize: "14px" }}>
              Manage your monthly subscriptions
            </p>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              ...buttonStyle,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              color: "#ffffff",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        {/* Midnight Navy Monthly Spending Card */}
        <div
          style={{
            ...monthlySpendingCardStyle,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.06)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontSize: "12px",
                fontWeight: "600",
                color: "rgba(255, 255, 255, 0.85)",
              }}
            >
              <CreditCardIcon />
              <span>Total Monthly Spending</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                padding: "4px 10px",
                borderRadius: "20px",
                fontSize: "12px",
              }}
            >
              <TrendingUpIcon />
              <span>Active</span>
            </div>
          </div>

          <div
            style={{
              fontSize: "46px",
              fontWeight: "800",
              letterSpacing: "-1px",
              marginBottom: "20px",
              lineHeight: 1,
            }}
          >
            ${monthlyTotal.toFixed(2)}
            <span
              style={{
                fontSize: "16px",
                fontWeight: "400",
                opacity: 0.8,
                marginLeft: "6px",
              }}
            >
              / month
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "16px",
              borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            }}
          >
            <span style={{ fontSize: "14px", fontWeight: "500", opacity: 0.9 }}>
              {subscriptions.length} active subscription
              {subscriptions.length !== 1 ? "s" : ""}
            </span>

            <span
              style={{
                fontSize: "13px",
                fontWeight: "500",
                backgroundColor: "rgba(0, 0, 0, 0.25)",
                padding: "4px 12px",
                borderRadius: "8px",
              }}
            >
              Yearly: ${(monthlyTotal * 12).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Clean Monthly Budget Card */}
        <div style={cleanCardStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "12px",
            }}
          >
            <PiggyBankIcon />
            <h3 style={{ margin: 0, fontSize: "18px" }}>Monthly Budget</h3>
          </div>

          <input
            type="number"
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
            style={{
              ...inputStyle,
              maxWidth: "200px",
            }}
          />

          <div
            style={{
              height: "12px",
              backgroundColor: darkMode ? "#334155" : "#e2e8f0",
              borderRadius: "20px",
              overflow: "hidden",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                width: `${budgetPercentage}%`,
                height: "100%",
                backgroundColor:
                  monthlyTotal > Number(budget) ? "#ef4444" : "#10b981",
                transition: "width 0.3s",
              }}
            />
          </div>

          <p style={{ margin: 0, fontSize: "14px", opacity: 0.8 }}>
            {monthlyTotal > Number(budget)
              ? `$${(monthlyTotal - Number(budget)).toFixed(2)} over budget`
              : `$${(Number(budget) - monthlyTotal).toFixed(2)} remaining`}
          </p>
        </div>

        {/* Filters & Actions */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "15px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
            <div
              style={{
                position: "absolute",
                left: "10px",
                top: "12px",
                color: darkMode ? "#94a3b8" : "#64748b",
              }}
            >
              <SearchIcon />
            </div>

            <input
              type="text"
              placeholder="Search subscriptions..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              style={{
                ...inputStyle,
                paddingLeft: "40px",
                marginBottom: 0,
              }}
            />
          </div>

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: darkMode ? "1px solid #334155" : "1px solid #cbd5e1",
              backgroundColor: darkMode ? "#1c2541" : "#ffffff",
              color: darkMode ? "#ffffff" : "#0f172a",
            }}
          >
            <option value="recent">Recent</option>
            <option value="high">Amount: High to Low</option>
            <option value="low">Amount: Low to High</option>
            <option value="name">Name: A-Z</option>
          </select>

          <button
            onClick={() => {
              setEditingSubscription(null);
              setFormData({
                name: "",
                amount: "",
                category: "Entertainment",
              });
              setShowModal(true);
            }}
            style={{
              ...buttonStyle,
              backgroundColor: "#1e3e62",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontWeight: "600",
            }}
          >
            <PlusIcon />
            Add
          </button>
        </div>

        {/* Category Selector Pills */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                ...buttonStyle,
                backgroundColor:
                  selectedCategory === category
                    ? "#1e3e62"
                    : darkMode
                    ? "#1c2541"
                    : "#e2e8f0",
                color:
                  selectedCategory === category
                    ? "#ffffff"
                    : darkMode
                    ? "#94a3b8"
                    : "#0f172a",
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Clean Subscriptions List Card */}
        <div style={cleanCardStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "15px",
            }}
          >
            <ListIcon />
            <h2 style={{ margin: 0, fontSize: "20px" }}>Your Subscriptions</h2>
          </div>

          {filteredSubscriptions.length === 0 ? (
            <p style={{ opacity: 0.7 }}>No subscriptions found.</p>
          ) : (
            filteredSubscriptions.map((subscription, index) => (
              <div
                key={subscription.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px 0",
                  borderBottom:
                    index === filteredSubscriptions.length - 1
                      ? "none"
                      : darkMode
                      ? "1px solid #334155"
                      : "1px solid #e2e8f0",
                }}
              >
                <div>
                  <h3 style={{ margin: 0, fontSize: "16px" }}>
                    {subscription.name}
                  </h3>
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: "4px",
                      fontSize: "12px",
                      backgroundColor: darkMode ? "#0b192c" : "#f1f5f9",
                      color: darkMode ? "#94a3b8" : "#64748b",
                      padding: "2px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    {subscription.category}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "18px" }}>
                    ${Number(subscription.amount).toFixed(2)}
                  </strong>

                  <button
                    onClick={() => handleEdit(subscription)}
                    style={{
                      ...buttonStyle,
                      backgroundColor: "#f59e0b",
                      color: "#ffffff",
                      padding: "8px",
                    }}
                  >
                    <EditIcon />
                  </button>

                  <button
                    onClick={() => handleDelete(subscription.id)}
                    style={{
                      ...buttonStyle,
                      backgroundColor: "#ef4444",
                      color: "#ffffff",
                      padding: "8px",
                    }}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div
            onClick={closeModal}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              backdropFilter: "blur(4px)",
            }}
          >
            <div
              onClick={(event) => event.stopPropagation()}
              style={{
                backgroundColor: darkMode ? "#1c2541" : "#ffffff",
                color: darkMode ? "#ffffff" : "#0f172a",
                padding: "25px",
                borderRadius: "16px",
                width: "100%",
                maxWidth: "400px",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
                border: darkMode ? "1px solid #334155" : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <h2 style={{ margin: 0, fontSize: "20px" }}>
                  {editingSubscription
                    ? "Edit Subscription"
                    : "Add Subscription"}
                </h2>

                <button
                  onClick={closeModal}
                  style={{
                    ...buttonStyle,
                    backgroundColor: darkMode ? "#0b192c" : "#e2e8f0",
                    color: darkMode ? "#ffffff" : "#0f172a",
                    padding: "6px",
                  }}
                >
                  <CloseIcon />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <label style={{ fontSize: "14px", opacity: 0.9 }}>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      name: event.target.value,
                    })
                  }
                  style={inputStyle}
                  placeholder="Netflix"
                />

                <label style={{ fontSize: "14px", opacity: 0.9 }}>
                  Monthly Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      amount: event.target.value,
                    })
                  }
                  style={inputStyle}
                  placeholder="9.99"
                />

                <label style={{ fontSize: "14px", opacity: 0.9 }}>
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      category: event.target.value,
                    })
                  }
                  style={inputStyle}
                >
                  <option>Entertainment</option>
                  <option>Utilities</option>
                  <option>Software</option>
                  <option>Fitness</option>
                  <option>Other</option>
                </select>

                <button
                  type="submit"
                  style={{
                    ...buttonStyle,
                    width: "100%",
                    backgroundColor: "#1e3e62",
                    color: "#ffffff",
                    fontWeight: "bold",
                    marginTop: "10px",
                  }}
                >
                  {editingSubscription
                    ? "Save Changes"
                    : "Add Subscription"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}