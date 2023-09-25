import React, { useState } from 'react';
import DelayTableView from './DelayTableView';
import TicketView from './TicketView';
import Map from './Map';

const MainView = () => {
  const [selectedTrain, setSelectedTrain] = useState(null);

  const handleTrainClick = (train) => {
    setSelectedTrain(train);
  };

  return (<>
    <div className="delayed">
      {selectedTrain ? (
        <TicketView selectedTrain={selectedTrain} onBackClick={() => setSelectedTrain(null)} />
      ) : (
        <DelayTableView onTrainClick={handleTrainClick} />
      )}
        </div>
      <Map />
      </>
  );
};

export default MainView;