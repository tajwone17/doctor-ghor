// adminController.js
import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import DoctorModel from "../models/doctorModel.js";
import JWT from "jsonwebtoken";
import Appointment from "../models/appointmentModel.js";
//api for adding doctors
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    ///checking for all data to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: "All fields are required" });
    }

    //validating email
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please Enter a Valid Email",
      });
    }

    //validating strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    //hashing doctor password before saving to database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //upload image to cloudinary and get the url
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    //creating doctor object to save to database
    const doctorData = {
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };
    const newDoctor = new DoctorModel(doctorData);
    await newDoctor.save();
    res
      .status(201)
      .json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    console.error("Error adding doctor:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error adding doctor",
        error: error.message,
      });
  }
};

//api for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    // Only sign email in the token (NOT the password)
    const token = JWT.sign({ email }, process.env.JWT_SECRET_KEY);
    res.json({ success: true, message: "Admin login successful", token });
  } catch (error) {
    console.error("Error during admin login:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error during admin login",
        error: error.message,
      });
  }
};
//api for getting doctors list for admin panel
const allDoctors = async (req, res) => {
  try {
    const doctors = await DoctorModel.find({}).select("-password"); // Exclude password field
    res.json({ success: true, doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching doctors",
        error: error.message,
      });
  }
};
//API to get all Appointment list
const appointmentsAdmin = async (req, res) => {
  try {
    const appointment = await Appointment.find({});
    res.json({ success: true, appointment });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching appointments",
        error: error.message,
      });
  }
};
export { addDoctor, adminLogin, allDoctors, appointmentsAdmin };
