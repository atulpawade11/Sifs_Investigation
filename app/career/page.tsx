"use client";

import { useMemo, useState } from "react";
import { JOBS } from "../../data/jobs";

import PageBanner from "../../components/common/PageBanner";
import CareerFilters from "../../components/career/CareerFilters";
import JobList from "../../components/career/JobList";
import LoadMoreButton from "../../components/career/LoadMoreButton";
import CareerFAQSection from "../../components/career/CareerFAQSection";
import DownloadsSlider from "../../components/common/DownloadsSlider";

const INITIAL_VISIBLE = 4;
const LOAD_STEP = 4;

export default function CareerPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [visible, setVisible] = useState(INITIAL_VISIBLE);

  const categories = ["All", ...new Set(JOBS.map((j) => j.category))];

  const filteredJobs = useMemo(() => {
    return JOBS.filter((job) => {
      const matchSearch = job.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "All" || job.category === category;

      return matchSearch && matchCategory;
    });
  }, [search, category]);

  const canLoadMore = visible < filteredJobs.length;
  const canLoadLess = visible > INITIAL_VISIBLE;

  return (
    <>
      <PageBanner
        title="Career"
        subtitle="Join Us! Your Path to Excellence"
        bgImage="/about/about-banner.png"
        />
      <section className="relative bg-[#FFFFFF] py-12">
        <div className="mx-auto max-w-7xl px-4">
          {/* Filters */}
          <CareerFilters
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            categories={categories}
          />

          {/* Count */}
          <p className="mb-4 text-sm font-semibold">
            All Jobs ({filteredJobs.length})
          </p>

          {/* Job Cards */}
          <JobList jobs={filteredJobs.slice(0, visible)} />

          {/* Load More / Less */}
          <LoadMoreButton
            canLoadMore={canLoadMore}
            canLoadLess={canLoadLess}
            onLoadMore={() =>
              setVisible((v) =>
                Math.min(v + LOAD_STEP, filteredJobs.length)
              )
            }
            onLoadLess={() => setVisible(INITIAL_VISIBLE)}
          />
        </div>

        {/* Bottom fade effect */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-[#F7F7F7] to-transparent" />
      </section>

      <CareerFAQSection />
      <DownloadsSlider />
    </>
  );
}
