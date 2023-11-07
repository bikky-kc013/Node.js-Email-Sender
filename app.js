const express = require("express");
const app = express();
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();
const createError = require("http-errors");
const morgan = require("morgan");
app.use(morgan("dev"));
const { router } = require("./routes/emailRoutes");

app.use(router);

app.get("/", async (req, res, next) => {
  res.status(200).json({
    message: "This is a email sending app",
  });
});

app.use(async (req, res, next) => {
  res.send(createError.NotFound("This page does not exists"));
});

app.use(async (err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Listening to the port ${PORT}`);
});
