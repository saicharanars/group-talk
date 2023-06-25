const path = require("path");
const rootDir = path.dirname(__dirname);
const Users = require("../models/user");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

exports.postSignup = async (req, res, next) => {
    try {
      //const { name, email, phone } = req.body;
      const Username = req.body.username;
      const Email = req.body.email;
      const Password = req.body.password;
      const Phonenumber=req.body.phonenumber
      console.log(Username, Email, Password);
      console.log(req.body);
      const hashedPassword = await bcrypt.hash(Password, 10);
      const [user, created] = await Users.findOrCreate({
        where: { email: Email },
        defaults: {
          username: Username,
          password: hashedPassword,
          phonenumber:Phonenumber,
        },
      });
      if (!created) {
        res
          .status(200)
          .json({ users: "email already used", emailexist: created }); // This will certainly be 'Technical Lead JavaScript'
      } else {
        res.status(200).json({ users: user, emailexist: created });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    }
  };
  
  exports.getSignup = async (req, res, next) => {
    console.log(rootDir)
    res.sendFile(path.join(rootDir, "views", "signup.html"));
  };