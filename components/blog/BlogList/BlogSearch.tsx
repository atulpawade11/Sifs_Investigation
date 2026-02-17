"use client";

interface BlogSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function BlogSearch({ searchTerm, setSearchTerm }: BlogSearchProps) {
  return (
    <div className="flex justify-end">
      <div className="relative w-full max-w-xs">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search news..."
          className="w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0B4F8A] focus:border-transparent transition-all"
        />
        {/* Optional: Add a search icon or clear button here */}
      </div>
    </div>
  );
}