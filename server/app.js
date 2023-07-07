const path = require("path");
const fs = require("fs");
const helmet = require("helmet");
const morgan = require("morgan");

const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: { origin: "*" },
});
http.listen(3000, () => {
  console.log("listening on *:3000");
});


io.on("sockets.connected", (socket) => {
  console.log("socket no with id",socket );
});
io.on("connection",async(socket)=>{
    
    socket.on("join", (groupId) => {
      console.log("User joined room with groupId:", groupId);
      const currentRooms = socket.rooms;

    //   // The first room
      const firstRoom = currentRooms[0];

      // Leave all rooms except the first one
      for (const room of currentRooms) {
        console.log(room)
        if (room !== firstRoom) {
            console.log(room)
          socket.leave(room);
        }
      }
      ///console.log(socket.rooms)
      socket.join(groupId);
      console.log(socket.rooms, "afetr joing");
    });
    socket.on("msg2", (msg) => {
      console.log(msg,"msg2>>>>>>>>");
      
        io.to(msg.group).emit(msg.group,{ data:msg });
        console.log(socket.rooms);
     
      
    });
    
    
    
})

    
// io.on("connection", (socket) => {
//     console.log('a user connected',socket.id);
//     socket.emit('groups', groups);
//     socket.on('join', (group) => {
//         if (groups.includes(group)) {
//           socket.join(group);
//           console.log(`User joined group: ${group}`);
//         }
//       });
//     socket.on('chat', (data) => {
//     const { group, message } = data;
//     console.log(group,message);
//     if (groups.includes(group)) {
//         console.log("done");
//       io.to(group).emit('chat', message);
//     }
//   });

//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//     });
//     // socket.on("group", (groupname, data) => {
// 	// 	socket.broadcast.emit("group", groupname, data);
//     //     console.log(groupname,data);
// 	// });
// 	socket.on("chat-message", (msg,  groupId) => {
// 		io.to(group).emit("chat-message", msg,  groupId);
//         console.log("sockets>>>>>>>>",msg,  groupId)
// 	});

// 	socket.on("file", (msg, userName, groupId) => {
// 		io.emit("file", msg, userName, groupId);
// 	});
// });
const bodyParser = require("body-parser");
var cors = require("cors");

//app.use(bodyParser.json({ extended: false }));

const { sequelize } = require("./models/user");
const User = require("./models/user");
const Chat = require("./models/chat");
const Group = require("./models/groups");
const GroupMember = require("./models/groupmember");
const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");
const groupRoutes = require("./routes/group");
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4000/",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

const logStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});
app.use(morgan("combined", { stream: logStream }));
app.use(express.static(path.join(__dirname, "public")));
app.use(userRoutes);
app.use(chatRoutes);
app.use(groupRoutes);
app.use((req, res) => {
  console.log("url", req.url);
  res.sendFile(path.join(__dirname, `public${req.url}`));
});

User.hasMany(Chat);
Chat.belongsTo(User);
User.belongsToMany(Group, { through: GroupMember });
Group.belongsToMany(User, { through: GroupMember });
Chat.belongsTo(Group);
Group.hasMany(Chat);

const errorController = require("./controllers/errorcontroller");
const { group } = require("console");

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
