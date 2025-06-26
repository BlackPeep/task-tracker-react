const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "Secret Key";

module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "No token, auth denied" });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token not valid" });
  }
};
