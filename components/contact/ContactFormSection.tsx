"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { submitContactForm } from "../../services/contactService";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "sonner";

export default function ContactFormSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    details: "",
  });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.error("Please complete the reCAPTCHA.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Sending your message...");

    try {
      const payload = {
        ...form,
        "g-recaptcha-response": captchaToken,
      };

      const res = await submitContactForm(payload);
      if (res.success) {
        toast.success(res.message || "Message sent successfully!", { id: toastId });
        setForm({
          name: "",
          email: "",
          mobile: "",
          address: "",
          details: "",
        });
        setCaptchaToken(null);
        recaptchaRef.current?.reset();
      }
    } catch (err: any) {
      console.error("Caught error:", err);
      toast.error(err.message || "Failed to send message. Please try again.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-20 border-t border-gray-50">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#1C274C]">Drop Us a Line</h2>
          <p className="text-gray-500">Have a question or comment? Use the form below to send us a message.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Full Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#F6BA13] transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Email Address *</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#F6BA13] transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Mobile Number *</label>
              <input
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                required
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#F6BA13] transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter your city/address"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#F6BA13] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Your Query *</label>
            <textarea
              name="details"
              rows={4}
              value={form.details}
              onChange={handleChange}
              placeholder="How can we help you? Describe your query in detail..."
              required
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#F6BA13] transition-colors"
            />
          </div>

          <div className="flex flex-col items-center gap-6 mt-2">
            {mounted && (
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"} // Using testing key as fallback
                onChange={onCaptchaChange}
              />
            )}

            <button
              disabled={loading || (mounted && !captchaToken)}
              className="flex items-center gap-2 bg-[#1C274C] text-white px-12 py-4 rounded-full font-bold hover:bg-[#0C2783] transition-all disabled:opacity-50 shadow-lg shadow-blue-900/10 active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Submit Message"}
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
