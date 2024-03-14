const express = require("express");

//to handle connection between API endpoints even between different hosts
const cors = require("cors");
const {
  test,
  registerUser,
  loginUser,
  getProfile
} = require("../controllers/authController");
const { addProduct } = require("../controllers/productsController");

// import express from "express";
// import cors from "cors";
// import { test, registerUser } from "../controllers/authController";

const router = express.Router();

//middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.get("/", test);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/add-products", addProduct)
router.get('/profile', getProfile)

module.exports = router;
