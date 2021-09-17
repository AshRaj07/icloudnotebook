const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const JWt_SECRET = "@$HR@j0k";

const fetchuser = require("../middleware/fetchuser")

//Create user using post request
router.post(
  "/createuser",
  [
    body("name", "Please Enter a valid length of name").isLength({ min: 3 }),
    body("email", "Please enter valid email").isEmail(),
    body("password", "Please enter password of atleast 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    let success = true ;
    //Respond on Bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false ;
      return res.status(400).json({ success,errors: errors.array() });
    }
    try {
      //Lets check whether user exist or not
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false ;
        return res.status(500).json({success, error: "Sorry user already exist" });
      }

      const saltRounds = await bcrypt.genSalt(10);
      const secretPassword = await bcrypt.hash(req.body.password, saltRounds);

      user = await User.create({
        name: req.body.name,
        password: secretPassword,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      success = true ;
      var token = jwt.sign(data, JWt_SECRET);
      //  res.json(user)
      res.json({ success, token });
    } catch (error) {
      success = false ;
      console.error(error.message);
      res.status(500).send({success,error:"Internal Server Error"});
    }
  }
);

//Login Part
router.post(
  "/login",
  [
    body("email", "Please enter valid email").isEmail(),
    body("password", "Passsword cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = true;
    //Respond on Bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false ;
      return res.status(400).json({ errors: errors.array() });
    }

    try{
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
          success = false;
          return res.status(500).json({ error: "Sorry=Invalid Credentials" });
        }

        const passwordCheck =await bcrypt.compare(req.body.password,user.password);

        if(!passwordCheck){
          success = false;
            return res.status(500).json({ error: "Username and Password does not match" });
        }
    //data or payload stores the data to form authenticate token
        const data = {
            user: {
              id: user.id,
            },
          };
          var token = jwt.sign(data, JWt_SECRET);
          //  res.json(user)
          res.json({ success,token });


     }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
  }
);

//Get Logged In User details
router.post(
    "/getuser",
    fetchuser
    ,
    async (req, res) => {

        try {
            let userId = req.user.id;
            const user = await User.findById(userId).select("-password")   
            res.send(user)         
        } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
        }
    })

module.exports = router;
