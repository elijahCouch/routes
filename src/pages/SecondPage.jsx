import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Text,
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

    const matchingData = bitcoinData
      .filter(entry => Math.abs(entry.price - enteredPrice) <= 10);

    setTargetPrice(enteredPrice.toString());
    setMatchingData(matchingData);
  };

  const customTooltip = (data) => {
    if (data.active && data.payload) {
      const date = new Date(data.label);
      const price = data.payload[0].value;

      return (
        <div className="custom-tooltip-box">
          <p>Date: {date.toLocaleDateString()}</p>
          <p>Price: {price}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="App">
      <h1>Timeing traider</h1>
      <div>
        <label htmlFor="targetPrice">prices</label>
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
          <Tooltip content={customTooltip} />
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
          {matchingData.map((dataPoint, index) => (
            <React.Fragment key={index}>
              <ReferenceLine
                x={dataPoint.date.getTime()}
                stroke="red"
                strokeWidth={1}
              />
              <Text
                x={dataPoint.date.getTime()}
                y={10}
                dy={-15 - (index * 15)}
                textAnchor="left"
                fill="red"
                fontSize={12}
              >
                {`Bitcoin hit ${targetPrice} on ${dataPoint.date.toLocaleDateString()} - Price: ${dataPoint.price}`}
              </Text>
            </React.Fragment>
          ))}
        </LineChart>
      </ResponsiveContainer>
    
      <div className="matching-info">
        <p>
          bitcoin hit the price target {matchingData.length} the date on the time and prices:
        </p>
        <ul>
          {matchingData.map((dataPoint, index) => (
            <li key={index}>{`${dataPoint.date.toLocaleDateString()} - Price: ${dataPoint.price}`}</li>
          ))}
        </ul>
      </div>
      <h1>To go back </h1>
      <Link to="/">
        <button>click here</button>
      </Link>
    </div>
  );
}

export default App;
