import { SearchIcon, PlusIcon } from "../icons";

const ALL_CATEGORIES = ["All", "Entertainment", "Utilities", "Software", "Fitness", "Other"];

export default function SearchAndFilters({
  search,
  onSearchChange,
  sortBy,
  onSortChange,
  selectedCategory,
  onCategoryChange,
  onAddClick,
}) {
  return (
    <section className="mb-5">
      {/* Search, sort, add — stacks vertically on small screens */}
      <div className="flex flex-col sm:flex-row gap-2 mb-3">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <SearchIcon size={16} />
          </span>
          <label htmlFor="subscription-search" className="sr-only">
            Search subscriptions
          </label>
          <input
            id="subscription-search"
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search subscriptions..."
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600
                       bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none
                       focus:border-slate-500"
          />
        </div>

        <label htmlFor="sort-select" className="sr-only">
          Sort subscriptions
        </label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800
                     text-slate-900 dark:text-white text-sm px-3 py-2 outline-none [color-scheme:light] dark:[color-scheme:dark]"
        >
          <option value="recent">Recent</option>
          <option value="high">Amount: High to Low</option>
          <option value="low">Amount: Low to High</option>
          <option value="name">Name: A–Z</option>
        </select>

        <button
          onClick={onAddClick}
          className="flex items-center justify-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700
                     dark:bg-slate-700 dark:hover:bg-slate-600 text-white text-sm font-semibold px-4 py-2 transition-colors"
        >
          <PlusIcon size={16} />
          Add
        </button>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {ALL_CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              aria-pressed={isActive}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-slate-800 dark:bg-slate-600 text-white"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </section>
  );
}
