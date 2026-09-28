import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, Sparkles, Phone } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ onOpenEnquiry }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Sale Rates & Specs", path: "/leasing" },
    { label: "Contact Sales", path: "/contact" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Top Luxury Announcement Ticker */}
      <div className="bg-gradient-to-r from-[#0c0e0b] via-[#1a2016] to-[#0c0e0b] px-4 py-1.5 text-center text-[10px] font-semibold tracking-wider text-[#e6d5b8] border-b border-[#c5a880]/30 shadow-sm">
        <span className="inline-flex items-center flex-wrap justify-center gap-2">
          <Sparkles size={11} className="text-[#c5a880]" />
          <span>Sector 25, Hisar · Commercial Shops & Showrooms For Sale · 9-Year Brand Lease Return</span>
          <span className="hidden sm:inline text-[#c5a880]">|</span>
          <a href="tel:+919718064000" className="inline-flex items-center gap-1 font-bold text-[#c5a880] hover:underline">
            <Phone size={10} /> Call: +91 9718064000
          </a>
        </span>
      </div>

      {/* Main Navbar Floating Bar */}
      <div className="px-3 pt-2.5 sm:px-5">
        <nav
          className={`mx-auto flex max-w-[1380px] items-center justify-between rounded-2xl border px-3 py-2.5 transition-all duration-300 sm:px-5 ${
            scrolled
              ? "border-[#c5a880]/40 bg-[#121510]/95 text-white shadow-2xl backdrop-blur-xl py-2 ring-1 ring-black/10"
              : "border-white/20 bg-[#121510]/85 text-white shadow-xl backdrop-blur-md"
          }`}
        >
          {/* Logo Brand */}
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="group flex items-center transition duration-300 hover:opacity-95"
          >
            <div className="relative flex items-center justify-center overflow-hidden rounded-xl bg-white px-3 py-1.5 shadow-lg ring-2 ring-[#c5a880]/60 transition duration-300 group-hover:scale-105 group-hover:ring-[#c5a880]">
              <img
                src="/logo.jpeg"
                alt="Connaught Place Hisar Logo"
                className="h-10 w-auto max-w-[180px] object-contain sm:h-12 sm:max-w-[240px] md:h-14"
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? "bg-[#c5a880] text-[#090b08] font-bold shadow-md shadow-[#c5a880]/20"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Call to Action */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => onOpenEnquiry && onOpenEnquiry("Inquire To Buy")}
              className="shimmer-btn flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#a88b60] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#090b08] shadow-md shadow-[#c5a880]/20 transition hover:scale-105"
            >
              Inquire To Buy <ArrowUpRight size={15} />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white md:hidden"
            aria-label="Toggle navigation"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mobile Navigation Drawer */}
        <div
          className={`mx-auto mt-2 max-w-[1380px] overflow-hidden rounded-2xl border border-[#c5a880]/30 bg-[#121510]/98 text-white shadow-2xl backdrop-blur-2xl transition-all duration-300 md:hidden ${
            open ? "max-h-[380px] opacity-100 p-3" : "max-h-0 opacity-0 p-0 pointer-events-none"
          }`}
        >
          <div className="grid gap-1.5">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-wider transition ${
                    isActive
                      ? "bg-[#c5a880] text-[#090b08]"
                      : "text-white/80 hover:bg-white/10"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                if (onOpenEnquiry) onOpenEnquiry("Mobile Menu");
              }}
              className="mt-2 flex items-center justify-between rounded-xl bg-gradient-to-r from-[#c5a880] to-[#a88b60] px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-[#090b08]"
            >
              <span>Inquire To Buy Shop</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
