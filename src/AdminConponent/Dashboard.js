// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { getGoldPrices, getDiamondPrices } from '../server/api';

const Dashboard = () => {
  const [goldPrices, setGoldPrices] = useState([]);
  const [diamondPrices, setDiamondPrices] = useState([]);

  useEffect(() => {
    getGoldPrices().then(response => setGoldPrices(response.data));
    getDiamondPrices().then(response => setDiamondPrices(response.data));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="prices">
        <div className="gold-prices">
          <h3>Gold Prices</h3>
          <ul>
            {goldPrices.map(price => (
              <li key={price.date}>{price.date}: {price.value}</li>
            ))}
          </ul>
        </div>
        <div className="diamond-prices">
          <h3>Diamond Prices</h3>
          <ul>
            {diamondPrices.map(price => (
              <li key={price.date}>{price.date}: {price.value}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
