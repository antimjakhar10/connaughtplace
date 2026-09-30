import { ArrowUpRight, Mail, MapPin, Phone, ArrowUp, Sparkles, Send } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = ({ onOpenEnquiry }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[#c5a880]/30 bg-[#090b08] text-white">
      {/* Upper Action Banner */}
      {/* <div className="border-b border-white/10 bg-gradient-to-r from-[#121510] via-[#1a2016] to-[#121510] px-5 py-10 lg:px-8">
        <div className="mx-auto flex max-w-[1380px] flex-col items-center justify-between gap-6 lg:flex-row">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#c5a880]">
              <Sparkles size={12} /> Commercial Ownership & Leasing Desk
            </span>
            <h3 className="font-cinzel text-2xl font-bold text-white sm:text-3xl">
              Connaught Place Hisar · Sector 25
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:+919718064000"
              className="rounded-xl border border-[#c5a880] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#c5a880] transition hover:bg-[#c5a880] hover:text-[#090b08]"
            >
              Call Hotline: 9718064000
            </a>
            <button
              onClick={() => onOpenEnquiry && onOpenEnquiry("Footer Banner")}
              className="shimmer-btn flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#a88b60] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#090b08] shadow-lg shadow-[#c5a880]/20 transition hover:opacity-95"
            >
              Schedule Site Visit <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </div> */}

      {/* Main Footer Links */}
      <div className="mx-auto max-w-[1380px] px-5 py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* Brand Info */}
          <div>
            <Link to="/" className="inline-block transition duration-300 hover:opacity-95">
              <div className="flex items-center justify-center overflow-hidden rounded-xl bg-white px-4 py-2 shadow-lg ring-2 ring-[#c5a880]/50">
                <img src="/logo.jpeg" alt="Connaught Place Hisar Logo" className="h-14 w-auto max-w-[240px] object-contain" />
              </div>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/75">
              A premier 9-acre commercial destination in Sector 25, Hisar. Designed around high-footfall retail, food court hubs, multiplex entertainment, and 9-year brand lease showrooms.
            </p>

            <div className="mt-6 flex gap-2">
              {[
                [FaInstagram, "Instagram"],
                [FaFacebookF, "Facebook"],
                [FaLinkedinIn, "LinkedIn"],
                [FaYoutube, "YouTube"],
              ].map(([Icon, label]) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-[#c5a880] hover:bg-[#c5a880] hover:text-[#090b08]"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#c5a880]">Navigation</p>
            <div className="grid gap-2.5 text-sm text-white/70">
              <Link to="/" className="transition hover:text-[#c5a880]">Home Overview</Link>
              <Link to="/about" className="transition hover:text-[#c5a880]">Project Vision & Location</Link>
              <Link to="/leasing" className="transition hover:text-[#c5a880]">Leasing & Rate Specs</Link>
              <Link to="/contact" className="transition hover:text-[#c5a880]">Contact Leasing Desk</Link>
            </div>
          </div>

          {/* Rates Summary */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#c5a880]">Leasing Highlights</p>
            <div className="grid gap-2 text-sm text-white/75">
              <p>• Ground Floor: ₹21,000 / sq.ft.</p>
              <p>• 1st Floor: ₹19,000 / sq.ft.</p>
              <p>• 2nd Floor: ₹17,000 / sq.ft.</p>
              <p>• 3rd Floor: ₹16,000 / sq.ft.</p>
              <p>• Showrooms: ₹26,000 / sq.ft.</p>
              <p className="font-semibold text-[#c5a880]">• 9-Year Brand Lease</p>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[#c5a880]">Leasing Desk</p>
            <div className="grid gap-3.5 text-xs text-white/60">
              <div className="flex gap-3">
                <MapPin size={16} className="shrink-0 text-[#c5a880]" />
                <span>Sector 25, Hisar, Haryana (5 Mins from Airport)</span>
              </div>
              <div className="flex gap-3">
                <Phone size={16} className="shrink-0 text-[#c5a880]" />
                <a href="tel:+919718064000" className="hover:text-[#c5a880] transition">+91 9718064000 (Commercial Desk)</a>
              </div>
              <div className="flex gap-3">
                <Mail size={16} className="shrink-0 text-[#c5a880]" />
                <span>leasing@connaughtplacehisar.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-12 border-t border-white/10 pt-6 text-[10px] text-white/40">
          <p className="leading-relaxed">
            *Disclaimer: All visuals, site plans, and rate cards presented are sourced from the official Connaught Place Hisar presentation deck. Rates and terms are subject to final agreement & statutory guidelines.
          </p>

          <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p>© {new Date().getFullYear()} Connaught Place Hisar. All rights reserved.</p>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-white/60 transition hover:border-[#c5a880] hover:text-[#c5a880]"
            >
              <span>Back to Top</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
