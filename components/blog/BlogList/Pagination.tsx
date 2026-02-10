export default function Pagination() {
    return (
      <div className="mt-8 flex justify-center gap-2">
        <button className="h-8 w-8 border border-gray-300 text-[#00467A] rounded-full border text-sm">‹</button>
        <button className="h-8 w-8 rounded-full bg-[#00467A] text-sm text-white">
          1
        </button>
        <button className="h-8 w-8 border border-gray-300 text-[#00467A] rounded-full border text-sm">2</button>
        <button className="h-8 w-8 border border-gray-300 text-[#00467A] rounded-full border text-sm">3</button>
        <button className="h-8 w-8 border border-gray-300 text-[#00467A] rounded-full border text-sm">›</button>
      </div>
    );
  }
  