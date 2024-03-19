const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
// env
dotenv.config();

// const PORT = process.env.PORT || 500;
const PORT = process.env.PORT || 5000;
const DB = process.env.MONGO_CONNECT;

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
app.use("/users", userRouter);

// if not found
app.use((req, res) =>
  res.status(404).json({ success: false, message: "Not found" })
);

const startServer = async () => {
  try {
    await mongoose.connect(DB);
    app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
