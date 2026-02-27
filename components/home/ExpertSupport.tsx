"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageSquare, FileText, ChevronRight, ShieldCheck } from 'lucide-react';

export default function ExpertSupport() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative overflow-hidden rounded-[2.5rem] bg-[#f8faff] border border-blue-50 shadow-[0_32px_64px_-16px_rgba(4,6,62,0.08)] py-14 px-8 md:px-20"
                >
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 -mt-24 -mr-24 w-80 h-80 bg-yellow-400/10 rounded-full blur-[100px] animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>

                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(#04063E 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
                    </div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="text-center lg:text-left max-w-2xl">


                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#04063E] leading-[1.1] mb-8"
                            >
                                Expert Support <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#04063E] to-blue-600">
                                    & Guidance
                                </span>
                            </motion.h2>

                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto"
                        >
                            <Link
                                href="/submit-case"
                                className="group relative w-full sm:w-auto px-12 py-5 bg-[#FFB800] text-gray-900 font-bold text-lg rounded-2xl shadow-[0_12px_24px_-8px_rgba(255,184,0,0.4)] hover:shadow-[0_20px_32px_-12px_rgba(255,184,0,0.5)] hover:-translate-y-1 self-stretch flex items-center justify-center gap-3 transition-all duration-300"
                            >
                                <MessageSquare className="w-5 h-5 transition-transform group-hover:scale-110" />
                                <span>Submit Case</span>
                                <ChevronRight className="w-5 h-5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all font-bold" />
                            </Link>

                            <Link
                                href="/sample-report"
                                className="group relative w-full sm:w-auto px-12 py-5 bg-[#041E32] text-white font-bold text-lg rounded-2xl shadow-[0_12px_24px_-8px_rgba(4,30,50,0.4)] hover:shadow-[0_20px_32px_-12px_rgba(4,30,50,0.5)] hover:-translate-y-1 self-stretch flex items-center justify-center gap-3 transition-all duration-300"
                            >
                                <FileText className="w-5 h-5 transition-transform group-hover:scale-110" />
                                <span>Sample Report</span>
                                <ChevronRight className="w-5 h-5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all font-bold" />
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
