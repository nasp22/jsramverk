import React from 'react';

const TicketView = ({ trainNumber }) => {
  return (
    <div className="ticket-container">
      <div className="ticket">
        <a href="/" id="back">&lt;- Tillbaka</a>
        <h1>Nytt ärende #{trainNumber}</h1>
        {/* Fyll i formulär för ärende */}
      </div>
      <div className="old-tickets" id="old-tickets">
        <h2>Befintliga ärenden</h2>
        {/* Visa befintliga ärenden */}
      </div>
    </div>
  );
};

export default TicketView;