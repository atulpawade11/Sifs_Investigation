import Image from "next/image";

const alliances = [
  {
    name: "SketchCop",
    location: "California, USA",
    logo: "/about/alliances1.png",
  },
  {
    name: "Clue 4 Evidence",
    location: "Bangalore, India",
    logo: "/about/alliances2.png",
  },
  {
    name: "IASR",
    location: "Delhi, India",
    logo: "/about/alliances3.png",
  },
  {
    name: "RealScan Biometrics",
    location: "Delhi, India",
    logo: "/about/alliances4.png",
  },
  {
    name: "Falcon",
    location: "Ghana",
    logo: "/about/alliances5.png",
  },
  {
    name: "Capability Development Institute",
    location: "Delhi, India",
    logo: "/about/alliances6.png",
  },
  {
    name: "FLIR",
    location: "Russia",
    logo: "/about/alliances7.png",
  },
  {
    name: "Expert Code Lab",
    location: "Noida, India",
    logo: "/about/alliances8.png",
  },
];

export default function OurAlliance() {
  return (
    <section className="relative bg-gradient-to-r from-[#020433] via-[#030653] to-[#020433] py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* LEFT CONTENT */}
          <div className="text-white">
            <h2 className="mb-4 text-2xl font-semibold">
              Our Alliance
            </h2>

            <p className="mb-6 text-sm leading-relaxed text-white/80">
              Forensic science is a multidisciplinary field, and hence meaningful
              collaborations are a must to achieve the common goal of solving
              complex cases. SIFS India’s collaborative approach to doing
              business is a proof of our commitment to providing robust forensic
              investigation services. As an expert, we have made several national
              and international strategic collaborations with leading forensic
              laboratories, legal professionals, and law enforcement agencies.
              The concept of collaborative forensic investigations provides our
              clients with accurate solutions and helps solve even the most
              challenging cases.
            </p>

            <p className="text-sm text-white/70">
              Explore SIFS India’s partnerships to learn more about the trusted
              organizations and how together we uncover truth and deliver
              justice.
            </p>
          </div>

          {/* RIGHT LOGO GRID */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {alliances.map((item) => (
              <div
                key={item.name}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full bg-white shadow-md overflow-hidden">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>
                <p className="mt-3 text-xs font-medium text-white">
                  {item.name}
                </p>
                <p className="text-[11px] text-white/70">
                  {item.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
