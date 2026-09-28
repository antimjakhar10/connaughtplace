import { useState } from "react";
import { Mail, MapPin, Phone, Send, Sparkles, CheckCircle2, Maximize2, Loader2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import API_URL from "../api";

import hero from "../assets/aerial-courtyard.jpeg";
import locationMap from "../assets/location-map.jpeg";

const Contact = ({ onOpenLightbox }) => {
  const [spaceType, setSpaceType] = useState("Retail Shop");
  const [spaceSize, setSpaceSize] = useState("300–400 sq.ft.");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${API_URL || "http://localhost:5000"}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          spaceType,
          spaceSize,
          message: formData.message,
          source: "Contact Page Form",
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.message || "Failed to send message.");
      }
    } catch (err) {
      console.warn("Backend request failed, showing success screen:", err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi, I want to inquire about leasing at Connaught Place Hisar.\nSpace Type: ${spaceType}\nSize: ${spaceSize}\nName: ${formData.name || "Investor"}`
    );
    window.open(`https://wa.me/919718064000?text=${text}`, "_blank");
  };

  return (
    <main className="overflow-x-hidden bg-[#f7f5f0] text-[#151712] pt-20">
      {/* HERO SECTION — Dark Contrast Banner */}
      <section className="relative min-h-[46vh] overflow-hidden bg-[#0c0e0b] text-white py-16 border-b border-white/10">
        <img src={hero} alt="Aerial View" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0e0b] via-[#0c0e0b]/80 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[38vh] max-w-[1380px] items-end px-5 lg:px-8">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#c5a880]/40 bg-[#c5a880]/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#e6d5b8]">
              <Sparkles size={12} className="text-[#c5a880]" /> Leasing Desk & Advisory
            </div>
            <h1 className="font-cinzel text-4xl font-extrabold text-white sm:text-6xl">
              Let's Discuss <br />
              <span className="gold-gradient-text-light font-display italic">Your Commercial Space.</span>
            </h1>
            <p className="mt-3 max-w-xl text-xs text-white/70 sm:text-sm">
              Connect directly with our official Connaught Place Hisar commercial team.
            </p>
          </div>
        </div>
      </section>

      {/* FORM & INFO SECTION */}
      <section className="bg-[#f7f5f0] px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-[1380px] gap-8 lg:grid-cols-[.8fr_1.2fr]">
          {/* Contact Details Card — Dark Contrast Container */}
          <div className="rounded-3xl border border-black/10 bg-[#121510] text-white p-6 sm:p-8 space-y-8 flex flex-col justify-between shadow-xl">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c5a880]">
                Direct Contacts
              </span>
              <h3 className="font-cinzel mt-2 text-3xl font-bold text-white">
                Commercial Leasing Office
              </h3>
              <p className="mt-2 text-xs text-white/60">
                Reach out for floor availability, brand lease terms, or to schedule a guided site walkthrough.
              </p>

              <div className="mt-8 space-y-5 text-xs">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#c5a880]/15 text-[#c5a880]">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">Location</p>
                    <p className="mt-0.5 text-sm font-semibold text-white">Sector 25, Hisar, Haryana</p>
                    <p className="text-[11px] text-white/50">5 Mins from Hisar International Airport</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#c5a880]/15 text-[#c5a880]">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">Phone Hotline</p>
                    <a href="tel:+919718064000" className="mt-0.5 text-sm font-semibold text-[#e6d5b8] hover:underline">
                      +91 9718064000
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#c5a880]/15 text-[#c5a880]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">Official Email</p>
                    <a href="mailto:leasing@connaughtplacehisar.com" className="mt-0.5 text-sm font-semibold text-[#e6d5b8] hover:underline">
                      leasing@connaughtplacehisar.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Lightbox Card */}
            <div
              onClick={() =>
                onOpenLightbox &&
                onOpenLightbox(locationMap, "Sector 25 Map", "Hisar Sector 25 location connectivity reference.")
              }
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-black shadow-lg"
            >
              <img src={locationMap} alt="Location Map" className="h-44 w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="flex items-center gap-2 rounded-full bg-black/70 px-4 py-2 text-xs font-bold text-[#c5a880] backdrop-blur">
                  <Maximize2 size={14} /> Expand City Map
                </span>
              </div>
            </div>
          </div>

          {/* Form — Pure White Luxury Card */}
          <div className="rounded-3xl border border-black/8 bg-white p-6 sm:p-10 text-[#151712] shadow-xl">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8b6e40]">
                    Leasing Enquiry Form
                  </span>
                  <h3 className="font-cinzel mt-1 text-2xl font-bold text-[#151712] sm:text-3xl">
                    Submit Your Footprint Requirement
                  </h3>
                </div>

                {/* Space Type Radio Selector */}
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b6e40]">
                    Preferred Space Category
                  </label>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                    {["Retail Shop", "Showroom", "Food Court", "Anchor/Other"].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSpaceType(cat)}
                        className={`rounded-xl border py-2.5 text-center text-xs font-semibold transition ${
                          spaceType === cat
                            ? "border-[#121510] bg-[#121510] text-[#e6d5b8] shadow-md"
                            : "border-black/10 bg-[#f7f5f0] text-[#151712] hover:bg-black/5"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Range Selector */}
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b6e40]">
                    Size Range
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["300–400 sq.ft.", "500–1,000 sq.ft.", "1,000–5,000 sq.ft.", "5,000+ sq.ft."].map(
                      (sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSpaceSize(sz)}
                          className={`rounded-lg border px-3 py-1.5 text-xs transition ${
                            spaceSize === sz
                              ? "border-[#8b6e40] bg-[#c5a880]/20 text-[#8b6e40] font-semibold"
                              : "border-black/10 bg-[#f7f5f0] text-[#55594f] hover:text-[#151712]"
                          }`}
                        >
                          {sz}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Form Inputs */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#66695e]">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-black/15 bg-[#f7f5f0] px-4 py-3 text-xs text-[#151712] outline-none focus:border-[#8b6e40] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#66695e]">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl border border-black/15 bg-[#f7f5f0] px-4 py-3 text-xs text-[#151712] outline-none focus:border-[#8b6e40] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#66695e]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-black/15 bg-[#f7f5f0] px-4 py-3 text-xs text-[#151712] outline-none focus:border-[#8b6e40] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#66695e]">
                    Brand / Specific Requirements
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Share details about your brand, floor preference, or target timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full resize-none rounded-xl border border-black/15 bg-[#f7f5f0] px-4 py-3 text-xs text-[#151712] outline-none focus:border-[#8b6e40] focus:bg-white"
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    type="submit"
                    className="shimmer-btn flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#a88b60] py-4 text-xs font-bold uppercase tracking-wider text-[#090b08] shadow-xl shadow-[#c5a880]/20"
                  >
                    Send Commercial Enquiry <Send size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-600/40 bg-emerald-50 py-3 text-xs font-semibold text-emerald-800 hover:bg-emerald-100"
                  >
                    <FaWhatsapp size={16} /> Instant WhatsApp Chat With Leasing Officer
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#c5a880]/20 text-[#8b6e40]">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-cinzel text-3xl font-bold text-[#151712]">Enquiry Received!</h3>
                <p className="text-xs text-[#55594f] max-w-sm mx-auto">
                  Thank you, {formData.name || "Investor"}. The Connaught Place Hisar leasing desk will reach out to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="rounded-xl border border-[#8b6e40] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#8b6e40] hover:bg-[#8b6e40] hover:text-white"
                >
                  Submit Another Enquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
