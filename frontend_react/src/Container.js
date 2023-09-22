import './Container.css';
import React from 'react';
import DelayMap from './DelayMap.js'
import DelayTable from './DelayTable';

function Container() {
  return (
    <div class="container">
      <div class="delayed">
        <h1>Försenade tåg</h1>
        <DelayTable/>
      </div>
        <DelayMap/>
    </div>

  );
}

export default Container;
