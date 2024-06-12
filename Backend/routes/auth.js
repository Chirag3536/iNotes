const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "codewithchirag";

// ROUTE 1:  Create a user using : Post "/api/auth/createuser". No login rquired
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid mail").isEmail(),
    body("password", "Enter password of atleasst 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // to send it with the response if error occurd or else true
    let success = false;
    // If there are errors then return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try {
      // checking for this email address if already exists or not
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success, error: "User already exists" });
      }

      // To generate a salt and add it inot the password and then generate its hash value
      const salt = await bcrypt.genSalt(10); // it return promise
      const secPass = await bcrypt.hash(req.body.password, salt); // it return promise

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(success, "Some error occurred: " + error.message);
    }
  }
);

// ROUTE 2: Authenticate a user using : Post "/api/auth/login". No login rquired
router.post(
  "/login",
  [
    body("email", "Enter a valid mail").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors then return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({success, error: "Entered wrong details" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(404).json({success, error: "Entered wrong details" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(success, "Some error occurred: " + error.message);
    }
  }
);

// ROUTE 3: Get logged in userdetails using Post: "/api/auth/getuser" Login required
router.post("/getuser", fetchuser,  async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred: " + error.message);
  }
});

module.exports = router;
