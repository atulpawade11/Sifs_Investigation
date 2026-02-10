import Image from "next/image";

export default function RecentPosts() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <h4 className="mb-3 text-[20px] text-black font-semibold">Recent Post</h4>
      <div className="my-4 h-px bg-gray-200" />

      {[1, 2].map((i) => (
        <div key={i} className="mb-3 flex items-center gap-3 last:mb-0">
          <div className="relative h-14 w-14 overflow-hidden rounded">
            <Image
              src="/blog/recent-post1.png"
              alt=""
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-[14px] font-regular text-black line-clamp-2 mb-2">
              Dapibus cras nisi suscipit nibh elit purus
            </p>
            
            <span className="text-[12px] flex items-center gap-2 font-regular text-black">
              <Image
                src="/blog/calander.png"
                alt="date"
                width={12}
                height={12}
              />
              19 Dec, 2025
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
