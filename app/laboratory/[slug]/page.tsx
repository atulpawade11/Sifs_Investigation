// app/laboratory/[slug]/page.tsx
import { laboratoryData } from "../../../data/laboratoryData";
import DynamicDetailPage from "../../../components/shared/DynamicDetailPage";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LaboratoryPage({ params }: Props) {
  const { slug } = await params;

  // 1. Access the data using a type-safe cast
  const data = laboratoryData[slug as keyof typeof laboratoryData];

  // 2. If the slug doesn't exist in our record, data will be undefined
  if (!data) {
    return notFound();
  }

  return <DynamicDetailPage data={data} />;
}