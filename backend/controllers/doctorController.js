import DoctorModel from "../models/doctorModel.js";
const changeAvailablity = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const doctor = await DoctorModel.findById(doctorId);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    doctor.available = !doctor.available;
    await doctor.save();
    res.json({
      success: true,
      message: "Doctor availability updated successfully",
      available: doctor.available,
    });
  } catch (error) {
    console.error("Error changing doctor availability:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error changing doctor availability",
        error: error.message,
      });
  }
};
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await DoctorModel.find({}).select(["-password", "-email"]); // Exclude password field
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
export { changeAvailablity, getAllDoctors };
