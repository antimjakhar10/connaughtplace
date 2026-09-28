import Faq from "../models/Faq.js";

const defaultFaqs = [
  {
    question: "What is the exact location & accessibility of Connaught Place Hisar?",
    answer: "Connaught Place Hisar is located in Sector 25, Hisar, Haryana. It enjoys direct frontage along the Delhi-Sirsa NH-9 highway corridor and is just 5 minutes away from the upcoming Hisar International Airport & 2,988-acre IMC manufacturing hub.",
    category: "Location & Access",
  },
  {
    question: "What are the commercial property unit options available for sale?",
    answer: "Inventory includes ground & upper floor retail shops, double-height showroom frontages, food court modules, multiplex units, and corporate office spaces ranging from 300 sq.ft. to 5,000+ sq.ft.",
    category: "Inventory & Pricing",
  },
  {
    question: "What does the 9-Year Guaranteed Brand Lease structure entail?",
    answer: "The project offers structured 9-year brand lease agreements with established national & international retail brands. Investors receive regular monthly rental income with pre-agreed lease escalation clauses.",
    category: "Investment & Returns",
  },
  {
    question: "How can I schedule a physical site visit or request floor plans?",
    answer: "You can click on 'Inquire To Buy' on the website or call the official commercial sales hotline (+91 9718064000) to receive detailed floor layouts, price lists, and schedule a guided site walkthrough.",
    category: "Site Visit & Booking",
  },
];

export const seedInitialFaqs = async () => {
  try {
    const count = await Faq.countDocuments();
    if (count === 0) {
      await Faq.insertMany(defaultFaqs);
      console.log("[FAQ Seed] Inserted 4 initial FAQs into MongoDB.");
    }
  } catch (err) {
    console.error("[FAQ Seed Error]:", err.message);
  }
};

// @desc    Get all FAQs
// @route   GET /api/faqs
// @access  Public
export const getFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ createdAt: 1 });
    return res.status(200).json({
      success: true,
      count: faqs.length,
      data: faqs,
    });
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error: Unable to fetch FAQs.",
      error: error.message,
    });
  }
};

// @desc    Create new FAQ
// @route   POST /api/faqs
// @access  Private/Admin
export const createFaq = async (req, res) => {
  try {
    const { question, answer, category } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Please provide both question and answer.",
      });
    }

    const newFaq = await Faq.create({
      question,
      answer,
      category: category || "General",
    });

    return res.status(201).json({
      success: true,
      message: "FAQ added successfully!",
      data: newFaq,
    });
  } catch (error) {
    console.error("Error creating FAQ:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error: Unable to create FAQ.",
      error: error.message,
    });
  }
};

// @desc    Update FAQ
// @route   PUT /api/faqs/:id
// @access  Private/Admin
export const updateFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer, category } = req.body;

    const item = await Faq.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found.",
      });
    }

    if (question) item.question = question;
    if (answer) item.answer = answer;
    if (category) item.category = category;

    const updatedItem = await item.save();

    return res.status(200).json({
      success: true,
      message: "FAQ updated successfully!",
      data: updatedItem,
    });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error: Unable to update FAQ.",
      error: error.message,
    });
  }
};

// @desc    Delete FAQ
// @route   DELETE /api/faqs/:id
// @access  Private/Admin
export const deleteFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Faq.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found.",
      });
    }

    await item.deleteOne();

    return res.status(200).json({
      success: true,
      message: "FAQ deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error: Unable to delete FAQ.",
      error: error.message,
    });
  }
};
