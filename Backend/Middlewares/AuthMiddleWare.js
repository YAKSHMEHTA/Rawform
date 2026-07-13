import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const AuthMiddleware = async(req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("token",token)
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token missing",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.access_token_secret
    );

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Access token expired or invalid",
    });
  }
};

export default AuthMiddleware;