const express = require('express');

const chatController = require('../controllers/chat');

const auth=require('../middleware/auth')

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();


router.get("/get-chat",chatController.getChat);
router.post("/message",auth.authenticate,upload.single('image'), chatController.postChat);
router.get("/get-messages",chatController.getMessages);
//router.post("/upload",auth.authenticate,upload.single('image'), chatController.upload);





module.exports = router;