import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOGS } from "../../../data/blog";
import BackButton from "../../../components/common/BackButton";


/* ===================== TYPES ===================== */
type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* ===================== SEO ===================== */
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  const blog = BLOGS.find((b) => b.slug === slug);

  return {
    title: blog?.title ?? "Blog",
    description: blog?.excerpt ?? "",
  };
}

/* ===================== STATIC PARAMS (IMPORTANT) ===================== */
export function generateStaticParams() {
  return BLOGS.map((blog) => ({
    slug: blog.slug,
  }));
}

/* ===================== PAGE ===================== */
export default async function BlogDetailsPage({ params }: PageProps) {
  const { slug } = await params;

  const blogIndex = BLOGS.findIndex((b) => b.slug === slug);
  const blog = BLOGS[blogIndex];

  if (!blog) {
    notFound();
  }

  const prevBlog = BLOGS[blogIndex - 1];
  const nextBlog = BLOGS[blogIndex + 1];

  return (
    <>
      {/* Header */}
      <section className="bg-gray-50 py-12 text-center">
        <p className="text-sm uppercase tracking-wide text-gray-500">
          News & Blog
        </p>
        <h1 className="mt-2 text-xl font-medium text-gray-700">
            {blog.headerSubtitle}
        </h1>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-16 relative">
        <div className="absolute right-6 top-4">
            <BackButton />
        </div>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* LEFT */}
          <article className="lg:col-span-2">
            <h2 className="text-3xl font-bold">{blog.title}</h2>

            <div className="mt-3 flex gap-4 text-sm text-gray-500">
              <span>By {blog.author}</span>
              <span>•</span>
              <span>{blog.date}</span>
            </div>

            <div className="relative mt-8 h-[420px] overflow-hidden rounded-xl">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="prose prose-lg mt-8 max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    blog.content ||
                    "<p>The world of forensic services is moving fast...</p>",
                }}
              />
            </div>

            {/* Prev / Next */}
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {prevBlog && (
                <Link
                  href={`/blog/${prevBlog.slug}`}
                  className="rounded-lg border p-5 hover:shadow"
                >
                  <p className="text-xs text-gray-500">Prev Articles</p>
                  <p className="mt-2 font-medium">{prevBlog.title}</p>
                </Link>
              )}

              {nextBlog && (
                <Link
                  href={`/blog/${nextBlog.slug}`}
                  className="rounded-lg border p-5 text-right hover:shadow"
                >
                  <p className="text-xs text-gray-500">Next Articles</p>
                  <p className="mt-2 font-medium">{nextBlog.title}</p>
                </Link>
              )}
            </div>
          </article>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-10">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h3 className="mb-3 text-[20px] text-black font-semibold">Categories</h3>
              <div className="my-4 h-px bg-gray-200" />
              <ul className="space-y-2 text-[14px] font-regular">
                {[
                  "Forensic Science",
                  "Crime Scene Investigation",
                  "Criminology & Victimology",
                  "Cyber Security & Law",
                  "DNA Fingerprinting",
                  "Document Examination",
                  "Fingerprint Analysis",
                  "Forensic Accounting",
                  "Forensic Anthropology",
                ].map((cat) => (
                  <li
                    key={cat}
                    className="flex cursor-pointer items-center justify-between text-black hover:text-[#0B10A4] py-2"
                  >
                    {cat}
                    <span className="text-[16px] text-black">›</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h3 className="mb-3 text-[20px] text-black font-semibold">Recent Post</h3>
              <div className="my-4 h-px bg-gray-200" />
              <div className="space-y-5">
                {BLOGS.slice(0, 2).map((item) => (
                  <Link
                    key={item.id}
                    href={`/blog/${item.slug}`}
                    className="flex gap-4"
                  >
                    <div className="relative h-16 w-16 overflow-hidden rounded">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium leading-snug">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {item.date}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
