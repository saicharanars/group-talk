const Group = require("../models/groups");
const { Op } = require("sequelize");

exports.postGroup = async (req, res, next) => {
  try {
    //const { name, email, phone } = req.body;

    const userId = req.user.userid;
    const groupName = req.body.groupname;
    console.log(userId);
    const data = await Group.create({
      groupname: groupName,
      groupuserId: userId,
      owner: userId,
    });
    console.log(data);
    res.status(200).json({ message: "success", data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};
