import React, { useState, useEffect } from 'react';
import config from '../config.js';

const apiUrl = config;
console.log(`utskrift apiURL i ticketview.jsx = ${apiUrl}`)

const TicketView = ({ selectedTrain, onBackClick }) => {
  const [reasonCodes, setReasonCodes] = useState([]);
  const [existingTickets, setExistingTickets] = useState([]);

  useEffect(() => {
    fetchReasonCodes();
    fetchExistingTickets();
  }, []);

  const fetchReasonCodes = () => {
    fetch(`${apiUrl}/codes`)
      .then((response) => response.json())
      .then((result) => {
        setReasonCodes(result.data);
      })
      .catch((error) => console.error('Error fetching reason codes:', error));
  };

  const fetchExistingTickets = () => {
    fetch(`${apiUrl}/tickets`)
      .then((response) => response.json())
      .then((result) => {
        setExistingTickets(result.data);
      })
      .catch((error) => console.error('Error fetching existing tickets:', error));
  };

  const renderReasonCodeOptions = () => {
    return reasonCodes.map((code) => (
      <option key={code.Code} value={code.Code}>
        {`${code.Code} - ${code.Level3Description}`}
      </option>
    ));
  };

  const renderExistingTickets = () => {
    return existingTickets.map((ticket) => (
      <tr key={ticket._id}>
        <td>{ticket.code}</td>
        <td>{ticket.trainnumber}</td>
        <td>{ticket.traindate}</td>
        <td>
          <i class="material-icons button edit">edit</i>
        </td>
        <td>
          <i class="material-icons button delete">delete</i>
        </td>
      </tr>
    ));
  };


  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newTicket = {
      code: event.target.reasonCode.value,
      trainnumber: selectedTrain.OperationalTrainNumber,
      traindate: selectedTrain.EstimatedTimeAtLocation.substring(0, 10),
    };

    fetch(`${apiUrl}/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTicket),
    })
      .then((response) => response.json())
      .then(() => {
        fetchExistingTickets();
      })
      .catch((error) => console.error('Error creating new ticket:', error));
  };

  return (
    <div className="ticket-container">
      <div className="ticket">
        <button href="" onClick={onBackClick}>
          Tillbaka
        </button>
        <h1>Nytt ärende för tåg {selectedTrain.OperationalTrainNumber}</h1>
        <form onSubmit={handleFormSubmit}>
          <label>Orsakskod</label>
          <br />
          <select name="reasonCode" id="reason-code">
            {renderReasonCodeOptions()}
          </select>
          <br />
          <br />
          <input type="submit" value="Skapa nytt ärende" />
        </form>
      </div>
      <br />
      <div className="old-tickets">
        <h2>Befintliga ärenden</h2>
        <table className="ticket-table">
          <thead>
            <tr>
              <th>Orsakskod</th>
              <th>Tågnummer</th>
              <th>Datum</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {renderExistingTickets()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketView;
