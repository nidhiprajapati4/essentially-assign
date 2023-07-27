// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(function (req, res, next) {
  const allowedOrigins = ["http://localhost:3000"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.enable("trust proxy");

app.post("/api/fetchStockData", async (req, res) => {
  // YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION

  const { symbol, date } = req.body;

  try {
    if (!symbol || !date) {
      return res.status(400).json({ error: "Symbol and date are required" });
    }
    const response = await axios.get(
      `https://api.polygon.io/v1/open-close/AAPL/2023-01-09?adjusted=true&apiKey=LwoKF50Mq7Y0WkrkI69fx0gQHnJwKCdY`
    );
    const { open, high, low, close, volume } = response.data;

    if (!open || !high || !low || !close || !volume) {
      return res
        .status(404)
        .json({ error: "Stock data not found for the given symbol and date" });
    }

    res.json({ open, high, low, close, volume });
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
