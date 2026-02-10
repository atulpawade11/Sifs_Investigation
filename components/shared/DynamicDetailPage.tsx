import PageBanner from "../common/PageBanner";

import PageHeaderDropdown from "./PageHeaderDropdown";
import OverviewSection from "./OverviewSection";
import PillDivider from "./PillDivider";
import TabbedContentSection from "./TabbedContentSection";
import AccordionSection from "./AccordionSection";
import CTASection from "./CTASection";
import { PageData } from "../../types/page";

type Props = {
  data: PageData;
};

export default function DynamicDetailPage({ data }: Props) {
    return (
        <>
            <PageBanner
                title={data.banner?.title ?? "Laboratory"}
                subtitle={data.banner?.subtitle ?? "SIFS India"}
                bgImage={data.banner?.bgImage}
            />

            <section className="max-w-7xl mx-auto px-4 py-10">
                <PageHeaderDropdown title={data.title} />

                <OverviewSection {...data.overview} />

                <PillDivider label={data.pillLabel} />

                <TabbedContentSection tabs={data.tabs} />

                <AccordionSection items={data.accordions} />

                <CTASection {...data.cta} />
            </section>
        </>
    );
}
