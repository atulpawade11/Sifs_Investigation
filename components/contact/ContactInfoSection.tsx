"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";

export default function ContactInfoSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 lg:grid-cols-3">
          
          {/* LEFT */}
          <div>
            <h2 className="mb-6 text-3xl font-semibold leading-snug">
              Convinced yet? Let’s make something great together.
            </h2>

            <div className="overflow-hidden rounded-xl">
              <Image
                src="/contact/contact-desk.png"
                alt="Work desk"
                width={500}
                height={350}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* CENTER */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-xl">
              <Image
                src="/contact/contact-person.png"
                alt="Support"
                width={500}
                height={300}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="rounded-xl bg-gradient-to-b from-[#0C2783] to-[#1C274C] p-6 text-white">
              <h4 className="mb-3 text-[26px] font-semibold">Corp Office</h4>
              <hr className="mb-4 w-12 h-[3px] bg-white border border-t border-white/40" />
              <p className="flex items-start gap-2 text-[16px] font-semibold leading-relaxed">
                <MapPin size={24} />
                A-14, Mahendru Enclave, Model Town Metro Station,
                Delhi-110009, India.
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <ContactBlock
              title="Document Lab"
              phone="+91 730-391-3004, +91 11-470-74263"
            />
            <ContactBlock
              title="Cyber Lab"
              phone="+91 730-391-3005, +91 11-470-74263"
            />
            <ContactBlock
              title="Fire Forensic"
              phone="+91 730-391-3006, +91 11-470-74263"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

function ContactBlock({
  title,
  phone,
}: {
  title: string;
  phone: string;
}) {
  return (
    <div className="border-b border-[#BABABA] pb-4 last:border-b-0 last:pb-0">
      <h4 className="mb-4 text-[20px] font-bold text-black">{title}</h4>

      {/* Phone */}
      <p className="mb-3 flex items-center gap-2 text-[16px] text-[#2A2A2A]">
        <Image
          src="/contact/phone.png"
          alt="Phone"
          width={26}
          height={26}
        />
        {phone}
      </p>

      {/* Email */}
      <p className="flex items-center gap-2 text-[16px] text-[#2A2A2A]">
        <Image
          src="/contact/mail.png"
          alt="Email"
          width={26}
          height={26}
        />
        contact@sifsindia.com
      </p>
    </div>
  );
}
