import { Metadata } from 'next';
import SubmitCaseClient from './SubmitCaseClient';

export const metadata: Metadata = {
    title: 'Submit Case | SIFS Investigation',
    description: 'Submit your case to our forensic experts for detailed analysis and guidance.',
};

export default function SubmitCasePage() {
    return <SubmitCaseClient />;
}
