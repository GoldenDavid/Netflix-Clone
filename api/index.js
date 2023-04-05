const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/list");
dotenv.config();

const mongoose = require("mongoose");
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongodb successfully");
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

app.listen(8080, () => {
  console.log("Back end server is running");
});
