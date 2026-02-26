import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import JWT from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

//API to register a user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    //token generation
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res
      .status(201)
      .json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(error);
  }
};

//API for user login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  res
    .status(200)
    .json({ success: true, message: "User logged in successfully", token });
};
//api to get user details

const getUserDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await User.findById(userId).select("-password");

    // console.log("userId:", userId);
    // console.log("userData:", userData);

    res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      userData,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(error);
  }
};
const updateUserDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file; // Access the uploaded file

    if (!name || !phone || !address || !dob || !gender) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    await User.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address), // Convert the address string back to an object
      dob,
      gender,
    });

    if (imageFile) {
      //upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: image,
      });
      const imageUrl = imageUpload.secure_url;
      await User.findByIdAndUpdate(userId, { image: imageUrl });
    }
    res.json({ success: true, message: "User details updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(error);
  }
};

export { registerUser, loginUser, getUserDetails, updateUserDetails };
