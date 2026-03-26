// authAdmin.js
import jwt from "jsonwebtoken";

//admin authentication middleware
const authAdmin = (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No token provided" });
    }
    const decoded = jwt.verify(atoken, process.env.JWT_SECRET_KEY);
    
    // Only check email in the token (password should NOT be in JWT)
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid token" });
    }
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "Session expired. Please login again." });
    }
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export default authAdmin;