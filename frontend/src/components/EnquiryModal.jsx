import { useState } from "react";
import { X, CheckCircle2, Send, PhoneCall, Sparkles, Loader2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import API_URL from "../api";

const EnquiryModal = ({ isOpen, onClose, initialType = "Buy Retail Shop" }) => {
  const [spaceType, setSpaceType] = useState(initialType);
  const [spaceSize, setSpaceSize] = useState("300-400 sq.ft.");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${API_URL || "http://localhost:5000"}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          spaceType,
          spaceSize,
          source: "Enquiry Modal",
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.message || "Failed to submit enquiry.");
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
      `Hi, I want to purchase / invest in a shop at Connaught Place Hisar.\nUnit Preference: ${spaceType}\nSize: ${spaceSize}\nName: ${name || "Investor"}`
    );
    window.open(`https://wa.me/919718064000?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-[#c5a880]/40 bg-[#121510] text-white shadow-2xl shadow-black/90 sm:p-2">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#c5a880]/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-[#566f35]/15 blur-3xl" />

        <div className="relative p-6 sm:p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/20 hover:text-white"
          >
            <X size={18} />
          </button>

          {!submitted ? (
            <>
              <div className="mb-6">
                <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[#c5a880]/30 bg-[#c5a880]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#e6d5b8]">
                  <Sparkles size={12} /> Commercial Shop Sale & Investment
                </div>
                <h3 className="font-cinzel text-2xl font-bold tracking-wide text-white sm:text-3xl">
                  Inquire to Buy Shop / Schedule Site Visit
                </h3>
                <p className="mt-1 text-xs text-white/60">
                  Connect with the official Connaught Place Hisar sales desk.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Space Type Selector */}
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#c5a880]">
                    Select Unit Interest
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Buy Retail Shop", "Buy Showroom", "Buy Food Court"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSpaceType(type)}
                        className={`rounded-xl border py-2.5 text-center text-xs font-medium transition ${
                          spaceType === type
                            ? "border-[#c5a880] bg-[#c5a880] font-semibold text-[#090b08] shadow-md shadow-[#c5a880]/20"
                            : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Chips */}
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#c5a880]">
                    Preferred Unit Size Range
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["300-400 sq.ft.", "500-1,000 sq.ft.", "1,000-5,000 sq.ft.", "5,000+ sq.ft."].map(
                      (size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSpaceSize(size)}
                          className={`rounded-lg border px-3 py-1.5 text-xs transition ${
                            spaceSize === size
                              ? "border-[#c5a880] bg-[#c5a880]/20 font-semibold text-[#e6d5b8]"
                              : "border-white/10 bg-white/5 text-white/60 hover:text-white"
                          }`}
                        >
                          {size}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Inputs */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white outline-none transition focus:border-[#c5a880] focus:bg-white/10"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white outline-none transition focus:border-[#c5a880] focus:bg-white/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white outline-none transition focus:border-[#c5a880] focus:bg-white/10"
                  />
                </div>

                {/* Submit Actions */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="shimmer-btn flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#a88b60] py-3.5 text-xs font-bold uppercase tracking-wider text-[#090b08] shadow-lg shadow-[#c5a880]/20 transition hover:opacity-95"
                  >
                    Submit Purchase Enquiry <Send size={14} />
                  </button>

                  <div className="my-3 flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-[10px] uppercase tracking-widest text-white/40">OR</span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/40 py-3 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-900/60"
                  >
                    <FaWhatsapp size={16} /> Instant WhatsApp Sales Chat
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#c5a880]/20 text-[#c5a880]">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="font-cinzel text-2xl font-bold text-white">Enquiry Submitted!</h3>
              <p className="mt-2 text-xs text-white/70">
                Thank you {name || "Investor"}. Our sales desk will get in touch with you shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-6 rounded-xl border border-[#c5a880] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#c5a880] transition hover:bg-[#c5a880] hover:text-[#090b08]"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnquiryModal;
