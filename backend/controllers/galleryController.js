import Gallery from "../models/Gallery.js";

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
export const getGalleryImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: images.length,
      data: images,
    });
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error: Unable to fetch gallery images.",
      error: error.message,
    });
  }
};

// @desc    Add a new gallery image
// @route   POST /api/gallery
// @access  Private/Admin
export const addGalleryImage = async (req, res) => {
  try {
    const { title, category, imageUrl, description } = req.body;

    if (!title || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Please provide both image title and image URL/file.",
      });
    }

    const newImage = await Gallery.create({
      title,
      category: category || "Architectural & Courtyard",
      imageUrl,
      description: description || "",
    });

    return res.status(201).json({
      success: true,
      message: "Gallery image added successfully!",
      data: newImage,
    });
  } catch (error) {
    console.error("Error adding gallery image:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error: Unable to add gallery image.",
      error: error.message,
    });
  }
};

// @desc    Update a gallery image
// @route   PUT /api/gallery/:id
// @access  Private/Admin
export const updateGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, imageUrl, description } = req.body;

    let image = await Gallery.findById(id);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found.",
      });
    }

    image.title = title || image.title;
    image.category = category || image.category;
    image.imageUrl = imageUrl || image.imageUrl;
    image.description = description !== undefined ? description : image.description;

    const updatedImage = await image.save();

    return res.status(200).json({
      success: true,
      message: "Gallery image updated successfully!",
      data: updatedImage,
    });
  } catch (error) {
    console.error("Error updating gallery image:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error: Unable to update gallery image.",
      error: error.message,
    });
  }
};

// @desc    Delete a gallery image
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
export const deleteGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Gallery.findById(id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found.",
      });
    }

    await image.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Gallery image deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error: Unable to delete gallery image.",
      error: error.message,
    });
  }
};

// @desc    Seed Initial Gallery Images if empty
export const seedInitialGallery = async () => {
  try {
    const count = await Gallery.countDocuments();
    if (count === 0) {
      const defaultImages = [
        {
          title: "Central Illuminated Courtyard",
          category: "Night Plaza & Dining",
          description: "Central illuminated courtyard plaza designed for evening dining, high footfall, and cultural gatherings.",
          imageUrl: "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=1200&auto=format&fit=crop&q=80",
        },
        {
          title: "Pedestrian Walkways & Open Plaza",
          category: "Courtyard Walkways",
          description: "Pedestrian-friendly central courtyard corridors connecting retail shops and cafes.",
          imageUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&auto=format&fit=crop&q=80",
        },
        {
          title: "Double-Height Atrium Frontages",
          category: "Retail Atrium",
          description: "Spacious double-height atrium frontage with escalators and luxury brand display windows.",
          imageUrl: "https://images.unsplash.com/photo-1567449303078-57ad995bd301?w=1200&auto=format&fit=crop&q=80",
        },
        {
          title: "9-Acres Master Precinct Plan",
          category: "Aerial View",
          description: "Aerial master layout view of the 9-acre commercial project precinct in Sector 25 Hisar.",
          imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
        },
        {
          title: "Main Highway Façade Elevation",
          category: "Main Elevation",
          description: "Frontage architectural elevation facing Delhi-Sirsa NH-9 highway corridor.",
          imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=1200&auto=format&fit=crop&q=80",
        },
      ];

      await Gallery.insertMany(defaultImages);
      console.log("[Gallery Seed] Initial gallery images seeded successfully into database.");
    }
  } catch (error) {
    console.error("[Gallery Seed Error]:", error);
  }
};

