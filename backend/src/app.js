const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const { status } = require("http-status");
const morgan = require("morgan");
const routes = require("./routes");
const { errorConverter, errorHandler } = require("./errors/errorHandler");
const ApiError = require("./errors/ApiError");

const app = express();

app.use(morgan("combined"));

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());

// v1 api routes
app.use("/api/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(status.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
