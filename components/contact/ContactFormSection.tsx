"use client";

import { ArrowRight } from "lucide-react";

export default function ContactFormSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="mb-2 text-2xl font-semibold">Drop Us a Line</h2>
        <p className="mb-10 text-sm text-gray-500">
          Reach out to us from our contact form and we will get back to you shortly.
        </p>

        <form className="grid gap-6">
          <div className="grid gap-6 md:grid-cols-2">
            <input className="input" placeholder="Full name" />
            <input className="input" placeholder="E-mail" />
            <input className="input" placeholder="Mobile" />
            <input className="input" placeholder="Address" />
          </div>

          <textarea
            rows={4}
            className="input"
            placeholder="Query"
          />

          <div className="flex">
            <button className="flex items-center gap-2 rounded-full bg-gradient-to-br from-[#1C274C] to-[#0C2783] px-8 py-3 text-sm text-white">
              Submit <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
