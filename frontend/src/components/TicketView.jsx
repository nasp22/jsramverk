import React, { useState, useEffect } from 'react';
import config from '../config.js';

const apiUrl = config;

const TicketView = ({ selectedTrain, onBackClick }) => {
  const [reasonCodes, setReasonCodes] = useState([]);
  const [existingTickets, setExistingTickets] = useState([]);
  const [editedTicket, setEditedTicket] = useState(null);

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

  const handleEditClick = (ticket) => {
    setEditedTicket(ticket);
  };

  const handleCancelEdit = () => {
    setEditedTicket(null);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const code = formData.get('reasonCode');

    if (editedTicket) {
      // Uppdatera befintligt ärende
      const updatedTicket = {
        code,
        trainnumber: editedTicket.trainnumber,
        traindate: editedTicket.traindate,
        trainchange: new Date().toISOString(),
      };

      fetch(`${apiUrl}/tickets/${editedTicket._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTicket),
      })
        .then((response) => response.json())
        .then(() => {
          fetchExistingTickets();
          setEditedTicket(null);
        })
        .catch((error) => console.error('Error updating ticket:', error));
    } else {
      // Om nytt ärende:
      const newTicket = {
        code,
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
          fetchExistingTickets(); // Uppdatera listan över befintliga ärenden
        })
        .catch((error) => console.error('Error creating new ticket:', error));
    }
  };

  const handleDeleteClick = (ticketId) => {
    // Implement delete logic here using ticketId
    console.log('Deleting ticket with ID:', ticketId);
  };

  return (
    <div className="ticket-container">
      <div className="ticket">
        <button href="" onClick={onBackClick}>
          Tillbaka
        </button>
        <div  className="add_form">
        <h1>Nytt ärende för tåg {selectedTrain.OperationalTrainNumber}</h1>
        <form onSubmit={handleFormSubmit}>
          <label>Orsakskod</label>
          <br />
          <br />
          <select name="reasonCode" id="reason-code">
            {renderReasonCodeOptions()}
          </select>
          <br />
          <br />
          <input type="submit" value="Skapa nytt ärende" />
        </form>
      </div>
      <br /></div>
      <div className="old-tickets">
        <h2>Befintliga ärenden</h2>
        {editedTicket ? (
          <form onSubmit={handleFormSubmit} className="edit_form">
            <label>Uppdatera orsakskod för tåg: {editedTicket.trainnumber}</label>
            <br />
            <br />
            <select name="reasonCode" id="reason-code" defaultValue={editedTicket.code}>
              {renderReasonCodeOptions()}
            </select>
            <br />
            <br />
            <input type="submit" value="Uppdatera ärende" />
            <button onClick={handleCancelEdit}>Avbryt</button>
          </form>
        ) : null}
        <table className="ticket-table">
          <thead>
            <tr>
              <th>Orsakskod</th>
              <th>Tågnummer</th>
              <th>Datum</th>
              <th>Senast ändrad</th>
              <th>Ändra</th>
              <th>Radera</th>
            </tr>
          </thead>
          <tbody>
            {existingTickets.map((ticket) => (
              <tr key={ticket._id}>
                <td>{ticket.code}</td>
                <td>{ticket.trainnumber}</td>
                <td>{ticket.traindate}</td>
                <td>{ticket.trainchange}</td>
                <td>
                  <button onClick={() => handleEditClick(ticket)}>Redigera</button>
                </td>
                <td>
                  <button onClick={() => handleDeleteClick(ticket._id)}>Radera</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketView;
