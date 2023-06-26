const path = require("path");
const rootDir = path.dirname(__dirname);
const Chat =require("../models/chat")

exports.getChat = async (req, res, next) => {
    res.sendFile(path.join(rootDir, "views", "chat.html"));
  };
exports.postChat=async(req,res,next)=>{
    try {
        //const { name, email, phone } = req.body;
       
        const message = req.body.message;
        
    
        const userId = req.user.userid;
        console.log(userId);
        const data = await Chat.create({
          message:message ,
          
        });
        console.log(data)
        res.status(200).json({ message: "success", data:data });
      } catch (error) {
        
        console.log(error);
        res.status(500).json({
          error: error,
        });
      }
}
exports.getMessages=async(req,res,next)=>{
    try {
        const resp=await Chat.findAll();
        res.status(200).json({ message: "success", data:resp });

    } catch (error) {
        console.log(error);
        res.status(500).json({
          error: error,
        });
    }
}