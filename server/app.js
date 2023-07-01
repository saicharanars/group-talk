const path = require("path");
const fs=require("fs");
const helmet = require("helmet");
const morgan = require("morgan");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var cors = require("cors");

//app.use(bodyParser.json({ extended: false }));

const { sequelize } = require('./models/user');
const User = require("./models/user");
const Chat = require("./models/chat");
const Group = require("./models/groups");
const GroupMember = require("./models/groupmember");
const userRoutes=require("./routes/user");
const chatRoutes=require("./routes/chat");
const groupRoutes=require("./routes/group");
app.use(express.json());
app.use(cors({
    origin:"http://localhost:4000/",
    methods:["GET","POST","PUT","DELETE"],
}));
app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
console.log("gdyd")
console.log(path.join(__dirname, "public"))
const logStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
    flags: "a",
  });
app.use(morgan("combined", { stream: logStream }));
app.use(express.static(path.join(__dirname, "public")));  
app.use(userRoutes);
app.use(chatRoutes);
app.use(groupRoutes)
app.use((req, res) => {
    console.log("url", req.url);
    res.sendFile(path.join(__dirname, `public${req.url}`));
  });

User.hasMany(Chat);
Chat.belongsTo(User);
User.belongsToMany(Group,{ through: GroupMember });
Group.belongsToMany(User,{ through: GroupMember });
Chat.belongsTo(Group);
Group.hasMany(Chat);










const errorController = require("./controllers/errorcontroller");



app.use(errorController.get404);

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen();
  })
  .catch((err) => {
    //console.log(err);
  });

app.listen(4000);