import Image from "next/image";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  description?: string;
  bgImage?: string;
}

export default function PageBanner({
  title,
  subtitle,
  description,
  bgImage,
}: PageBannerProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      {bgImage ? (
        <div className="absolute inset-0">
          <Image
            src={bgImage}
            alt=""
            fill
            priority
            className="object-cover"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-[#F5F6F8]" />
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 text-center">
        {/* Title */}
        <h1 className="text-[24px] font-medium text-black">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-1 text-xs font-medium tracking-wide text-black">
            {subtitle}
          </p>
        )}

        {/* Description */}
        {description && (
          <p className="mt-2 text-sm text-gray-500">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
