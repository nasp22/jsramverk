import React, { useEffect, useState } from 'react';
// import TicketView from './TicketView';

const DelayedTable = () => {
  const [delayedData, setDelayedData] = useState([]);

  useEffect(() => {
    fetchDelayedData();
  }, []);

  const fetchDelayedData = () => {
    fetch("http://localhost:1337/delayed")
      .then((response) => response.json())
      .then((result) => {
        setDelayedData(result.data);
      })
      .catch((error) => console.error('Error fetching delayed data:', error));
  };

  const outputDelay = (item) => {
    let advertised = new Date(item.AdvertisedTimeAtLocation);
    let estimated = new Date(item.EstimatedTimeAtLocation);

    const diff = Math.abs(estimated - advertised);

    return Math.floor(diff / (1000 * 60)) + " minuter";
  };

  const renderTicketView = (item) => {
    // TicketView(item)
    console.log(item)
  };

  return (
    <div id="delayed-trains">
      {delayedData.map((item, index) => (
        <div key={index} className="train-item" onClick={() => renderTicketView(item)}>
          <div className="train-number">
            {item.OperationalTrainNumber}
          </div>
          <div className="current-station">
            <div>{item.LocationSignature}</div>
            <div>
              {item.FromLocation ? `${item.FromLocation[0].LocationName} -> ` : ""}
              {item.ToLocation ? item.ToLocation[0].LocationName : ""}
            </div>
          </div>
          <div className="delay">
            {outputDelay(item)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DelayedTable;