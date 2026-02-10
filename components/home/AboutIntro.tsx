"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';

// Define types based on the API response
interface ApiResponse {
    success: boolean;
    message: string;
    statusCode: number;
    timestamp: string;
    data: {
        currentLang: {
            id: number;
            name: string;
            code: string;
            is_default: number;
            rtl: number;
            created_at: string;
            updated_at: string;
        };
        bs: {
            id: number;
            language_id: number;
            intro_bg: string;
            intro_section_title: string;
            intro_section_text: string;
            intro_section_button_text: string;
            intro_section_button_url: string;
            intro_section_video_link: string;
        };
    };
}

const AboutIntro = () => {
    const [aboutData, setAboutData] = useState<ApiResponse['data']['bs'] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Get the correct backend URL from environment variables
    const backendUrl = process.env.NEXT_PUBLIC_API_BACKEND_URL

    // Static fallback highlights
    const staticHighlights = [
        "Forged Document Examination",
        "Handwriting Examination",
        "Signature Verification",
        "Fingerprint Comparison"
    ];

    // Static fallback description
    // const staticDescription = "Established in 2006, SIFS India emerged as a pioneer in the field of forensics. It is a leading forensic science laboratory in India that is registered with the Government of India and certified with ISO 9001:2015 and 10002:2014.";

    // Fetch data from API
    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`${backendUrl}/InvestigationServices/Website/front/`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data: ApiResponse = await response.json();

                if (data.success && data.data.bs) {
                    setAboutData(data.data.bs);
                } else {
                    throw new Error(data.message || 'Failed to fetch data');
                }
            } catch (err) {
                console.error('Error fetching about data:', err);
                setError(err instanceof Error ? err.message : 'An error occurred');
                // Keep aboutData as null to use fallback
            } finally {
                setLoading(false);
            }
        };

        fetchAboutData();
    }, []);

    // Use API data or fallback
    const highlights = staticHighlights;
    // const description = staticDescription;

    // Show loading state
    if (loading) {
        return (
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 md:px-10">
                    <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#0B10A4]"></div>
                        <p className="mt-4 text-[#868686]">Loading content...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 md:px-10">
                {/* Error notice - minimal and non-intrusive */}
                {error && (
                    <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm">
                        <p>Note: Some content loaded from API</p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* LEFT CONTENT */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <span className="text-[#04063E] font-medium italic">
                                {aboutData?.intro_section_title || "Efficiency Meets the Finest Forensic Expertise"}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
                                {aboutData?.intro_section_text ||
                                    "Despite the initial hurdles, SIFS India, guided by a positive and dedicated approach to clients and adherence to Indian law and order, successfully carved a niche in the field of forensics. The company achieved acknowledgement not only from onshore but also from offshore clients."}
                            </h2>
                        </div>


                        {/* Feature List - Dynamically from API if available */}
                        <div className="grid grid-cols-1 gap-4">
                            {highlights.map((item, index) => (
                                <div key={index} className="flex items-center gap-3 group mb-3">
                                    <div className="relative w-6 h-6">
                                        <Image
                                            src="/orange-check.png"
                                            alt="check"
                                            fill
                                            className="object-contain"
                                            priority={index === 0}
                                        />
                                    </div>
                                    <span className="font-regular text-sm text-black group-hover:text-sifs-orange transition-colors">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-6 pt-4">
                            <button
                                className="bg-gradient-to-r from-[#0B10A4] to-[#04063E]
                  text-white px-8 py-3 rounded-full font-bold
                  flex items-center gap-4
                  hover:from-[#1217c0] hover:to-[#0a0f6b]
                  transition-all group"
                                onClick={() => {
                                    if (aboutData?.intro_section_button_url) {
                                        window.location.href = aboutData.intro_section_button_url;
                                    }
                                }}
                            >
                                {aboutData?.intro_section_button_text || "Read More"}
                                <ArrowRight size={20} />
                            </button>

                            <div className="hidden md:block relative w-[80px] h-[50px]">
                                <Image
                                    src="/drawn-arrow.png"
                                    alt="decorative arrow"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT CONTENT: Image & Video Overlay */}
                    <div className="relative group">
                        {/* Description - Could be from API if available */}
                        {/* <p className="text-[#868686] leading-relaxed mb-6 mt-6">
                            {description}
                        </p> */}

                        <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                            {/* Dynamic background image from API - using backend URL for uploads */}
                            {aboutData?.intro_bg ? (
                                <Image
                                    src={`${backendUrl}${aboutData.intro_bg}`}
                                    alt="Forensic Expert"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            ) : (
                                <Image
                                    src="/about.png"
                                    alt="Forensic Expert"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />
                            )}

                            {/* Video Button - Dynamic link from API */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                <button
                                    className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center text-[#1A365D] shadow-xl hover:scale-110 transition-transform"
                                    onClick={() => {
                                        if (aboutData?.intro_section_video_link) {
                                            window.open(aboutData.intro_section_video_link, '_blank');
                                        }
                                    }}
                                >
                                    <Play size={32} fill="currentColor" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutIntro;