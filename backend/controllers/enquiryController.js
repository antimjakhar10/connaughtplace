import Enquiry from "../models/Enquiry.js";

// @desc    Submit new enquiry / lead
// @route   POST /api/enquiries
// @access  Public
export const createEnquiry = async (req, res) => {
  try {
    const { name, phone, email, spaceType, spaceSize, message, source } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Please provide both name and phone number.",
      });
    }

    const newEnquiry = await Enquiry.create({
      name,
      phone,
      email,
      spaceType,
      spaceSize,
      message,
      source,
    });

    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully!",
      data: newEnquiry,
    });
  } catch (error) {
    console.error("Error creating enquiry:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error: Unable to submit enquiry.",
      error: error.message,
    });
  }
};

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private/Admin
export const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error: Unable to fetch enquiries.",
      error: error.message,
    });
  }
};

// @desc    Update enquiry status or notes
// @route   PATCH /api/enquiries/:id
// @access  Private/Admin
export const updateEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const enquiry = await Enquiry.findById(id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
    }

    if (status) enquiry.status = status;
    if (notes !== undefined) enquiry.notes = notes;

    const updatedEnquiry = await enquiry.save();

    return res.status(200).json({
      success: true,
      message: "Enquiry updated successfully.",
      data: updatedEnquiry,
    });
  } catch (error) {
    console.error("Error updating enquiry:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error: Unable to update enquiry.",
      error: error.message,
    });
  }
};

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private/Admin
export const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const enquiry = await Enquiry.findById(id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
    }

    await enquiry.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting enquiry:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error: Unable to delete enquiry.",
      error: error.message,
    });
  }
};
