const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const employeeRouter = require("./routes/employeeRouter");
const rootRouter = require("./routes/rootRouter");
const userRouter = require("./routes/userRouter");

const courseRouter = require("./routes/courseRouter");
const questionRouter = require("./routes/questionRouter");
const authRouter = require("./routes/authRouter");
const generalRouter = require("./routes/generalRouter");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const verifyJWT = require("./middlewares/auth/verifyJWT");
const credentials = require("./middlewares/auth/credentials");
const corsOptions = require("./config/corsOptions");

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
// routers
app.use("/auth", authRouter);
app.use("/general", generalRouter);

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
