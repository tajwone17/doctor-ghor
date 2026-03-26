// authAdmin.js
import jwt from "jsonwebtoken";

//User authentication middleware
const authUser = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userId = decoded.id;

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

export default authUser;
