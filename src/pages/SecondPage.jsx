import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import './secondpage.css';
import { Link } from 'react-router-dom';

function App() {
  const [bitcoinData, setBitcoinData] = useState([]);
  const [targetPrice, setTargetPrice] = useState('');
  const [matchingData, setMatchingData] = useState([]);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=max')
      .then((response) => response.json())
      .then((data) => {
        const prices = data.prices.map(([timestamp, price]) => ({
          date: new Date(timestamp),
          price,
        }));
        setBitcoinData(prices);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleTargetPriceChange = (e) => {
    const enteredPrice = parseFloat(e.target.value);

    const matchingData = bitcoinData.filter(
      (entry) => Math.abs(entry.price - enteredPrice) <= 10
    );

    setTargetPrice(enteredPrice.toString());
    setMatchingData(matchingData);
  };

  return (
    <div className="App">
      <h1>Timing Trader</h1>
      <div>
        <label htmlFor="targetPrice">Price</label>
        <input
          type="number"
          id="targetPrice"
          value={targetPrice}
          onChange={handleTargetPriceChange}
        />
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={bitcoinData}>
          <XAxis dataKey="date" domain={['auto', 'auto']} />
          <YAxis domain={['dataMin', 'dataMax']} />
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
          {matchingData.length > 0 && (
            <ReferenceLine
              y={matchingData[0].price}
              stroke="red"
              strokeWidth={1}
            />
          )}
        </LineChart>
      </ResponsiveContainer>

      <div className="matching-info">
        {matchingData.length > 0 && (
          <p>
            Bitcoin hit the price target on {matchingData[0].date.toLocaleDateString()} - Price: {matchingData[0].price}
          </p>
        )}
      </div>
      <h1>To go back</h1>
      <Link to="/">
        <button>click here</button>
      </Link>
    </div>
  );
}

export default App;
