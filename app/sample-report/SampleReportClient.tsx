"use client";

import PageBanner from '../../components/common/PageBanner';
import SampleReportForm from '../../components/sample-report/SampleReportForm';

export default function SubmitCaseClient() {
    return (
        <main className="min-h-screen bg-[#F8F9FA]">
            <PageBanner
                title="Request Sample Report"
                subtitle="Sample Report"
            />

            <div className="container mx-auto px-4 md:px-10 py-16 md:py-24">
                <SampleReportForm />
            </div>
        </main>
    );
}
