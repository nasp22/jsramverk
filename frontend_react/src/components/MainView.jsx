import React, { useState } from 'react';
import DelayTableView from './DelayTableView';
import TicketView from './TicketView';

const MainView = () => {
  const [selectedTrain, setSelectedTrain] = useState(null);

  const handleTrainClick = (train) => {
    setSelectedTrain(train);
  };

  return (<>
      {selectedTrain ? (
        <TicketView selectedTrain={selectedTrain} onBackClick={() => setSelectedTrain(null)} />
      ) : (
        <DelayTableView onTrainClick={handleTrainClick} />
      )}
      </>
  );
};

export default MainView;