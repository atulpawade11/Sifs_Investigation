"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // We ensure at least 1 page exists for the UI to render
  const safeTotalPages = totalPages || 1;
  const pages = Array.from({ length: safeTotalPages }, (_, i) => i + 1);

  return (
    <div className="mt-8 flex justify-center gap-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`h-8 w-8 flex items-center justify-center rounded-full border text-sm transition ${
          currentPage === 1
            ? "border-gray-200 text-gray-300 cursor-not-allowed"
            : "border-gray-300 text-[#00467A] hover:bg-gray-50"
        }`}
      >
        ‹
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          disabled={safeTotalPages <= 1}
          onClick={() => onPageChange(page)}
          className={`h-8 w-8 rounded-full text-sm transition ${
            currentPage === page
              ? "bg-[#00467A] text-white font-bold"
              : safeTotalPages <= 1 
                ? "border border-gray-100 text-gray-300 cursor-default"
                : "border border-gray-300 text-[#00467A] hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(safeTotalPages, currentPage + 1))}
        disabled={currentPage === safeTotalPages || safeTotalPages <= 1}
        className={`h-8 w-8 flex items-center justify-center rounded-full border text-sm transition ${
          currentPage === safeTotalPages || safeTotalPages <= 1
            ? "border-gray-200 text-gray-300 cursor-not-allowed"
            : "border-gray-300 text-[#00467A] hover:bg-gray-50"
        }`}
      >
        ›
      </button>
    </div>
  );
}