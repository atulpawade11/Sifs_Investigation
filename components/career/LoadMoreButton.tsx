"use client";

type Props = {
  canLoadMore: boolean;
  canLoadLess: boolean;
  onLoadMore: () => void;
  onLoadLess: () => void;
};

export default function LoadMoreButton({
  canLoadMore,
  canLoadLess,
  onLoadMore,
  onLoadLess,
}: Props) {
  // If we can't do either, don't show the container at all
  if (!canLoadMore && !canLoadLess) return null;

  return (
    <div className="mt-8 flex justify-center gap-4">
      {canLoadLess && (
        <button
          onClick={onLoadLess}
          className="rounded-full border border-[#0B10A4] px-6 py-2 text-sm text-[#0B10A4] transition hover:bg-[#0B10A4] hover:text-white"
        >
          ← Load Less
        </button>
      )}

      {canLoadMore && (
        <button
          onClick={onLoadMore}
          className="rounded-full bg-[#0B10A4] px-6 py-2 text-sm text-white transition hover:bg-[#04063E]"
        >
          Load More →
        </button>
      )}
    </div>
  );
}