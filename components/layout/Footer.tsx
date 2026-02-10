import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#232827] text-white">
      {/* TOP CTA */}
      <div className="mx-auto max-w-7xl px-4 pt-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
            Let’s contact <ArrowRight size={22} />
          </h2>

          <div className="flex w-full max-w-md items-center rounded-full bg-[#2E3333] px-4 py-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-400 focus:outline-none"
            />
            <button className="ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#0B10A4] hover:bg-[#04063E] transition">
              <ArrowRight size={16} className="text-white" />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 mb-0 h-px bg-[#3A3F3F]" />
      </div>

      {/* MAIN FOOTER */}
      <div className="mx-auto max-w-7xl px-4 pb-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* ABOUT */}
          <div className="lg:pr-6 lg:border-r lg:border-[#343D3B] pt-10">
            <div className="mb-4 flex gap-2">
              <Image src="/logo/sifs-footer.png" alt="SIFS" width={122} height={122} />
            </div>

            <p className="text-sm leading-relaxed">
              We are leading private Forensic Science Laboratory in India.
              We have experts in countless forensic services such as
              Document Examination, Fingerprint Analysis, Cyber Forensics,
              Speaker Identification, Mobile Forensics, Fire forensic etc.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="lg:px-6 lg:border-r lg:border-[#343D3B]">
            <h4 className="mb-4 text-sm font-semibold text-white pt-10">
              Quick Link
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/about" className="hover:text-white">› About SIFS</Link></li>
              <li><Link href="/services" className="hover:text-white">› Services</Link></li>
              <li><Link href="/experts" className="hover:text-white">› Our Experts</Link></li>
              <li><Link href="/clients" className="hover:text-white">› Our Clients</Link></li>
              <li><Link href="/career" className="hover:text-white">› Career</Link></li>
              <li><Link href="/blog" className="hover:text-white">› Blog</Link></li>
            </ul>
          </div>

          {/* SERVICES */}
          <div className="lg:px-6 lg:border-r lg:border-[#343D3B]">
            <h4 className="mb-4 text-sm font-semibold text-white pt-10">
              Services
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/services/document-examination">› Document Examination</Link></li>
              <li><Link href="/services/fingerprint-analysis">› Fingerprint Analysis</Link></li>
              <li><Link href="/services/cyber-forensics">› Cyber Forensics Investigation</Link></li>
              <li><Link href="/services/insurance-investigation">› Insurance Investigation</Link></li>
              <li><Link href="/services/forensic-biology">› Forensic Biology</Link></li>
              <li><Link href="/services/facial-imaging">› Forensic Facial Imaging</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="lg:pl-6">
            <h4 className="mb-4 text-sm font-semibold text-white pt-10">
              Contact Information
            </h4>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-1 text-white" />
                contact@sifsindia.com
              </li>

              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-1 text-white" />
                +91 114-707-4263, +91 995-354-5646
              </li>

              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 text-white" />
                <span>
                  <strong className="text-white">Delhi Office</strong>
                  <br />
                  A-14, Mahendra Enclave, Model Town Metro,
                  Delhi-110009, India
                </span>
              </li>
            </ul>

            {/* SOCIAL */}
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-white">
                Follow Us:
              </p>
              <div className="flex gap-4 text-white">
                <Link href="#">X</Link>
                <Link href="#">f</Link>
                <Link href="#">in</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="bg-[#1F2423] py-4 text-center text-xs">
        © 2025 SIFS India. All Rights Reserved.
        <span className="mx-2">|</span>
        <Link href="/terms">Terms & Conditions</Link>
        <span className="mx-2">|</span>
        <Link href="/privacy-policy">Privacy Policy</Link>
        <span className="mx-2">|</span>
        <Link href="#">Site map</Link>
      </div>
    </footer>
  );
}
