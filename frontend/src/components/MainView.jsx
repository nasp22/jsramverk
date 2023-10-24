import React, { useState, useEffect } from 'react';
import DelayTableView from './DelayTableView';
import TicketView from './TicketView';
import Map from './Map';
import config from '../config.js';

const apiUrl = config;

const MainView = () => {
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [delayedData, setDelayedData] = useState([]);
  const [rerenderMainView, setRerenderMainView] = useState(false);

  useEffect(() => {
    fetchDelayedData();
  }, []);

  const fetchDelayedData = () => {
    fetch(`${apiUrl}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ query: `
      {
        delays {
          ActivityId,
          ActivityType,
          AdvertisedTimeAtLocation,
          AdvertisedTrainIdent
          Canceled
          EstimatedTimeAtLocation
          FromLocation {
            LocationName
            Priority
            Order
          }
          LocationSignature
          OperationalTrainNumber
          ToLocation {
            LocationName
            Priority
            Order
          }
          TrainOwner
        }
      }` })
    })
      .then((response) => response.json())
      .then((data) => setDelayedData(data.data.delays))
      .catch((error) => console.error('Error fetching delayed data:', error));
  };

  const handleTrainClick = (train) => {
    setSelectedTrain(train);
  };

  const handleBackClick = () => {
    setSelectedTrain(null);;
  };

  return (
    <>
      {selectedTrain ? (
        <TicketView selectedTrain={selectedTrain} onBackClick={handleBackClick} />
      ) : (
        <DelayTableView onTrainClick={handleTrainClick} delayedData={delayedData} setDelayedData={setDelayedData} />
      )}
      <Map delayedData={delayedData}  selectedTrain={selectedTrain}  rerenderMainView={rerenderMainView} setRerenderMainView={setRerenderMainView}/>
    </>
  );
};

export default MainView;
