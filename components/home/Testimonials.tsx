import Image from "next/image";
import Link from "next/link";

const testimonials = [
  {
    text: `It has been a pleasure to utilize the investigative services provided by SIFS India. I highly recommend my colleagues consider them for unbiased reports.`,
    org: "Nigeria Police",
    location: "Nigeria",
    logo: "/client-testimonial1.png",
    quote: "/quote.png",
  },
  {
    text: `With the support of SIFS India, we were able to accomplish our targets on time and within budget, showcasing their efficiency and cost-effectiveness.`,
    org: "Narcotics Control Bureau",
    location: "New Delhi",
    logo: "/client-testimonial2.png",
    quote: "/quote.png",
  },
  {
    text: `I am grateful for the honest and reliable service from SIFS India, which utilizes well-equipped techniques and maintains a positive approach throughout.`,
    org: "ICICI Lombard",
    location: "Mumbai",
    logo: "/client-testimonial3.png",
    quote: "/quote.png",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#F3F1F2] py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* ---------- TITLE (BACKGROUND LAYER) ---------- */}
        <div className="relative z-0 max-w-xl">
          <p className="text-sm font-medium text-[#04063E]">
            Success Stories
          </p>
          <h2 className="mt-2 text-[42px] font-bold leading-tight text-gray-900">
            “Clients <br />
            Testimonials”
          </h2>
        </div>

        {/* ---------- VIEW ALL BUTTON ---------- */}
        <div className="absolute right-10 top-24 hidden md:block">
          <Link
            href="#"
            className="bg-gradient-to-r from-[#0B10A4] to-[#04063E]
            text-white px-8 py-3 rounded-full font-bold
            flex items-center gap-4
            hover:from-[#1217c0] hover:to-[#0a0f6b]
            transition-all group"
          >
            View All →
          </Link>
        </div>

        {/* ---------- CARDS (OVERLAY LAYER) ---------- */}
        <div className="relative z-10 mt-[-60px] ml-auto w-[135%]">
          <div className="flex gap-6">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="min-w-[360px] rounded-2xl border border-[#D8D8D8]
                           bg-[#F3F1F2]/30 p-8 backdrop-blur-xs mt-8"
              >
                {/* Quote */}
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#1C274C] text-xl text-white p-3">
                    <Image
                      src={item.quote}
                      alt={item.org}
                      width={28}
                      height={28}
                    />
                </div>

                {/* Text */}
                <p className="mb-8 text-[18px] leading-relaxed text-black">
                  {item.text}
                </p>

                {/* Footer */}
                <div className="flex items-center gap-4">
                  <div className="flex h-15 w-15 items-center justify-center rounded-full bg-[#DADCD2]">
                    <Image
                      src={item.logo}
                      alt={item.org}
                      width={36}
                      height={36}
                    />
                  </div>
                  <div>
                    <p className="text-[18px] font-bold text-black">
                      {item.org}
                    </p>
                    <p className="text-[14px] text-black">
                      {item.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View All */}

        <div className="mt-10 md:hidden">
          <Link
            href="#"
            className="bg-gradient-to-r from-[#0B10A4] to-[#04063E]
                        text-white px-8 py-3 rounded-full font-bold
                        flex items-center gap-4
                        hover:from-[#1217c0] hover:to-[#0a0f6b]
                        transition-all group"
          >
            View All →
          </Link>
        </div>
      </div>
    </section>
  );
}
