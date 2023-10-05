import React, { useState, useEffect } from 'react';
// import Map from './Map';
import config from '../config.js';

const apiUrl = config;
console.log(`utskrift apiURL i delaytableview.jsx = ${apiUrl}`)

const DelayTableView = ({ onTrainClick }) => {
  const [delayedData, setDelayedData] = useState([]);

  useEffect(() => {
    fetchDelayedData();
  }, []);

  const fetchDelayedData = () => {
    fetch(`${apiUrl}/delayed`)
      .then((response) => response.json())
      .then((data) => setDelayedData(data.data))
      .catch((error) => console.error('Error fetching delayed data:', error));
  };

  const outputDelay = (item) => {
    let advertised = new Date(item.AdvertisedTimeAtLocation);
    let estimated = new Date(item.EstimatedTimeAtLocation);
    const diff = Math.abs(estimated - advertised);
    return Math.floor(diff / (1000 * 60)) + ' minuter';
  };

  return ( <>
  <div className="delayed">
    <h1>Försenade tåg</h1>
    <table className="train-table">
      <tbody>
        {delayedData.map((item, index) => (
          <tr
            key={index}
            className="train-item"
            onClick={() => onTrainClick(item)}
          >
            <td className="train-number">{item.OperationalTrainNumber}</td>
            <td className="current-station">
              <div>{item.LocationSignature}</div>
              <div>
                {item.FromLocation ? `${item.FromLocation[0].LocationName} -> ` : ''}
                {item.ToLocation ? item.ToLocation[0].LocationName : ''}
              </div>
            </td>
            <td className="delay">{outputDelay(item)}</td>
          </tr>
        ))}
      </tbody>
    </table>
</div>
    {/* <Map /> */}
    </>
  );
};

export default DelayTableView;
