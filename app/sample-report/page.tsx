import { Metadata } from 'next';
import SampleReportClient from './SampleReportClient';

export const metadata: Metadata = {
    title: 'Sample Report | SIFS Investigation',
    description: 'Request a Sample Forensic Report to gain insights into our thorough investigative process, uncovering critical details with precision and clarity for your legal or investigative needs.',
};

export default function SampleReportPage() {
    return <SampleReportClient />;
}
