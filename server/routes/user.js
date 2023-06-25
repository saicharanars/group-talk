const express = require('express');

const userController = require('../controllers/user');





const router = express.Router();

router.post("/signup",userController.postSignup);
router.get("/get-signup",userController.getSignup);
router.post("/login",userController.postLogin);
router.get("/get-login",userController.getLogin);





module.exports = router;