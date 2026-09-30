import { useEffect, useState } from "react";
import { ChevronDown, Sparkles, Loader2 } from "lucide-react";
import API_URL from "../api";

const defaultFaqs = [
  {
    _id: "default-1",
    question: "What is the location advantage of Connaught Place Hisar?",
    answer: "Connaught Place Hisar is located in Sector 25, Hisar — strategically positioned just 5 minutes drive from Hisar International Airport with direct connectivity to the Delhi-Sirsa NH-9 highway and Hisar Integrated Manufacturing Cluster (IMC).",
  },
  {
    _id: "default-2",
    question: "What sizes are available for retail shops and independent showrooms?",
    answer: "Retail shops range from 300 to 400 sq.ft across Ground, 1st, 2nd, and 3rd floors. Independent showrooms range from 1,000 to 10,000 sq.ft designed for high-capacity anchor brands.",
  },
  {
    _id: "default-3",
    question: "What are the rates per square foot?",
    answer: "Ground Floor retail starts at ₹21,000/sq.ft, 1st Floor at ₹19,000/sq.ft, 2nd Floor at ₹17,000/sq.ft, and 3rd Floor at ₹16,000/sq.ft. Independent Showroom sale rates are ₹26,000/sq.ft + PLC & government charges.",
  },
  {
    _id: "default-4",
    question: "What does the 9-Year Brand Lease entail?",
    answer: "The 9-year brand lease structure provides guaranteed brand placement terms, long-term commercial rental income stability, and structured rental escalation clauses designed for institutional & retail investors.",
  },
  {
    _id: "default-5",
    question: "How can I schedule a physical site visit or request a floor plan?",
    answer: "You can click on the 'Inquire Now' or 'Schedule Visit' buttons across our portal or connect directly via WhatsApp to arrange an official guided site walkthrough with our leasing desk.",
  },
];

const FAQSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/faqs`);
      const data = await res.json();
      if (res.ok && data.success && data.data && data.data.length > 0) {
        setFaqs(data.data);
      } else {
        setFaqs(defaultFaqs);
      }
    } catch (err) {
      console.warn("Could not fetch live FAQs, using default:", err);
      setFaqs(defaultFaqs);
    } finally {
      setLoading(false);
    }
  };

  const listToDisplay = faqs.length > 0 ? faqs : defaultFaqs;

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c5a880]/50 bg-[#c5a880]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#8b6e40]">
          <Sparkles size={12} className="text-[#8b6e40]" /> Investor Clarity
        </span>
        <h3 className="font-cinzel mt-2 text-3xl font-bold text-[#151712] sm:text-4xl">
          Frequently Asked Questions
        </h3>
        <p className="mt-2 text-sm text-[#33362d] sm:text-base">
          Everything you need to know about commercial investment at Connaught Place Hisar.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 text-black/50">
          <Loader2 className="animate-spin mb-2 text-[#8c734b]" size={24} />
          <p className="text-xs">Loading FAQs...</p>
        </div>
      ) : (
        <div className="space-y-3">
          {listToDisplay.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq._id || idx}
                className={`overflow-hidden rounded-2xl border transition ${
                  isOpen
                    ? "border-[#c5a880] bg-white shadow-lg ring-1 ring-[#c5a880]/30"
                    : "border-black/8 bg-white hover:border-[#c5a880]/40"
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between p-5 text-left transition cursor-pointer"
                >
                  <span className="font-cinzel text-sm font-bold text-[#151712] sm:text-base pr-4">
                    {faq.question || faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-[#8b6e40] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-black/5 px-5 pb-5 pt-3 text-sm leading-relaxed text-[#33362d] sm:text-base">
                    {faq.answer || faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FAQSection;
