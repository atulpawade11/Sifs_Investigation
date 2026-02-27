"use client";

import PageBanner from '../../components/common/PageBanner';
import SubmitCaseForm from '../../components/submit-case/SubmitCaseForm';

export default function SubmitCaseClient() {
    return (
        <main className="min-h-screen bg-[#F8F9FA]">
            <PageBanner
                title="Submit Your Case"
                subtitle="EXPERT GUIDANCE"
            />

            <div className="container mx-auto px-4 md:px-10 py-16 md:py-24">
                <SubmitCaseForm />
            </div>
        </main>
    );
}
