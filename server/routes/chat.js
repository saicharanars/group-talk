const express = require('express');

const chatController = require('../controllers/chat');

const auth=require('../middleware/auth')



const router = express.Router();


router.get("/get-chat",chatController.getChat);
router.post("/message",auth.authenticate, chatController.postChat);





module.exports = router;