const express = require("express");
const db = require("./models");
const studentRouter = require("./routes/student");

const app = express(); //Create instance of express

const PORT = 7000;

//Middleware
app.use(express.json());

//Routes
app.use("/student", studentRouter);

//Start Server

db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`The server is started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error ⛔ ");
  });
