const jwt = require("jsonwebtoken");


const protect = (req, res, next) => {
  try {
 
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No authentication token found.",
      });
    }

   
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_workspace_secret_string");

    
    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Session expired or token signature invalid. Unauthorized access.",
    });
  }
};


const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // Ensure the protect middleware has already run and populated req.user
    if (!req.user || !req.user.role) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: User authorization metadata profile missing.",
      });
    }

    // Check if the user's role exists within the permitted parameter scopes 
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Role '${req.user.role}' is unauthorized to perform this operation.`,
      });
    }

    next();
  };
};

module.exports = {
  protect,
  authorize,
};