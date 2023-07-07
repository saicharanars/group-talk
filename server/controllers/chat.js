const path = require("path");
const rootDir = path.dirname(__dirname);
const Chat =require("../models/chat")
const { Op } = require('sequelize');


exports.getChat = async (req, res, next) => {
    res.sendFile(path.join(rootDir, "views", "chat.html"));
  };
exports.postChat=async(req,res,next)=>{
    try {
        //const { name, email, phone } = req.body;
       
        console.log(req.user);
        console.log(req.body);
        message=req.body.message;
        groupid=req.body.groupid
    
        const userId = req.user.id;
        console.log(userId);
        const data = await Chat.create({
          message:message ,
          groupuserId:userId,
          groupId:groupid,
          
        });
        console.log(data)
        res.status(200).json({ message: "success", data:data,username:req.user.username });
      } catch (error) {
        
        console.log(error);
        res.status(500).json({
          error: error,
        });
      }
}
exports.getMessages=async(req,res,next)=>{
    try {
        
        const lastmessageid = req.query.after;
        //console.log(lastReceivedTimestamp)
        const resp=await Chat.findAll(
            {
            where : { id: { [Op.gt]: lastmessageid }},
            attributes: ['id', 'message'],
         },
        );
        console.log(resp)
        res.status(200).json({ message: "success", data:resp });

    } catch (error) {
        console.log(error);
        res.status(500).json({
          error: error,
        });
    }
}