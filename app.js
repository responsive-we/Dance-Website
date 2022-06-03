const express = require("express");
const path = require("path");
const body= require("body-parser")
const app = express();
const port = 80;

//Using Mongoose
const mongoose = require("mongoose");
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://localhost:27017/DanceData");
}
//Definig Schema
let Contact = new mongoose.Schema({
    name: String,
    Email: String,
    Age: Number,
    phoneNumber: Number,
    address: String
  })
const Data = mongoose.model('userData', Contact);

//Express Related stuff
app.use("/static", express.static("static")); // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set("view engine", "pug"); // Set the template engine as pug
app.set("views", path.join(__dirname, "views")); // Set the views directory

// ENDPOINTS
app.get("/", (req, res) => {
  res.status(200).render("Home.pug");
});
app.get("/contact", (req, res) => {
  res.status(200).render("Contact.pug");
});
app.post("/contact", (req, res) => {
  let info= new Data(req.body);
  info.save().then( ()=>{
    console.log("The Data Has Been Saved In the Database :)")
  }).catch(()=>{
    res.status(400);
    console.log("The Data Has not been stored in the database due to some erro ): ")
  })
});

// START THE SERVER
app.listen(port, () => {
  console.log(
    `The application started successfully on : http://localhost:${port}`
  );
});
