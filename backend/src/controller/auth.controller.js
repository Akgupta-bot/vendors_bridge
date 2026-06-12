const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const register = async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      password, 
      phone, 
      country, 
      role, 
      additionalInfo,
      avatar 
    } = req.body;

   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "This email workspace is already registered inside the ERP system.",
      });
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      country,
      role: role ? role.toUpperCase() : "VENDOR",  
      additionalInfo,
      avatar
    });

 
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: "User Node Registered Successfully",
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

   
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter both email and password parameters.",
      });
    }

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

  
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role, 
      },
      process.env.JWT_SECRET || "fallback_workspace_secret_string",
      {
        expiresIn: "7d",
      }
    );


    const userResponse = user.toObject();
    delete userResponse.password;

    
    res.json({
      success: true,
      token,
      user: {
        id: userResponse._id,
        name: `${userResponse.firstName} ${userResponse.lastName}`, 
        email: userResponse.email,
        role: userResponse.role, 
        avatar: userResponse.avatar
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};