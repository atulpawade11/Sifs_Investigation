import { notFound } from "next/navigation";
import DepartmentLayout from "./DepartmentLayout";
import LegalLayout from "./LegalLayout";
import { API_BASE_URL } from "@/lib/config";

const legalSlugs = ["privacy-policy", "terms-and-conditions"];

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await fetch(
    `${API_BASE_URL}/InvestigationServices/Website/front/page/${slug}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) return notFound();

  const result = await res.json();

  if (!result.success) return notFound();

  const page = result.data.page;

  if (legalSlugs.includes(slug)) {
    return <LegalLayout page={page} />;
  }

  return <DepartmentLayout page={page} />;
}