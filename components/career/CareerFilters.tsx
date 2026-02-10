type Props = {
    search: string;
    setSearch: (v: string) => void;
    category: string;
    setCategory: (v: string) => void;
    categories: string[];
  };
  
  export default function CareerFilters({
    search,
    setSearch,
    category,
    setCategory,
    categories,
  }: Props) {
    return (
      <div className="mb-6 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search Jobs"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-xs rounded-md border border-[#D9D9D9] px-4 py-4 text-sm"
        />
  
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full max-w-xs rounded-md border border-[#D9D9D9] px-4 py-2 text-sm"
        >
          {categories.map(cat => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>
    );
  }
  