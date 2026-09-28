import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "default_jwt_secret", {
    expiresIn: "30d",
  });
};

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password.",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && (await user.matchPassword(password))) {
      return res.json({
        success: true,
        message: "Login successful!",
        token: generateToken(user._id),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login.",
      error: error.message,
    });
  }
};

// @desc    Get logged in user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching user profile.",
    });
  }
};

// Auto Seed Admin User on Server Startup
export const seedInitialAdmin = async () => {
  try {
    const adminCount = await User.countDocuments({ role: "admin" });
    if (adminCount === 0) {
      const defaultEmail = process.env.ADMIN_EMAIL || "admin@connaughtplace.com";
      const defaultPassword = process.env.ADMIN_PASSWORD || "admin123";

      await User.create({
        name: "Connaught Place Admin",
        email: defaultEmail.toLowerCase(),
        password: defaultPassword,
        role: "admin",
      });

      console.log(`[Admin Seed] Default Admin Created -> Email: ${defaultEmail}, Password: ${defaultPassword}`);
    } else {
      console.log(`[Admin Check] Admin user already exists in database.`);
    }
  } catch (error) {
    console.error("[Admin Seed Error]:", error.message);
  }
};
