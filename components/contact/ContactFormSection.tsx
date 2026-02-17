"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { submitContactForm } from "../../services/contactService";

export default function ContactFormSection() {
  const [form, setForm] = useState({ name: "", email: "", contact_number: "", address: "", details: "" });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await submitContactForm(form);
      if (res.success) {
        setSuccessMsg(res.message);
        setForm({ name: "", email: "", contact_number: "", address: "", details: "" });
      }
    } catch (err) {
      console.error("Caught error:", err);
      // Alert the user without crashing the app
      alert("The contact service is temporarily unavailable. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-20 border-t border-gray-50">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="mb-10 text-center text-3xl font-bold text-[#1C274C]">Drop Us a Line</h2>

        {successMsg ? (
          <div className="text-center p-10 bg-green-50 rounded-2xl border border-green-100">
            <CheckCircle className="mx-auto text-green-500 mb-4" size={50} />
            <p className="text-green-800 font-medium">{successMsg}</p>
            <button onClick={() => setSuccessMsg("")} className="mt-4 text-[#0C2783] underline">Send another message</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name *" required className="p-4 bg-gray-50 border rounded-xl outline-none focus:border-[#F6BA13]" />
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email *" required className="p-4 bg-gray-50 border rounded-xl outline-none focus:border-[#F6BA13]" />
              <input name="contact_number" value={form.contact_number} onChange={handleChange} placeholder="Mobile *" required className="p-4 bg-gray-50 border rounded-xl outline-none focus:border-[#F6BA13]" />
              <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="p-4 bg-gray-50 border rounded-xl outline-none focus:border-[#F6BA13]" />
            </div>
            <textarea name="details" rows={4} value={form.details} onChange={handleChange} placeholder="Your Query *" required className="p-4 bg-gray-50 border rounded-xl outline-none focus:border-[#F6BA13]" />
            <div className="flex justify-center">
              <button disabled={loading} className="flex items-center gap-2 bg-[#1C274C] text-white px-10 py-4 rounded-full font-bold hover:bg-[#0C2783] transition-all disabled:opacity-50">
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Submit Message"}
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}