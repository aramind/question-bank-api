const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const employeeRouter = require("./src/routes/employeeRouter");
const rootRouter = require("./src/routes/rootRouter");
const userRouter = require("./src/routes/userRouter");

const courseRouter = require("./src/routes/courseRouter");
const questionRouter = require("./src/routes/questionRouter");

const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const verifyJWT = require("./src/middlewares/auth/verifyJWT");
const credentials = require("./src/middlewares/auth/credentials");
const corsOptions = require("./src/config/corsOptions");

// env
dotenv.config();

// const PORT = process.env.PORT || 500;
const PORT = process.env.PORT || 5000;
const DB = process.env.MONGO_CONNECT;

const app = express();

// // CORS options
app.use(cookieParser());
app.use(credentials);
app.use(cors(corsOptions));
// app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

// new routes
app.use("/v1", rootRouter);

// routes needing auth
app.use(verifyJWT);
app.use("/v1/employees", employeeRouter);

app.use("/v1/users", userRouter);
app.use("/v1/courses", courseRouter);
app.use("/v1/questions", questionRouter);

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
