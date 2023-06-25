const path = require("path");
const fs=require("fs");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var cors = require("cors");
app.use(cors({
    origin:"http://localhost:4000/",
    methods:["GET","POST","PUT","DELETE"],
}));
app.use(bodyParser.json({ extended: false }));
const { sequelize } = require('./models/user');
const Users = require("./models/user");
const userRoutes=require("./routes/user");
console.log("gdyd")

app.use(userRoutes);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static('public'));








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