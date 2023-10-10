import React, { useState, useEffect } from 'react';
import DelayTableView from './DelayTableView';
import TicketView from './TicketView';
import Map from './Map';
import config from '../config.js';

const apiUrl = config;

const MainView = () => {
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [delayedData, setDelayedData] = useState([]);
  const [resetMap, setResetMap] = useState(false);

  useEffect(() => {
    fetchDelayedData();
  }, []);

  const fetchDelayedData = () => {
    fetch(`${apiUrl}/delayed`)
      .then((response) => response.json())
      .then((data) => setDelayedData(data.data))
      .catch((error) => console.error('Error fetching delayed data:', error));
  };

  const handleTrainClick = (train) => {
    setSelectedTrain(train);
    setResetMap(false);
  };

  const handleBackClick = () => {
    setSelectedTrain(null);
    setResetMap(true);
  };

  return (
    <>
      {selectedTrain ? (
        <TicketView selectedTrain={selectedTrain} onBackClick={handleBackClick} />
      ) : (
        <DelayTableView onTrainClick={handleTrainClick} delayedData={delayedData} />
      )}
      <Map delayedData={delayedData} resetMap={resetMap} selectedTrain={selectedTrain} />
    </>
  );
};

export default MainView;
