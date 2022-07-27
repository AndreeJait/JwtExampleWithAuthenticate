import jwt from "jsonwebtoken";
export default async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.logged = decoded.data;
    next();
  } catch (error) {
    return res.status(401).json({
      error: {
        message: "auth failed",
        error: error,
      },
    });
  }
};
