import './Container.css';
import React from 'react';
import DelayMap from './DelayMap.js'
import DelayTable from './DelayTable';


let container = document.getElementsByClassName("ContainerDiv");

while (container.firstChild) {
    container.removeChild(container.firstChild);
}

function Container() {
  return (
    <div>
      <div className="delayed">
        <h1>Försenade tåg</h1>
        <div id="delayed-trains" className="delayed-trains">
          <DelayTable/>
        </div>
        </div>
      <div id="map" className="map">
        <DelayMap/>
      </div>
    </div>
  );
};
export default Container;
