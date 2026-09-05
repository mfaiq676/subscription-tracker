# Subscription Tracker

🚀 **Live Preview:** [View Live Application](https://mfaiq676.github.io/subscription-tracker/)

---

## 📌 Project Overview

**Subscription Tracker** is a dynamic, user-friendly React application designed to help individuals monitor, manage, and optimize their recurring monthly subscriptions. It provides instant visibility into total monthly and annual expenses, allows users to manage target spending limits with a visual budget progress bar, and offers easy tracking across various service categories.

---

## ✨ Features

* **Real-time Cost Calculations:** Automatically totals active monthly expenses and estimates yearly costs.
* **Monthly Budget Monitoring:** Dynamic progress bar that alerts users when approaching or exceeding set spending limits.
* **Full CRUD Functionality:** Seamlessly add, edit, or delete subscription items.
* **Interactive Modal:** Pop-up interface for adding and updating subscription details smoothly.
* **Category Filtering:** Filter expenses quickly by categories like Entertainment, Utilities, Software, Fitness, and Other.
* **Search & Sorting:** Search subscriptions by title or sort by cost (high-to-low / low-to-high) or alphabetically.
* **Theme Customization:** Toggle between Light Mode and Dark Mode for comfortable viewing.

---

## 🛠️ Technologies Used

* **Frontend:** [ReactJS](https://react.dev/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Language:** JavaScript (ES6+ / JSX)
* **Icons:** Inline SVG Icons
* **Deployment:** [GitHub Pages](https://pages.github.com/) (`gh-pages`)
* **Version Control:** Git & GitHub

---

## ⚛️ ReactJS Concepts Used

* **Functional Components:** Modular, clean component architecture.
* **State Management (`useState`):** Managing active subscriptions, search queries, filter options, budget limits, theme states, and modal visibility.
* **Memoization (`useMemo`):** Efficient recalculation of filtered/sorted lists and spending totals only when underlying data changes.
* **Event Handling:** Form submissions, real-time input adjustments, modal triggers, and dynamic item deletion.
* **Controlled Components:** Managing form inputs via React state for modal input fields.
* **Conditional Rendering:** Toggling dark/light modes, showing/hiding modals, and rendering dynamic list states.

---

## 🎨 Tailwind CSS Concepts Used

*(Note: The core application currently uses dynamic inline styling object patterns for theme state switching and responsive layout structure).* 

* **Dynamic Styling:** JavaScript objects managing color schemes, element borders, and background transitions.
* **Flexbox & Grid Layouts:** Responsive alignment for cards, form grids, search fields, and action buttons.
* **Translucent Overlays:** Backdrop blur and semi-transparent layers for modal backdrops.

---

## 📂 Project Structure

```text
subscription-tracker/
├── dist/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   │   └── vite.svg
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── SubscriptionTracker.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## 🚀 Installation & Setup

**Clone the repository:**

```bash
git clone https://github.com/mfaiq676/subscription-tracker.git
```

**Navigate to the project directory:**

```bash
cd subscription-tracker
```

**Install dependencies:**

```bash
npm install
```

## ▶️ How to Run

**Run the development server:**

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

**Build for production:**

```bash
npm run build
```

**Deploy to GitHub Pages:**

```bash
npm run deploy
```

## 💡 How the Application Works

**Setting the budget:** Enter your preferred limit into the **Monthly Budget** input field. The progress bar updates dynamically, turning green when within budget and red when exceeded.

**Adding or editing subscriptions:** Click the **+ Add** button to open the modal. Fill in the title, cost, and category, then save. Click the yellow edit icon on any card to update its details.

**Organizing items:** Use the search bar to locate specific entries, filter by category pills, or adjust the dropdown menu to sort items by price or name.

## 🌓 Dark & Light Mode

The top-right header toggle button lets you switch seamlessly between **Dark Mode** and **Light Mode**. The entire background palette, input fields, modal overlays, and text colors update dynamically according to the selected theme state.

## 🪟 Add Subscription Modal

The application uses an interactive pop-up overlay modal that prompts users for key subscription details:

* **Name:** Title of the recurring service (e.g., Netflix, Spotify).
* **Monthly Amount:** Cost per month in USD.
* **Category Dropdown:** Selection menu to classify expenses (Entertainment, Utilities, Software, Fitness, Other).

## 📊 Subscription Categories

* **Entertainment:** Streaming services, gaming, media (e.g., Netflix, Spotify).
* **Utilities:** Monthly household services (e.g., Electricity, Internet).
* **Software:** Digital tools and platforms (e.g., Notion, Cloud Storage).
* **Fitness:** Health and wellness programs (e.g., Gym Membership).
* **Other:** Miscellaneous recurring payments.

## 👨‍💻 Author

**GitHub:** [@mfaiq676](https://github.com/mfaiq676)
