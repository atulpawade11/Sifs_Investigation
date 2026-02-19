import { Metadata } from 'next';
import { API_BASE_URL } from '@/lib/config';
import TeamDetailClient from "./TeamDetailClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    // We fetch metadata from the team-details endpoint using the ID/slug
    const response = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/team-details/${slug}`, {
      next: { revalidate: 3600 }
    });
    const json = await response.json();

    if (json.success && json.data?.member) {
      const m = json.data.member;
      return {
        title: `${m.name} | ${m.rank} | SIFS India`,
        description: `Expert forensic profile of ${m.name}. ${m.education || ""}`,
        openGraph: {
          title: m.name,
          images: [`https://forensicinstitute.in/uploads/Investigation-Services-Admin-Member/${m.image}`],
        }
      };
    }
  } catch (error) {
    console.error("Metadata error for Team Detail:", error);
  }
  return { title: "Expert Profile | SIFS India" };
}

export default async function TeamDetailPage({ params }: Props) {
  const { slug } = await params;
  return <TeamDetailClient idFromUrl={slug} />;
}