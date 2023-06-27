const express = require('express');

const groupController = require('../controllers/group');

const auth=require('../middleware/auth')



const router = express.Router();
router.post("/add-group",auth.authenticate,groupController.postGroup);





module.exports = router;