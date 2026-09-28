import { useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EnquiryModal from "./components/EnquiryModal";
import ImageLightbox from "./components/ImageLightbox";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Leasing from "./pages/Leasing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

const LayoutWrapper = ({
  children,
  onOpenEnquiry,
  isEnquiryOpen,
  setIsEnquiryOpen,
  enquiryType,
  lightboxData,
  setLightboxData,
}) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#151712] selection:bg-[#c5a880] selection:text-black">
      <Navbar onOpenEnquiry={onOpenEnquiry} />
      {children}
      <Footer onOpenEnquiry={onOpenEnquiry} />

      {/* Global Modals */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        initialType={enquiryType}
      />

      <ImageLightbox
        isOpen={lightboxData.isOpen}
        onClose={() => setLightboxData({ ...lightboxData, isOpen: false })}
        imageSrc={lightboxData.src}
        title={lightboxData.title}
        description={lightboxData.desc}
      />
    </div>
  );
};

const App = () => {
  // Global Enquiry Modal State
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryType, setEnquiryType] = useState("Retail Shop");

  // Global Lightbox Modal State
  const [lightboxData, setLightboxData] = useState({
    isOpen: false,
    src: "",
    title: "",
    desc: "",
  });

  const handleOpenEnquiry = (type = "Retail Shop") => {
    setEnquiryType(type);
    setIsEnquiryOpen(true);
  };

  const handleOpenLightbox = (src, title = "", desc = "") => {
    setLightboxData({ isOpen: true, src, title, desc });
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <LayoutWrapper
        onOpenEnquiry={handleOpenEnquiry}
        isEnquiryOpen={isEnquiryOpen}
        setIsEnquiryOpen={setIsEnquiryOpen}
        enquiryType={enquiryType}
        lightboxData={lightboxData}
        setLightboxData={setLightboxData}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onOpenEnquiry={handleOpenEnquiry}
                onOpenLightbox={handleOpenLightbox}
              />
            }
          />
          <Route
            path="/leasing"
            element={<Leasing onOpenEnquiry={handleOpenEnquiry} />}
          />
          <Route
            path="/about"
            element={
              <About
                onOpenEnquiry={handleOpenEnquiry}
                onOpenLightbox={handleOpenLightbox}
              />
            }
          />
          <Route
            path="/contact"
            element={<Contact onOpenLightbox={handleOpenLightbox} />}
          />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  );
};

export default App;
