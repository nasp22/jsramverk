import io from 'socket.io-client';
import React, { useEffect, useRef } from 'react';
import * as L from 'leaflet';
import markerImg from '../icon/location.png';
import config from '../config.js';

const apiUrl = config;
console.log(`utskrift apiURL i map.jsx = ${apiUrl}`);

const Map = ({ delayedData }) => {
  const mapRef = useRef(null);
  const markers = useRef({});

  useEffect(() => {
    const map = L.map('map').setView([62.173276, 14.942265], 5);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    var myMarker = L.icon({
      iconUrl: markerImg,
      iconSize: [38, 38],
    });

    const socket = io(`${apiUrl}`);

    socket.on('message', (data) => {
      if (delayedData.find((item) => item.OperationalTrainNumber === data.trainnumber)) {
        if (markers.current.hasOwnProperty(data.trainnumber)) {
          const marker = markers.current[data.trainnumber];
          marker.setLatLng(data.position);
        } else {
          const marker = L.marker(data.position, { icon: myMarker }).bindPopup(data.trainnumber).addTo(map);
          markers.current[data.trainnumber] = marker;
        }
      }
    });

    return () => {
      map.remove();
    };
  }, [delayedData]);

  return <div id="map" className="map"></div>;
};

export default Map;