import Testimonial from "../models/Testimonial.js";

// Initial seed data with video reviews
const defaultTestimonials = [
  {
    name: "Rajesh Singla",
    role: "Retail Shop Investor",
    rating: 5,
    quote: "Investing in Connaught Place Hisar's double-height retail shop was one of my best decisions. The 9-year guaranteed brand lease gives me complete peace of mind.",
    videoUrl: "/video.mp4",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Pooja Malhotra",
    role: "Fashion Brand Owner",
    rating: 5,
    quote: "The 9-acre open-courtyard concept and proximity to Hisar International Airport make Sector 25 the highest footfall hub in Hisar.",
    videoUrl: "/video.mp4",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Vikramaditya Rao",
    role: "NRI Commercial Investor",
    rating: 5,
    quote: "As an NRI investing from Dubai, the official sales team made the documentation transparent and smooth. The location along Delhi-Sirsa NH-9 ensures capital appreciation.",
    videoUrl: "/video.mp4",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Amit Sharma",
    role: "Food Court Partner",
    rating: 5,
    quote: "Central night courtyard plaza design generates fantastic evening crowd for food court outlets. We booked two spaces early and construction progress is impressive.",
    videoUrl: "/video.mp4",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
  },
];

export const seedInitialTestimonials = async () => {
  try {
    const count = await Testimonial.countDocuments();
    if (count === 0) {
      await Testimonial.insertMany(defaultTestimonials);
      console.log("[Testimonials Seed] Inserted 4 initial video testimonials into MongoDB.");
    }
  } catch (err) {
    console.error("[Testimonials Seed Error]:", err.message);
  }
};

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error: Unable to fetch testimonials.",
      error: error.message,
    });
  }
};

// @desc    Create new testimonial
// @route   POST /api/testimonials
// @access  Private/Admin
export const createTestimonial = async (req, res) => {
  try {
    const { name, role, rating, quote, videoUrl, avatar } = req.body;

    if (!name || !quote) {
      return res.status(400).json({
        success: false,
        message: "Please provide client name and review quote.",
      });
    }

    const newTestimonial = await Testimonial.create({
      name,
      role: role || "Commercial Investor",
      rating: Number(rating) || 5,
      quote,
      videoUrl: videoUrl || "",
      avatar: avatar || "",
    });

    return res.status(201).json({
      success: true,
      message: "Testimonial created successfully!",
      data: newTestimonial,
    });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error: Unable to create testimonial.",
      error: error.message,
    });
  }
};

// @desc    Update testimonial
// @route   PUT /api/testimonials/:id
// @access  Private/Admin
export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, rating, quote, videoUrl, avatar } = req.body;

    const item = await Testimonial.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found.",
      });
    }

    if (name) item.name = name;
    if (role) item.role = role;
    if (rating) item.rating = Number(rating);
    if (quote) item.quote = quote;
    if (videoUrl !== undefined) item.videoUrl = videoUrl;
    if (avatar !== undefined) item.avatar = avatar;

    const updatedItem = await item.save();

    return res.status(200).json({
      success: true,
      message: "Testimonial updated successfully!",
      data: updatedItem,
    });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error: Unable to update testimonial.",
      error: error.message,
    });
  }
};

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Testimonial.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found.",
      });
    }

    await item.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error: Unable to delete testimonial.",
      error: error.message,
    });
  }
};
