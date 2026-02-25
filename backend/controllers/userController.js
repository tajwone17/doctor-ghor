import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import JWT from "jsonwebtoken";

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
    const token = JWT.sign(
      { id:user._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      },
    );
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
  const token = JWT.sign({ id:user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  res
    .status(200)
    .json({ success: true, message: "User logged in successfully", token });
};
//api to get user details

const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await User.findById(userId).select("-password");
    res
      .status(200)
      .json({
        success: true,
        message: "User details fetched successfully",
        userData,
      });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(error);
  }
};

export { registerUser, loginUser, getUserDetails };
