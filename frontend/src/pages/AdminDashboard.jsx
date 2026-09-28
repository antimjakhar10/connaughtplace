import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Building2,
  Clock,
  CheckCircle2,
  Phone,
  Mail,
  Search,
  LogOut,
  RefreshCw,
  Trash2,
  Download,
  Sparkles,
  FileText,
  Filter,
  MessageSquare,
  X,
  Loader2,
  LayoutDashboard,
  Inbox,
  Send,
  ChevronRight,
  Menu,
  Image as ImageIcon,
  Plus,
  Star,
  Quote,
  Video,
  HelpCircle,
  Pencil,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import API_URL from "../api";

const AdminDashboard = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [testiLoading, setTestiLoading] = useState(false);
  const [faqLoading, setFaqLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [spaceFilter, setSpaceFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'modal' | 'contact' | 'gallery' | 'testimonials' | 'faqs'
  
  const [updatingId, setUpdatingId] = useState(null);
  const [notesModalData, setNotesModalData] = useState(null);
  const [notesInput, setNotesInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Gallery Image Form State (Add & Edit)
  const [newImageModalOpen, setNewImageModalOpen] = useState(false);
  const [editingImageId, setEditingImageId] = useState(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageCategory, setImageCategory] = useState("Night Plaza & Dining");
  const [imageDescription, setImageDescription] = useState("");
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);


  // Testimonial Form State (Add & Edit)
  const [newTestiModalOpen, setNewTestiModalOpen] = useState(false);
  const [editingTestiId, setEditingTestiId] = useState(null);
  const [testiName, setTestiName] = useState("");
  const [testiRole, setTestiRole] = useState("Retail Shop Investor");
  const [testiRating, setTestiRating] = useState(5);
  const [testiQuote, setTestiQuote] = useState("");
  const [testiVideoUrl, setTestiVideoUrl] = useState("");
  const [testiAvatar, setTestiAvatar] = useState("");
  const [savingTesti, setSavingTesti] = useState(false);

  // FAQ Form State (Add & Edit)
  const [newFaqModalOpen, setNewFaqModalOpen] = useState(false);
  const [editingFaqId, setEditingFaqId] = useState(null);
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");
  const [faqCategory, setFaqCategory] = useState("Investment & Returns");
  const [savingFaq, setSavingFaq] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");
  const user = JSON.parse(localStorage.getItem("adminUser") || "{}");

  useEffect(() => {
    if (!token) {
      navigate("/admin");
    } else {
      fetchEnquiries();
      fetchGalleryImages();
      fetchTestimonials();
      fetchFaqs();
    }
  }, [token]);

  const fetchEnquiries = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL || "http://localhost:5000"}/api/enquiries`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setEnquiries(data.data || []);
      } else {
        if (res.status === 401) {
          localStorage.removeItem("adminToken");
          navigate("/admin");
        } else {
          setError(data.message || "Failed to load enquiries.");
        }
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to connect to backend server.");
    } finally {
      setLoading(false);
    }
  };

  const fetchGalleryImages = async () => {
    setGalleryLoading(true);
    try {
      const res = await fetch(`${API_URL || "http://localhost:5000"}/api/gallery`);
      const data = await res.json();
      if (res.ok && data.success) {
        setGalleryImages(data.data || []);
      }
    } catch (err) {
      console.error("Fetch Gallery Error:", err);
    } finally {
      setGalleryLoading(false);
    }
  };

  const fetchTestimonials = async () => {
    setTestiLoading(true);
    try {
      const res = await fetch(`${API_URL || "http://localhost:5000"}/api/testimonials`);
      const data = await res.json();
      if (res.ok && data.success) {
        setTestimonials(data.data || []);
      }
    } catch (err) {
      console.error("Fetch Testimonials Error:", err);
    } finally {
      setTestiLoading(false);
    }
  };

  const fetchFaqs = async () => {
    setFaqLoading(true);
    try {
      const res = await fetch(`${API_URL || "http://localhost:5000"}/api/faqs`);
      const data = await res.json();
      if (res.ok && data.success) {
        setFaqs(data.data || []);
      }
    } catch (err) {
      console.error("Fetch FAQs Error:", err);
    } finally {
      setFaqLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`${API_URL || "http://localhost:5000"}/api/enquiries/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setEnquiries((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error("Update Status Error:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;

    try {
      const res = await fetch(`${API_URL || "http://localhost:5000"}/api/enquiries/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setEnquiries((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  const handleSaveNotes = async () => {
    if (!notesModalData) return;
    try {
      const res = await fetch(
        `${API_URL || "http://localhost:5000"}/api/enquiries/${notesModalData._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ notes: notesInput }),
        }
      );
      const data = await res.json();
      if (res.ok && data.success) {
        setEnquiries((prev) =>
          prev.map((item) =>
            item._id === notesModalData._id ? { ...item, notes: notesInput } : item
          )
        );
        setNotesModalData(null);
      }
    } catch (err) {
      console.error("Save Notes Error:", err);
    }
  };

  // Convert File to Base64 for Gallery
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert("File size is too large. Please select an image under 15MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrlInput(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Convert Video File to Base64/URL
  const handleVideoFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 45 * 1024 * 1024) {
      alert("Video file is too large. Please select a video under 45MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setTestiVideoUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Convert Avatar File to Base64/URL
  const handleAvatarFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Avatar file is too large. Please select an image under 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setTestiAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const openEditGalleryModal = (item) => {
    setEditingImageId(item._id);
    setImageTitle(item.title || "");
    setImageCategory(item.category || "Night Plaza & Dining");
    setImageDescription(item.description || "");
    setImageUrlInput(item.imageUrl || "");
    setNewImageModalOpen(true);
  };

  const handleSaveGalleryImage = async (e) => {
    e.preventDefault();
    if (!imageTitle || !imageUrlInput) {
      alert("Please provide both image title and image URL/file.");
      return;
    }

    setUploadingImage(true);
    const isEdit = Boolean(editingImageId);
    const url = isEdit
      ? `${API_URL || "http://localhost:5000"}/api/gallery/${editingImageId}`
      : `${API_URL || "http://localhost:5000"}/api/gallery`;
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: imageTitle,
          category: imageCategory,
          imageUrl: imageUrlInput,
          description: imageDescription,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (isEdit) {
          setGalleryImages((prev) =>
            prev.map((item) => (item._id === editingImageId ? data.data : item))
          );
        } else {
          setGalleryImages((prev) => [data.data, ...prev]);
        }
        setNewImageModalOpen(false);
        setEditingImageId(null);
        setImageTitle("");
        setImageDescription("");
        setImageUrlInput("");
      } else {
        alert(data.message || "Failed to save photo.");
      }
    } catch (err) {
      console.error("Save Gallery Image Error:", err);
      alert("Failed to connect to server.");
    } finally {
      setUploadingImage(false);
    }
  };


  const handleDeleteGalleryImage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this gallery image?")) return;

    try {
      const res = await fetch(`${API_URL || "http://localhost:5000"}/api/gallery/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setGalleryImages((prev) => prev.filter((img) => img._id !== id));
      }
    } catch (err) {
      console.error("Delete Gallery Image Error:", err);
    }
  };

  // Open Edit Testimonial Modal
  const openEditTestimonialModal = (item) => {
    setEditingTestiId(item._id);
    setTestiName(item.name || "");
    setTestiRole(item.role || "Retail Shop Investor");
    setTestiRating(item.rating || 5);
    setTestiQuote(item.quote || "");
    setTestiVideoUrl(item.videoUrl || "");
    setTestiAvatar(item.avatar || "");
    setNewTestiModalOpen(true);
  };

  // Add / Edit Testimonial Handler
  const handleSaveTestimonial = async (e) => {
    e.preventDefault();
    if (!testiName || !testiQuote) {
      alert("Please provide client name and review quote.");
      return;
    }

    setSavingTesti(true);
    const isEdit = Boolean(editingTestiId);
    const url = isEdit
      ? `${API_URL || "http://localhost:5000"}/api/testimonials/${editingTestiId}`
      : `${API_URL || "http://localhost:5000"}/api/testimonials`;
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: testiName,
          role: testiRole,
          rating: testiRating,
          quote: testiQuote,
          videoUrl: testiVideoUrl,
          avatar: testiAvatar,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (isEdit) {
          setTestimonials((prev) =>
            prev.map((item) => (item._id === editingTestiId ? data.data : item))
          );
        } else {
          setTestimonials((prev) => [data.data, ...prev]);
        }
        setNewTestiModalOpen(false);
        setEditingTestiId(null);
        setTestiName("");
        setTestiQuote("");
        setTestiVideoUrl("");
        setTestiAvatar("");
      } else {
        alert(data.message || "Failed to save testimonial.");
      }
    } catch (err) {
      console.error("Save Testimonial Error:", err);
      alert("Failed to connect to server.");
    } finally {
      setSavingTesti(false);
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const res = await fetch(`${API_URL || "http://localhost:5000"}/api/testimonials/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setTestimonials((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error("Delete Testimonial Error:", err);
    }
  };

  // Open Edit FAQ Modal
  const openEditFaqModal = (item) => {
    setEditingFaqId(item._id);
    setFaqQuestion(item.question || "");
    setFaqAnswer(item.answer || "");
    setFaqCategory(item.category || "Investment & Returns");
    setNewFaqModalOpen(true);
  };

  // Add / Edit FAQ Handler
  const handleSaveFaq = async (e) => {
    e.preventDefault();
    if (!faqQuestion || !faqAnswer) {
      alert("Please enter question and answer.");
      return;
    }

    setSavingFaq(true);
    const isEdit = Boolean(editingFaqId);
    const url = isEdit
      ? `${API_URL || "http://localhost:5000"}/api/faqs/${editingFaqId}`
      : `${API_URL || "http://localhost:5000"}/api/faqs`;
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          question: faqQuestion,
          answer: faqAnswer,
          category: faqCategory,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (isEdit) {
          setFaqs((prev) =>
            prev.map((item) => (item._id === editingFaqId ? data.data : item))
          );
        } else {
          setFaqs((prev) => [...prev, data.data]);
        }
        setNewFaqModalOpen(false);
        setEditingFaqId(null);
        setFaqQuestion("");
        setFaqAnswer("");
      } else {
        alert(data.message || "Failed to save FAQ.");
      }
    } catch (err) {
      console.error("Save FAQ Error:", err);
      alert("Failed to connect to server.");
    } finally {
      setSavingFaq(false);
    }
  };

  const handleDeleteFaq = async (id) => {
    if (!window.confirm("Are you sure you want to delete this FAQ?")) return;

    try {
      const res = await fetch(`${API_URL || "http://localhost:5000"}/api/faqs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFaqs((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error("Delete FAQ Error:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin");
  };

  const exportToCSV = () => {
    if (enquiries.length === 0) return;
    const headers = ["Date", "Name", "Phone", "Email", "Space Type", "Space Size", "Source", "Status", "Notes"];
    const rows = filteredEnquiries.map((e) => [
      new Date(e.createdAt).toLocaleString(),
      `"${e.name || ""}"`,
      `"${e.phone || ""}"`,
      `"${e.email || ""}"`,
      `"${e.spaceType || ""}"`,
      `"${e.spaceSize || ""}"`,
      `"${e.source || ""}"`,
      `"${e.status || "New"}"`,
      `"${(e.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CP_Hisar_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Dynamic source counts
  const modalEnquiriesCount = enquiries.filter((e) => e.source === "Enquiry Modal").length;
  const contactFormCount = enquiries.filter((e) => e.source === "Contact Page Form" || e.source === "Contact Form").length;

  const getSourceFilteredList = () => {
    if (activeTab === "modal") {
      return enquiries.filter((e) => e.source === "Enquiry Modal");
    }
    if (activeTab === "contact") {
      return enquiries.filter((e) => e.source === "Contact Page Form" || e.source === "Contact Form");
    }
    return enquiries; // 'overview'
  };

  const baseList = getSourceFilteredList();

  const filteredEnquiries = baseList.filter((item) => {
    const matchesSearch =
      (item.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.phone || "").includes(searchTerm) ||
      (item.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.spaceType || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    const matchesSpace = spaceFilter === "All" || item.spaceType === spaceFilter;

    return matchesSearch && matchesStatus && matchesSpace;
  });

  // Calculate Stat Summaries
  const totalLeads = enquiries.length;
  const newLeads = enquiries.filter((e) => e.status === "New" || !e.status).length;
  const inProgressLeads = enquiries.filter((e) => e.status === "Contacted" || e.status === "In Progress").length;
  const closedLeads = enquiries.filter((e) => e.status === "Closed").length;

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#151712] font-sans flex">
      {/* SIDEBAR NAVIGATION - CLEAR PUBLIC LOGO NO EXTRA MARGIN */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-[#c5a880]/30 shadow-2xl transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            {/* Clean Sidebar Header using public /logo.jpeg with zero extra margin */}
            <div className="p-3 border-b border-black/10 bg-white relative flex items-center justify-center min-h-[90px]">
              <img
                src="/logo.jpeg"
                alt="Connaught Place Hisar Logo"
                className="h-20 sm:h-22 w-auto max-w-[220px] object-contain"
              />
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-black/50 hover:text-black p-1.5 absolute right-3 top-4 bg-white rounded-full border border-black/10 shadow-xs"
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="p-5 space-y-2">
              <div className="px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8c734b]">
                Navigation Menu
              </div>

              <button
                onClick={() => {
                  setActiveTab("overview");
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition cursor-pointer ${
                  activeTab === "overview"
                    ? "bg-[#121510] text-white shadow-lg shadow-black/10"
                    : "text-[#151712]/80 hover:bg-[#f2efe6] hover:text-[#151712]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard size={18} />
                  <span>Dashboard Overview</span>
                </div>
                <ChevronRight size={16} className="opacity-50" />
              </button>

              <button
                onClick={() => {
                  setActiveTab("modal");
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition cursor-pointer ${
                  activeTab === "modal"
                    ? "bg-[#121510] text-white shadow-lg shadow-black/10"
                    : "text-[#151712]/80 hover:bg-[#f2efe6] hover:text-[#151712]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Inbox size={18} />
                  <span>Modal Enquiries</span>
                </div>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                    activeTab === "modal" ? "bg-[#c5a880] text-black" : "bg-[#c5a880]/20 text-[#7a623a]"
                  }`}
                >
                  {modalEnquiriesCount}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("contact");
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition cursor-pointer ${
                  activeTab === "contact"
                    ? "bg-[#121510] text-white shadow-lg shadow-black/10"
                    : "text-[#151712]/80 hover:bg-[#f2efe6] hover:text-[#151712]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Send size={18} />
                  <span>Contact Form Submissions</span>
                </div>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                    activeTab === "contact" ? "bg-[#c5a880] text-black" : "bg-[#c5a880]/20 text-[#7a623a]"
                  }`}
                >
                  {contactFormCount}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("testimonials");
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition cursor-pointer ${
                  activeTab === "testimonials"
                    ? "bg-[#121510] text-white shadow-lg shadow-black/10"
                    : "text-[#151712]/80 hover:bg-[#f2efe6] hover:text-[#151712]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Star size={18} />
                  <span>Testimonial Manager</span>
                </div>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                    activeTab === "testimonials" ? "bg-[#c5a880] text-black" : "bg-black/10 text-[#151712]/70"
                  }`}
                >
                  {testimonials.length}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("faqs");
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition cursor-pointer ${
                  activeTab === "faqs"
                    ? "bg-[#121510] text-white shadow-lg shadow-black/10"
                    : "text-[#151712]/80 hover:bg-[#f2efe6] hover:text-[#151712]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <HelpCircle size={18} />
                  <span>FAQ Manager</span>
                </div>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                    activeTab === "faqs" ? "bg-[#c5a880] text-black" : "bg-black/10 text-[#151712]/70"
                  }`}
                >
                  {faqs.length}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("gallery");
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition cursor-pointer ${
                  activeTab === "gallery"
                    ? "bg-[#121510] text-white shadow-lg shadow-black/10"
                    : "text-[#151712]/80 hover:bg-[#f2efe6] hover:text-[#151712]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <ImageIcon size={18} />
                  <span>About Gallery Manager</span>
                </div>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                    activeTab === "gallery" ? "bg-[#c5a880] text-black" : "bg-black/10 text-[#151712]/70"
                  }`}
                >
                  {galleryImages.length}
                </span>
              </button>
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="p-5 border-t border-black/10 bg-[#fcfbf7]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[#151712]">{user.name || "Admin Manager"}</p>
                <p className="text-xs text-[#151712]/60 truncate max-w-[160px]">
                  {user.email || "admin@connaughtplace.com"}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2.5 rounded-xl text-red-600 hover:bg-red-50 border border-red-200 transition cursor-pointer"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-[#c5a880]/30 px-6 py-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl border border-black/10 text-black/70 hover:bg-black/5"
              >
                <Menu size={20} />
              </button>
              <div>
                <h1 className="font-cinzel text-2xl font-bold text-[#151712]">
                  {activeTab === "overview" && "DASHBOARD OVERVIEW"}
                  {activeTab === "modal" && "WEBSITE MODAL ENQUIRIES"}
                  {activeTab === "contact" && "CONTACT FORM SUBMISSIONS"}
                  {activeTab === "testimonials" && "CLIENT & INVESTOR TESTIMONIALS"}
                  {activeTab === "faqs" && "HOMEPAGE FAQ MANAGER"}
                  {activeTab === "gallery" && "ABOUT PAGE GALLERY MANAGER"}
                </h1>
                <p className="text-sm text-[#8c734b] font-medium mt-0.5">
                  {activeTab === "overview" && "High-level summary of lead flow and deal conversions"}
                  {activeTab === "modal" && "Leads captured via shop investment popup modals"}
                  {activeTab === "contact" && "Direct inquiries submitted from the Contact Us page"}
                  {activeTab === "testimonials" && "Add, edit, and manage client video feedback displayed on the website"}
                  {activeTab === "faqs" && "Add, edit, and manage frequently asked questions displayed on the website"}
                  {activeTab === "gallery" && "Upload and manage architectural photos displayed on the website About page"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {activeTab === "gallery" ? (
                <button
                  onClick={() => setNewImageModalOpen(true)}
                  className="flex items-center gap-2 rounded-xl bg-[#121510] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#252922] transition shadow-md cursor-pointer"
                >
                  <Plus size={18} /> Add New Gallery Image
                </button>
              ) : activeTab === "testimonials" ? (
                <button
                  onClick={() => {
                    setEditingTestiId(null);
                    setTestiName("");
                    setTestiRole("Retail Shop Investor");
                    setTestiRating(5);
                    setTestiQuote("");
                    setTestiVideoUrl("");
                    setTestiAvatar("");
                    setNewTestiModalOpen(true);
                  }}
                  className="flex items-center gap-2 rounded-xl bg-[#121510] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#252922] transition shadow-md cursor-pointer"
                >
                  <Plus size={18} /> Add Testimonial
                </button>
              ) : activeTab === "faqs" ? (
                <button
                  onClick={() => {
                    setEditingFaqId(null);
                    setFaqQuestion("");
                    setFaqAnswer("");
                    setFaqCategory("Investment & Returns");
                    setNewFaqModalOpen(true);
                  }}
                  className="flex items-center gap-2 rounded-xl bg-[#121510] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#252922] transition shadow-md cursor-pointer"
                >
                  <Plus size={18} /> Add New FAQ
                </button>
              ) : (
                <>
                  <button
                    onClick={fetchEnquiries}
                    className="flex items-center gap-2 rounded-xl border border-black/15 bg-[#f9f8f4] px-4 py-2.5 text-sm font-semibold text-black/90 hover:bg-[#f0ede4] transition cursor-pointer shadow-xs"
                    title="Refresh leads"
                  >
                    <RefreshCw size={16} className={loading ? "animate-spin text-[#8c734b]" : ""} />
                    <span className="hidden sm:inline">Refresh Data</span>
                  </button>

                  <button
                    onClick={exportToCSV}
                    disabled={enquiries.length === 0}
                    className="flex items-center gap-2 rounded-xl bg-[#121510] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#252922] transition shadow-md cursor-pointer disabled:opacity-40"
                  >
                    <Download size={16} /> <span className="hidden sm:inline">Export CSV</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-6 flex-1 overflow-y-auto">
          {/* TAB 1, 2, 3: LEADS MANAGER */}
          {activeTab !== "gallery" && activeTab !== "testimonials" && activeTab !== "faqs" && (
            <>
              {/* Summary Stat Cards - ONLY ON DASHBOARD OVERVIEW TAB */}
              {activeTab === "overview" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                  <div className="rounded-3xl border border-[#c5a880]/30 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#8c734b]">
                        Total Enquiries
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#c5a880]/15 text-[#8c734b]">
                        <Users size={20} />
                      </div>
                    </div>
                    <p className="mt-3 font-cinzel text-4xl font-extrabold text-[#151712]">{totalLeads}</p>
                    <p className="mt-1 text-xs text-[#151712]/60 font-medium">All website submissions</p>
                  </div>

                  <div className="rounded-3xl border border-amber-300 bg-amber-50/60 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                        New Leads
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
                        <Clock size={20} />
                      </div>
                    </div>
                    <p className="mt-3 font-cinzel text-4xl font-extrabold text-amber-950">{newLeads}</p>
                    <p className="mt-1 text-xs text-amber-800 font-medium">Needs immediate response</p>
                  </div>

                  <div className="rounded-3xl border border-blue-300 bg-blue-50/60 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
                        In Follow-Up
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 text-blue-800">
                        <MessageSquare size={20} />
                      </div>
                    </div>
                    <p className="mt-3 font-cinzel text-4xl font-extrabold text-blue-950">{inProgressLeads}</p>
                    <p className="mt-1 text-xs text-blue-800 font-medium">Active dialogue</p>
                  </div>

                  <div className="rounded-3xl border border-emerald-300 bg-emerald-50/60 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                        Closed Deals
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
                        <CheckCircle2 size={20} />
                      </div>
                    </div>
                    <p className="mt-3 font-cinzel text-4xl font-extrabold text-emerald-950">{closedLeads}</p>
                    <p className="mt-1 text-xs text-emerald-800 font-medium">Successful conversions</p>
                  </div>
                </div>
              )}

              {/* Filter Bar */}
              <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-[#c5a880]/30 bg-white p-5 sm:flex-row sm:items-center sm:justify-between shadow-sm">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" size={18} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by client name, phone number, email, or space interest..."
                    className="w-full rounded-2xl border border-black/15 bg-[#f9f8f4] py-3 pl-12 pr-4 text-sm font-medium text-black placeholder-black/40 focus:border-[#8c734b] focus:outline-none transition"
                  />
                </div>

                {/* Filter Dropdowns */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Filter size={16} className="text-[#8c734b]" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="rounded-2xl border border-black/15 bg-[#f9f8f4] py-2.5 px-4 text-xs font-bold text-black focus:outline-none focus:border-[#8c734b] cursor-pointer"
                    >
                      <option value="All">All Statuses</option>
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>

                  <select
                    value={spaceFilter}
                    onChange={(e) => setSpaceFilter(e.target.value)}
                    className="rounded-2xl border border-black/15 bg-[#f9f8f4] py-2.5 px-4 text-xs font-bold text-black focus:outline-none focus:border-[#8c734b] cursor-pointer"
                  >
                    <option value="All">All Unit Types</option>
                    <option value="Buy Retail Shop">Buy Retail Shop</option>
                    <option value="Buy Showroom">Buy Showroom</option>
                    <option value="Buy Food Court">Buy Food Court</option>
                    <option value="Retail Shop">Retail Shop</option>
                  </select>
                </div>
              </div>

              {/* Leads Data Listing Table */}
              <div className="overflow-hidden rounded-3xl border border-[#c5a880]/30 bg-white shadow-md">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-24 text-black/60">
                    <Loader2 className="animate-spin mb-4 text-[#8c734b]" size={36} />
                    <p className="text-sm font-bold">Loading dynamic leads from MongoDB...</p>
                  </div>
                ) : error ? (
                  <div className="p-10 text-center text-red-600">
                    <p className="text-base font-bold">{error}</p>
                    <button
                      onClick={fetchEnquiries}
                      className="mt-4 rounded-xl border border-red-300 bg-red-50 px-5 py-2.5 text-xs font-bold text-red-700 hover:bg-red-100 cursor-pointer"
                    >
                      Retry Connection
                    </button>
                  </div>
                ) : filteredEnquiries.length === 0 ? (
                  <div className="p-20 text-center text-black/50">
                    <FileText className="mx-auto mb-4 text-black/20" size={48} />
                    <p className="text-base font-bold text-[#151712]">No leads found for this view</p>
                    <p className="text-xs mt-1 text-black/60">Try searching with a different keyword or resetting filters.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="border-b border-[#c5a880]/30 bg-[#f9f8f4] uppercase text-xs tracking-wider text-[#8c734b] font-bold">
                        <tr>
                          <th className="px-6 py-4">Client Details</th>
                          <th className="px-6 py-4">Unit Interest & Size</th>
                          <th className="px-6 py-4">Source</th>
                          <th className="px-6 py-4">Date & Time</th>
                          <th className="px-6 py-4">Lead Status</th>
                          <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/5 text-[#151712]">
                        {filteredEnquiries.map((item) => (
                          <tr key={item._id} className="hover:bg-[#fcfbf8] transition">
                            {/* Client Info */}
                            <td className="px-6 py-5">
                              <div className="font-bold text-[#151712] text-base">{item.name}</div>
                              <div className="mt-1.5 flex items-center gap-4">
                                <a
                                  href={`tel:${item.phone}`}
                                  className="flex items-center gap-1.5 font-bold text-[#8c734b] hover:underline text-xs"
                                >
                                  <Phone size={13} /> {item.phone}
                                </a>
                                <a
                                  href={`https://wa.me/${item.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                    `Hi ${item.name}, thank you for reaching out to Connaught Place Hisar commercial sales desk.`
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 font-bold text-emerald-600 hover:underline text-xs"
                                  title="Message on WhatsApp"
                                >
                                  <FaWhatsapp size={15} /> WhatsApp
                                </a>
                              </div>
                              {item.email && (
                                <div className="mt-1 flex items-center gap-1.5 text-black/60 text-xs font-medium">
                                  <Mail size={12} /> {item.email}
                                </div>
                              )}
                              {item.message && (
                                <p className="mt-2 text-xs italic text-[#151712]/80 bg-[#f7f5f0] p-2.5 rounded-xl border border-black/5 max-w-lg">
                                  "{item.message}"
                                </p>
                              )}
                            </td>

                            {/* Space Details */}
                            <td className="px-6 py-5">
                              <span className="inline-block rounded-lg border border-[#c5a880]/40 bg-[#c5a880]/15 px-3 py-1 text-xs font-extrabold text-[#7a623a]">
                                {item.spaceType || "Retail Shop"}
                              </span>
                              {item.spaceSize && (
                                <div className="mt-1.5 text-xs text-black/70 font-medium">
                                  Size Range: <span className="font-bold text-black">{item.spaceSize}</span>
                                </div>
                              )}
                            </td>

                            {/* Source Tag */}
                            <td className="px-6 py-5">
                              <span
                                className={`inline-block rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider border ${
                                  item.source === "Enquiry Modal"
                                    ? "bg-amber-50 text-amber-900 border-amber-300"
                                    : "bg-purple-50 text-purple-900 border-purple-300"
                                }`}
                              >
                                {item.source || "Website Form"}
                              </span>
                            </td>

                            {/* Date */}
                            <td className="px-6 py-5 text-black/70 text-xs whitespace-nowrap">
                              <div className="font-bold text-[#151712]">
                                {new Date(item.createdAt).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </div>
                              <div className="text-[11px] text-black/50 font-medium">
                                {new Date(item.createdAt).toLocaleTimeString("en-IN", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </div>
                            </td>

                            {/* Status Dropdown */}
                            <td className="px-6 py-5">
                              <select
                                disabled={updatingId === item._id}
                                value={item.status || "New"}
                                onChange={(e) => handleStatusChange(item._id, e.target.value)}
                                className={`rounded-xl border px-3 py-2 text-xs font-extrabold focus:outline-none cursor-pointer transition shadow-xs ${
                                  item.status === "Closed"
                                    ? "border-emerald-300 bg-emerald-100 text-emerald-950"
                                    : item.status === "In Progress"
                                    ? "border-blue-300 bg-blue-100 text-blue-950"
                                    : item.status === "Contacted"
                                    ? "border-purple-300 bg-purple-100 text-purple-950"
                                    : "border-amber-300 bg-amber-100 text-amber-950"
                                }`}
                              >
                                <option value="New">New Lead</option>
                                <option value="Contacted">Contacted</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Closed">Closed Deal</option>
                              </select>
                            </td>

                            {/* Action Buttons */}
                            <td className="px-6 py-5 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => {
                                    setNotesModalData(item);
                                    setNotesInput(item.notes || "");
                                  }}
                                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-[#f9f8f4] text-black/70 hover:bg-[#eeebe0] hover:text-black transition cursor-pointer"
                                  title="Edit Admin Remarks"
                                >
                                  <FileText size={16} />
                                </button>
                                <button
                                  onClick={() => handleDelete(item._id)}
                                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition cursor-pointer"
                                  title="Delete Lead"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}

          {/* TAB 4: TESTIMONIALS MANAGER (WITH EDIT & DELETE) */}
          {activeTab === "testimonials" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white border border-[#c5a880]/30 rounded-3xl p-6 shadow-sm">
                <div>
                  <h3 className="font-cinzel text-xl font-bold text-[#151712]">
                    Homepage Video Testimonials ({testimonials.length})
                  </h3>
                  <p className="text-xs text-[#8c734b] font-medium mt-1">
                    Add, edit, or delete client reviews and video feedback displayed on the homepage.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingTestiId(null);
                    setTestiName("");
                    setTestiRole("Retail Shop Investor");
                    setTestiRating(5);
                    setTestiQuote("");
                    setTestiVideoUrl("");
                    setTestiAvatar("");
                    setNewTestiModalOpen(true);
                  }}
                  className="flex items-center gap-2 rounded-xl bg-[#121510] px-5 py-3 text-xs font-bold text-white hover:bg-[#252922] transition shadow-md cursor-pointer"
                >
                  <Plus size={16} /> Add Testimonial
                </button>
              </div>

              {testiLoading ? (
                <div className="flex flex-col items-center justify-center py-24 text-black/60">
                  <Loader2 className="animate-spin mb-4 text-[#8c734b]" size={36} />
                  <p className="text-sm font-bold">Loading testimonials from MongoDB...</p>
                </div>
              ) : testimonials.length === 0 ? (
                <div className="p-16 text-center border border-dashed border-black/20 bg-white rounded-3xl">
                  <Star className="mx-auto mb-3 text-black/30" size={48} />
                  <p className="text-base font-bold text-[#151712]">No dynamic testimonials yet</p>
                  <button
                    onClick={() => {
                      setEditingTestiId(null);
                      setTestiName("");
                      setTestiRole("Retail Shop Investor");
                      setTestiRating(5);
                      setTestiQuote("");
                      setTestiVideoUrl("");
                      setTestiAvatar("");
                      setNewTestiModalOpen(true);
                    }}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#8c734b] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#78613e]"
                  >
                    <Plus size={16} /> Add First Testimonial
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {testimonials.map((item) => (
                    <div
                      key={item._id}
                      className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm relative flex flex-col justify-between"
                    >
                      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                        <button
                          onClick={() => openEditTestimonialModal(item)}
                          className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 transition cursor-pointer"
                          title="Edit Testimonial"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteTestimonial(item._id)}
                          className="flex h-8 w-8 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition cursor-pointer"
                          title="Delete Testimonial"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div>
                        <div className="flex items-center gap-1 text-[#c5a880] mb-3">
                          {[...Array(item.rating || 5)].map((_, i) => (
                            <Star key={i} size={14} fill="#c5a880" />
                          ))}
                        </div>
                        <p className="text-xs text-[#33362e] italic leading-relaxed mb-4 pr-16">
                          "{item.quote}"
                        </p>
                      </div>

                      <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {item.avatar ? (
                            <img
                              src={item.avatar}
                              alt={item.name}
                              className="h-10 w-10 rounded-full object-cover border border-[#c5a880]/30"
                            />
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8c734b]/15 text-[#8c734b] font-bold text-sm">
                              {item.name.charAt(0)}
                            </div>
                          )}
                          <div>
                            <h4 className="font-bold text-xs text-[#151712]">{item.name}</h4>
                            <p className="text-[10px] text-[#8c734b] font-semibold">{item.role}</p>
                          </div>
                        </div>

                        {item.videoUrl && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200 px-2.5 py-1 text-[10px] font-bold text-blue-700">
                            <Video size={12} /> Video Attached
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: FAQ MANAGER (WITH EDIT & DELETE) */}
          {activeTab === "faqs" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white border border-[#c5a880]/30 rounded-3xl p-6 shadow-sm">
                <div>
                  <h3 className="font-cinzel text-xl font-bold text-[#151712]">
                    Homepage FAQs ({faqs.length})
                  </h3>
                  <p className="text-xs text-[#8c734b] font-medium mt-1">
                    Add, edit, or delete frequently asked questions displayed in the homepage FAQ section.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingFaqId(null);
                    setFaqQuestion("");
                    setFaqAnswer("");
                    setFaqCategory("Investment & Returns");
                    setNewFaqModalOpen(true);
                  }}
                  className="flex items-center gap-2 rounded-xl bg-[#121510] px-5 py-3 text-xs font-bold text-white hover:bg-[#252922] transition shadow-md cursor-pointer"
                >
                  <Plus size={16} /> Add New FAQ
                </button>
              </div>

              {faqLoading ? (
                <div className="flex flex-col items-center justify-center py-24 text-black/60">
                  <Loader2 className="animate-spin mb-4 text-[#8c734b]" size={36} />
                  <p className="text-sm font-bold">Loading FAQs from MongoDB...</p>
                </div>
              ) : faqs.length === 0 ? (
                <div className="p-16 text-center border border-dashed border-black/20 bg-white rounded-3xl">
                  <HelpCircle className="mx-auto mb-3 text-black/30" size={48} />
                  <p className="text-base font-bold text-[#151712]">No dynamic FAQs yet</p>
                  <button
                    onClick={() => {
                      setEditingFaqId(null);
                      setFaqQuestion("");
                      setFaqAnswer("");
                      setFaqCategory("Investment & Returns");
                      setNewFaqModalOpen(true);
                    }}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#8c734b] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#78613e]"
                  >
                    <Plus size={16} /> Add First FAQ
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {faqs.map((item) => (
                    <div
                      key={item._id}
                      className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm flex items-start justify-between gap-4"
                    >
                      <div className="space-y-2 flex-1">
                        <span className="inline-block rounded-full bg-[#c5a880]/15 px-3 py-0.5 text-[10px] font-bold text-[#7a623a] border border-[#c5a880]/30 uppercase tracking-wider">
                          {item.category || "General"}
                        </span>
                        <h4 className="font-cinzel text-base font-bold text-[#151712]">
                          {item.question}
                        </h4>
                        <p className="text-xs text-[#55594f] leading-relaxed">
                          {item.answer}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditFaqModal(item)}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 transition cursor-pointer"
                          title="Edit FAQ"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDeleteFaq(item._id)}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition cursor-pointer"
                          title="Delete FAQ"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: GALLERY MANAGER */}
          {activeTab === "gallery" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white border border-[#c5a880]/30 rounded-3xl p-6 shadow-sm">
                <div>
                  <h3 className="font-cinzel text-xl font-bold text-[#151712]">
                    About Page Live Gallery Images ({galleryImages.length})
                  </h3>
                  <p className="text-xs text-[#8c734b] font-medium mt-1">
                    Images added here automatically render in the About page gallery grid on the website.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingImageId(null);
                    setImageTitle("");
                    setImageDescription("");
                    setImageUrlInput("");
                    setImageCategory("Night Plaza & Dining");
                    setNewImageModalOpen(true);
                  }}
                  className="flex items-center gap-2 rounded-xl bg-[#121510] px-5 py-3 text-xs font-bold text-white hover:bg-[#252922] transition shadow-md cursor-pointer"
                >
                  <Plus size={16} /> Add Photo
                </button>
              </div>

              {galleryLoading ? (
                <div className="flex flex-col items-center justify-center py-24 text-black/60">
                  <Loader2 className="animate-spin mb-4 text-[#8c734b]" size={36} />
                  <p className="text-sm font-bold">Loading gallery photos from MongoDB...</p>
                </div>
              ) : galleryImages.length === 0 ? (
                <div className="p-16 text-center border border-dashed border-black/20 bg-white rounded-3xl">
                  <ImageIcon className="mx-auto mb-3 text-black/30" size={48} />
                  <p className="text-base font-bold text-[#151712]">No dynamic gallery photos yet</p>
                  <button
                    onClick={() => {
                      setEditingImageId(null);
                      setImageTitle("");
                      setImageDescription("");
                      setImageUrlInput("");
                      setImageCategory("Night Plaza & Dining");
                      setNewImageModalOpen(true);
                    }}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#8c734b] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#78613e]"
                  >
                    <Plus size={16} /> Add First Gallery Photo
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galleryImages.map((img) => (
                    <div
                      key={img._id}
                      className="group relative overflow-hidden rounded-3xl border border-black/10 bg-white shadow-md transition duration-300 hover:shadow-xl"
                    >
                      <div className="relative h-56 w-full overflow-hidden bg-black">
                        <img
                          src={img.imageUrl}
                          alt={img.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                        <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#e6d5b8] backdrop-blur-md">
                          {img.category || "Architectural"}
                        </span>
                        <div className="absolute top-3 right-3 flex items-center gap-2">
                          <button
                            onClick={() => openEditGalleryModal(img)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/90 text-white hover:bg-blue-700 transition cursor-pointer shadow-lg"
                            title="Edit Photo"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => handleDeleteGalleryImage(img._id)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600/90 text-white hover:bg-red-700 transition cursor-pointer shadow-lg"
                            title="Delete Photo"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="p-5">
                        <h4 className="font-cinzel text-base font-bold text-[#151712]">{img.title}</h4>
                        {img.description && (
                          <p className="mt-1 text-xs text-[#55594f] leading-relaxed line-clamp-2">
                            {img.description}
                          </p>
                        )}
                        <p className="mt-3 text-[10px] text-black/40 font-semibold uppercase tracking-wider">
                          Added: {new Date(img.createdAt).toLocaleDateString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Notes Modal */}
      {notesModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl border border-[#c5a880]/30 bg-white p-7 text-[#151712] shadow-2xl relative">
            <button
              onClick={() => setNotesModalData(null)}
              className="absolute right-5 top-5 text-black/40 hover:text-black"
            >
              <X size={20} />
            </button>
            <h3 className="font-cinzel text-xl font-bold text-[#151712] mb-1">
              Admin Remarks for {notesModalData.name}
            </h3>
            <p className="text-xs text-[#8c734b] font-bold mb-4">
              Phone: {notesModalData.phone} | Unit: {notesModalData.spaceType}
            </p>
            <textarea
              rows={4}
              value={notesInput}
              onChange={(e) => setNotesInput(e.target.value)}
              placeholder="Add internal sales remarks..."
              className="w-full rounded-2xl border border-black/15 bg-[#f9f8f4] p-4 text-xs font-medium text-black placeholder-black/40 focus:border-[#8c734b] focus:outline-none"
            />
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setNotesModalData(null)}
                className="rounded-xl border border-black/10 bg-[#f0ede4] px-5 py-2.5 text-xs font-bold text-black/80 hover:bg-[#e4e0d4]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                className="rounded-xl bg-[#121510] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#252922]"
              >
                Save Remarks
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit FAQ Modal */}
      {newFaqModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl border border-[#c5a880]/40 bg-white p-7 text-[#151712] shadow-2xl relative">
            <button
              onClick={() => {
                setNewFaqModalOpen(false);
                setEditingFaqId(null);
              }}
              className="absolute right-5 top-5 text-black/40 hover:text-black"
            >
              <X size={20} />
            </button>
            <h3 className="font-cinzel text-2xl font-bold text-[#151712] mb-1">
              {editingFaqId ? "Edit FAQ" : "Add New FAQ"}
            </h3>
            <p className="text-xs text-[#8c734b] font-bold mb-5">
              Will appear live on the homepage FAQ accordion section.
            </p>

            <form onSubmit={handleSaveFaq} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8c734b] mb-1.5">
                  Category Tag
                </label>
                <select
                  value={faqCategory}
                  onChange={(e) => setFaqCategory(e.target.value)}
                  className="w-full rounded-2xl border border-black/15 bg-[#f9f8f4] p-3 text-xs font-medium text-black focus:border-[#8c734b] focus:outline-none cursor-pointer"
                >
                  <option value="Investment & Returns">Investment & Returns</option>
                  <option value="Location & Access">Location & Access</option>
                  <option value="Inventory & Pricing">Inventory & Pricing</option>
                  <option value="Site Visit & Booking">Site Visit & Booking</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8c734b] mb-1.5">
                  Question *
                </label>
                <input
                  type="text"
                  required
                  value={faqQuestion}
                  onChange={(e) => setFaqQuestion(e.target.value)}
                  placeholder="e.g. What is the expected possession timeline?"
                  className="w-full rounded-2xl border border-black/15 bg-[#f9f8f4] p-3 text-xs font-medium text-black focus:border-[#8c734b] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8c734b] mb-1.5">
                  Answer *
                </label>
                <textarea
                  rows={4}
                  required
                  value={faqAnswer}
                  onChange={(e) => setFaqAnswer(e.target.value)}
                  placeholder="Provide detailed explanation for investors..."
                  className="w-full rounded-2xl border border-black/15 bg-[#f9f8f4] p-3 text-xs font-medium text-black focus:border-[#8c734b] focus:outline-none"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setNewFaqModalOpen(false);
                    setEditingFaqId(null);
                  }}
                  className="rounded-xl border border-black/10 bg-[#f0ede4] px-5 py-2.5 text-xs font-bold text-black/80 hover:bg-[#e4e0d4]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingFaq}
                  className="rounded-xl bg-[#121510] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#252922] disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {savingFaq ? (
                    <>
                      <Loader2 className="animate-spin" size={16} /> Saving to Database...
                    </>
                  ) : editingFaqId ? (
                    "Update FAQ"
                  ) : (
                    "Publish FAQ"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Testimonial Modal */}
      {newTestiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl border border-[#c5a880]/40 bg-white p-7 text-[#151712] shadow-2xl relative">
            <button
              onClick={() => {
                setNewTestiModalOpen(false);
                setEditingTestiId(null);
              }}
              className="absolute right-5 top-5 text-black/40 hover:text-black"
            >
              <X size={20} />
            </button>
            <h3 className="font-cinzel text-2xl font-bold text-[#151712] mb-1">
              {editingTestiId ? "Edit Client Testimonial" : "Add Client Testimonial"}
            </h3>
            <p className="text-xs text-[#8c734b] font-bold mb-5">
              Will appear live on the homepage testimonial section.
            </p>

            <form onSubmit={handleSaveTestimonial} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8c734b] mb-1">
                  Client / Investor Name *
                </label>
                <input
                  type="text"
                  required
                  value={testiName}
                  onChange={(e) => setTestiName(e.target.value)}
                  placeholder="e.g. Rajesh Singla"
                  className="w-full rounded-2xl border border-black/15 bg-[#f9f8f4] p-3 text-xs font-medium text-black focus:border-[#8c734b] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#8c734b] mb-1">
                    Role / Category
                  </label>
                  <input
                    type="text"
                    value={testiRole}
                    onChange={(e) => setTestiRole(e.target.value)}
                    placeholder="e.g. Retail Shop Investor"
                    className="w-full rounded-2xl border border-black/15 bg-[#f9f8f4] p-3 text-xs font-medium text-black focus:border-[#8c734b] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#8c734b] mb-1">
                    Rating (1 to 5 Stars)
                  </label>
                  <select
                    value={testiRating}
                    onChange={(e) => setTestiRating(Number(e.target.value))}
                    className="w-full rounded-2xl border border-black/15 bg-[#f9f8f4] p-3 text-xs font-medium text-black focus:border-[#8c734b] focus:outline-none cursor-pointer"
                  >
                    <option value={5}>5 Stars ⭐⭐⭐⭐⭐</option>
                    <option value={4}>4 Stars ⭐⭐⭐⭐</option>
                    <option value={3}>3 Stars ⭐⭐⭐</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8c734b] mb-1">
                  Review Quote / Thoughts *
                </label>
                <textarea
                  rows={3}
                  required
                  value={testiQuote}
                  onChange={(e) => setTestiQuote(e.target.value)}
                  placeholder="e.g. Investing in Connaught Place Hisar gave me guaranteed 9-year returns..."
                  className="w-full rounded-2xl border border-black/15 bg-[#f9f8f4] p-3 text-xs font-medium text-black focus:border-[#8c734b] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8c734b] mb-1.5">
                  Upload Client Video Review File OR Paste Video URL (MP4 / YouTube)
                </label>
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoFileUpload}
                    className="w-full rounded-2xl border border-black/15 bg-[#f9f8f4] p-2 text-xs font-medium text-black file:mr-4 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#121510] file:text-white hover:file:bg-[#252922] cursor-pointer"
                  />
                  <span className="text-[10px] text-black/50 text-center font-bold">OR</span>
                  <input
                    type="text"
                    value={testiVideoUrl}
                    onChange={(e) => setTestiVideoUrl(e.target.value)}
                    placeholder="Paste video web link (e.g. /video.mp4 or YouTube embed)"
                    className="w-full rounded-2xl border border-black/15 bg-[#f9f8f4] p-3 text-xs font-medium text-black focus:border-[#8c734b] focus:outline-none"
                  />
                </div>
                {testiVideoUrl && (
                  <p className="mt-1 text-[10px] font-bold text-emerald-600">✓ Video Attached!</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8c734b] mb-1.5">
                  Upload Avatar Photo File OR Paste Image URL
                </label>
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarFileUpload}
                    className="w-full rounded-2xl border border-black/15 bg-[#f9f8f4] p-2 text-xs font-medium text-black file:mr-4 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#121510] file:text-white hover:file:bg-[#252922] cursor-pointer"
                  />
                  <span className="text-[10px] text-black/50 text-center font-bold">OR</span>
                  <input
                    type="text"
                    value={testiAvatar}
                    onChange={(e) => setTestiAvatar(e.target.value)}
                    placeholder="Paste avatar image web link"
                    className="w-full rounded-2xl border border-black/15 bg-[#f9f8f4] p-3 text-xs font-medium text-black focus:border-[#8c734b] focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setNewTestiModalOpen(false);
                    setEditingTestiId(null);
                  }}
                  className="rounded-xl border border-black/10 bg-[#f0ede4] px-5 py-2.5 text-xs font-bold text-black/80 hover:bg-[#e4e0d4]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingTesti}
                  className="rounded-xl bg-[#121510] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#252922] disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {savingTesti ? (
                    <>
                      <Loader2 className="animate-spin" size={16} /> Saving to Database...
                    </>
                  ) : editingTestiId ? (
                    "Update Testimonial"
                  ) : (
                    "Publish Testimonial"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Gallery Image Modal */}
      {newImageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-3xl border border-[#c5a880]/40 bg-white p-7 text-[#151712] shadow-2xl relative">
            <button
              onClick={() => {
                setNewImageModalOpen(false);
                setEditingImageId(null);
              }}
              className="absolute right-5 top-5 text-black/40 hover:text-black"
            >
              <X size={20} />
            </button>
            <h3 className="font-cinzel text-2xl font-bold text-[#151712] mb-1">
              {editingImageId ? "Edit Gallery Photo" : "Add New Photo to About Gallery"}
            </h3>
            <p className="text-xs text-[#8c734b] font-bold mb-5">
              Photo will appear live on the website About page gallery section.
            </p>

            <form onSubmit={handleSaveGalleryImage} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8c734b] mb-1.5">
                  Photo Title *
                </label>
                <input
                  type="text"
                  required
                  value={imageTitle}
                  onChange={(e) => setImageTitle(e.target.value)}
                  placeholder="e.g. Central Illuminated Evening Plaza"
                  className="w-full rounded-2xl border border-black/15 bg-[#f9f8f4] p-3 text-xs font-medium text-black focus:border-[#8c734b] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8c734b] mb-1.5">
                  Category Tag
                </label>
                <select
                  value={imageCategory}
                  onChange={(e) => setImageCategory(e.target.value)}
                  className="w-full rounded-2xl border border-black/15 bg-[#f9f8f4] p-3 text-xs font-medium text-black focus:border-[#8c734b] focus:outline-none cursor-pointer"
                >
                  <option value="Night Plaza & Dining">Night Plaza & Dining</option>
                  <option value="Courtyard Walkways">Courtyard Walkways</option>
                  <option value="Retail Atrium & Showrooms">Retail Atrium & Showrooms</option>
                  <option value="Aerial & Master Plan">Aerial & Master Plan</option>
                  <option value="General Commercial">General Commercial</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8c734b] mb-1.5">
                  Upload Photo File OR Paste Image URL *
                </label>
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="w-full rounded-2xl border border-black/15 bg-[#f9f8f4] p-2.5 text-xs font-medium text-black file:mr-4 file:py-1.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#121510] file:text-white hover:file:bg-[#252922] cursor-pointer"
                  />
                  <span className="text-[10px] text-black/50 text-center font-bold">OR</span>
                  <input
                    type="url"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    placeholder="Paste image web link (https://...)"
                    className="w-full rounded-2xl border border-black/15 bg-[#f9f8f4] p-3 text-xs font-medium text-black focus:border-[#8c734b] focus:outline-none"
                  />
                </div>

                {imageUrlInput && (
                  <div className="mt-3 rounded-2xl border border-black/10 overflow-hidden h-36 bg-black relative">
                    <img src={imageUrlInput} alt="Preview" className="h-full w-full object-cover" />
                    <span className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-0.5 rounded text-[10px]">
                      Image Preview
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8c734b] mb-1.5">
                  Caption / Description
                </label>
                <textarea
                  rows={3}
                  value={imageDescription}
                  onChange={(e) => setImageDescription(e.target.value)}
                  placeholder="e.g. Open-air plaza designed for maximum evening footfall & premium brand dining."
                  className="w-full rounded-2xl border border-black/15 bg-[#f9f8f4] p-3 text-xs font-medium text-black focus:border-[#8c734b] focus:outline-none"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setNewImageModalOpen(false);
                    setEditingImageId(null);
                  }}
                  className="rounded-xl border border-black/10 bg-[#f0ede4] px-5 py-2.5 text-xs font-bold text-black/80 hover:bg-[#e4e0d4]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingImage}
                  className="rounded-xl bg-[#121510] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#252922] disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {uploadingImage ? (
                    <>
                      <Loader2 className="animate-spin" size={16} /> Saving to Database...
                    </>
                  ) : editingImageId ? (
                    "Update Photo"
                  ) : (
                    "Publish Image to Gallery"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
