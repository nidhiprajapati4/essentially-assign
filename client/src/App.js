import React, { useState } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [symbol, setSymbol] = useState("");
  const [date, setDate] = useState("");
  const [stockData, setStockData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/fetchStockData",
        { symbol, date }
      );
      setStockData(response.data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
      setStockData(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <label className="symbol">
          Symbol:
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
        </label>
        <br />
        <label className="date">
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" className="button">
          Submit
        </button>
      </form>

      {stockData && (
        <div>
          <h1>Stock Data:</h1>
          <p>Open: {stockData.open}</p>
          <p>High: {stockData.high}</p>
          <p>Low: {stockData.low}</p>
          <p>Close: {stockData.close}</p>
          <p>Volume: {stockData.volume}</p>
        </div>
      )}
    </div>
  );
}

export default App;
