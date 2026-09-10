# Subscription Tracker

🚀 **Live Preview:** [View Live Application](http://localhost:5173/subscription-tracker/)

A React + Tailwind CSS application for tracking recurring monthly subscriptions,
built as a trainee project focused on core React and Tailwind fundamentals.

---

## Project Overview

Subscription Tracker helps track recurring monthly expenses: it totals active
subscriptions, compares spending against a user-set budget, and supports
searching, filtering, and sorting across subscription categories.

---

## Features

- Add, edit, and delete subscriptions (full CRUD)
- Real-time monthly and yearly cost totals
- Budget input with a progress bar and over/under-budget feedback
- Search by name, filter by category, sort by amount or name
- Light / dark mode toggle
- Delete confirmation before removing a subscription
- Inline form validation (no `alert()` popups)

---

## Technologies Used

- **Frontend:** React (functional components, hooks)
- **Styling:** Tailwind CSS utility classes, including `dark:` variants for theming
- **Build Tool:** Vite
- **Icons:** Small hand-written inline SVG components (no icon package)

No charting library is used or installed — an earlier draft included
`recharts` as an unused dependency; it has been removed.

---

## React Concepts Used

- **Functional components** — the app is split into small, single-purpose components
  (see Project Structure below) rather than one large file
- **`useState`** — for subscriptions, form fields, filters, sort order, budget,
  theme, and modal/dialog visibility
- **`useMemo`** — for the monthly total and the filtered/sorted subscription list,
  so they're only recalculated when their inputs change
- **`useEffect`** — to sync the dark-mode class onto `<html>`, and to attach/detach
  keyboard listeners (Escape to close, Tab to trap focus) while a dialog is open
- **Controlled inputs** — every form field's value comes from React state
- **Conditional rendering** — modal, confirmation dialog, empty list state
- **Array methods** — `.map()`, `.filter()`, `.reduce()`, `.sort()` throughout

---

## Tailwind CSS Usage

The UI is built entirely with Tailwind utility classes (`flex`, `rounded-2xl`,
`px-4`, `hover:bg-slate-700`, etc.). Dark mode uses Tailwind's `dark:` variant,
controlled by toggling a `dark` class on `<html>` (see `index.css` for the
`@custom-variant dark` setup this requires). There are no large inline
`style={{ ... }}` objects driving the design — the one exception is the
budget/progress bar's `width`, which is a computed percentage and has to be
set dynamically regardless of styling approach.

---

## Project Structure

```text
src/
├── components/
│   ├── Header.jsx
│   ├── SummaryCard.jsx
│   ├── BudgetCard.jsx
│   ├── SearchAndFilters.jsx
│   ├── SubscriptionList.jsx
│   ├── SubscriptionItem.jsx
│   ├── SubscriptionModal.jsx
│   └── ConfirmDialog.jsx
├── data/
│   └── subscriptions.js
├── icons/
│   └── index.jsx
├── utils/
│   └── subscriptionHelpers.js
├── App.jsx
├── index.css
└── main.jsx
```

`App.jsx` holds state and passes data/handlers down as props. Validation and
data-shaping logic live in `utils/subscriptionHelpers.js`, separate from the
components — so a component's job is rendering, not deciding whether a form
is valid.

---

## Data Schema

```js
{
  id: "1710000000000",   // string, per spec
  name: "Netflix",
  amount: 15.99,
  category: "Entertainment"
}
```

New IDs are created with `Date.now().toString()` so they stay strings,
matching the schema exactly.

---

## Installation & Setup

```bash
git clone https://github.com/mfaiq676/subscription-tracker.git
cd subscription-tracker
npm install
```

## How to Run

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

```bash
npm run build     # production build
npm run deploy     # deploy to GitHub Pages
```

## Accessibility Notes

- Edit/Delete buttons carry `aria-label`s (e.g. "Edit Netflix") since they're icon-only
- The Add/Edit modal uses `role="dialog"`, `aria-modal="true"`, closes on
  `Escape`, focuses its first field on open, and traps Tab focus within itself
- The delete confirmation uses `role="alertdialog"`
- Form fields use `aria-invalid` and `aria-describedby` to associate errors with inputs

## Known Limitations

None currently tracked. Dark mode preference now persists across refreshes
via `localStorage`.

## Author

**GitHub:** [@mfaiq676](https://github.com/mfaiq676)
