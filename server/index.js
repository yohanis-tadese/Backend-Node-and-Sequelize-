const express = require("express");
const cors = require("cors");
const db = require("./models");
const postRoutes = require("./routes/post");

const app = express();
app.use(express.json());
app.use(cors());

//Routes
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.json({ message: "App is started!" });
});

const port = process.env.PORT || 5000;

db.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`The server is started on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(`Error ⛔ err`);
  });
