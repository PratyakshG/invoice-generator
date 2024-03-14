const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require('jsonwebtoken')

const test = (req, res) => {
  res.json("test is working");
};

//Register Endpoint
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //check for name
    if (!name) {
      return res.json({
        error: "name is required",
      });
    }

    //check for password
    if (!password || password.length < 6) {
      return res.json({
        error: "password is required and should be at least 6 characters",
      });
    }

    //check for email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        error: "Email already registered",
      });
    }

    const hashedPassword = await hashPassword(password);

    //create user in database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

//Login Endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //find the user
    const user = await User.findOne({ email });

    //check for email
    if (!user) {
      return res.json({
        error: "Email is not registered",
      });
    }

    if(!password){
      return res.json({
        error: "Password cannot be empty"
      })
    }

    const matchPassword = await comparePassword(password, user.password);
    if (matchPassword) {
      jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
        if(err) throw err;
        res.cookie('token', token).json(user);
      })
    }
    if (!matchPassword) {
      res.json({
        error: "Password incorrect",
      });
    }
  } catch (error) {
    res.json("Error");
  }
};

const getProfile= (req, res) => {
  const {token} = req.cookies;
  if(token) {
    jwt.verify(token, process.env.JWT_SECRET, {},(err, user) => {
      if(err) throw err;
      res.json(user)
    })
  } else{
    res.json(null)
  }
}

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile
};
