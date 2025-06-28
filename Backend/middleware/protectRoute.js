const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "Secret Key";

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader)
    return res.status(401).json({ message: "No token, auth denied" });

  const token = authHeader.startsWith("Bearer")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token not valid" });
  }
};
