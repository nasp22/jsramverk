import './DelayTable.css';

export default function DelayTable() {

  let delayed = document.getElementsByClassName("delayed-trains");
  console.log(delayed)
  fetch("http://localhost:1337/delayed")
      .then((response) => response.json())
      .then(function(result) {
          return renderDelayedTable(result.data, delayed[0]);
      });
}

function renderDelayedTable(data, table) {
  data.forEach((item) => {
      let element = document.createElement("div");

      element.innerHTML = `
          <div class="train-number">
              ${item.OperationalTrainNumber}
          </div>
          <div class="current-station">
              <div>${item.LocationSignature}</div>
              <div>${item.FromLocation ? item.FromLocation[0].LocationName + " -> " : ""} ${item.ToLocation ? item.ToLocation[0].LocationName : ""}</div>
          </div>
          <div class="delay">
              ${outputDelay(item)}
          </div>`;

      // element.addEventListener("click", function() {
      //     renderTicketView(item);
      // });

      table.appendChild(element);
  });
}

function outputDelay(item) {
  let advertised = new Date(item.AdvertisedTimeAtLocation);
  let estimated = new Date(item.EstimatedTimeAtLocation);

  const diff = Math.abs(estimated - advertised);

  return Math.floor(diff / (1000 * 60)) + " minuter";
}