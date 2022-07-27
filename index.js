import express from "express";
import dotenv from "dotenv";
import ip from "ip";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import { connectToDatabase } from "./utils/db.js";
import routes from "./api/routes/index.js";

dotenv.config();
const app = express();

const ipAddress = ip.address();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
connectToDatabase(process.env.MONGO_URI);

// Register Route
app.use("/auth", routes.AUTH_ROUTE);
// Handle error 404
app.use((req, res, next) => {
  const err = new Error("end point not found");
  err.status = 404;
  next(err);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// listen to server
const server = app.listen(PORT, () => {
  console.log(`server running at http://${ipAddress}:${PORT}`);
});
