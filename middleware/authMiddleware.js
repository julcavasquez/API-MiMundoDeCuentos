const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "03071593";

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Token requerido" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
    req.user = decoded; // { id, nom_usu }
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};

module.exports = authMiddleware;
