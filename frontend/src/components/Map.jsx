import io from 'socket.io-client';
import React, { useEffect, useRef } from 'react';
import * as L from 'leaflet';
import markerImg from '../icon/location.png';
import config from '../config.js';

const apiUrl = config;

const Map = ({ delayedData, resetMap, selectedTrain }) => {
  const mapRef = useRef(null);
  const markers = useRef({});

  useEffect(() => {
    const map = L.map('map').setView([62.173276, 14.942265], 6);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const myMarker = L.icon({
      iconUrl: markerImg,
      iconSize: [45, 45],
    });

    const socket = io(`${apiUrl}`, {secure: false});

    Object.values(markers.current).forEach((marker) => map.removeLayer(marker));
    markers.current = {};


    socket.on('message', (data) => {
      if (selectedTrain) {
        if (data.trainnumber === selectedTrain.OperationalTrainNumber) {
          if (markers.current.hasOwnProperty(data.trainnumber)) {
            const marker = markers.current[data.trainnumber];
            marker.setLatLng(data.position);
          } else {
            const marker = L.marker(data.position, { icon: myMarker }).bindPopup(data.trainnumber).addTo(map);
            markers.current[data.trainnumber] = marker;
          }
      }
    }

    if (!selectedTrain) {
      delayedData.forEach((train) => {
        if (data.trainnumber === train.OperationalTrainNumber) {
          if (markers.current.hasOwnProperty(data.trainnumber)) {
            const marker = markers.current[data.trainnumber];
            marker.setLatLng(data.position);
          } else {
            const marker = L.marker(data.position, { icon: myMarker }).bindPopup(data.trainnumber).addTo(map);
            markers.current[data.trainnumber] = marker;
          }
        }
      })
    }

  });

    return () => {
      map.remove();
    };
  }, [delayedData, resetMap, selectedTrain]);

  return <div id="map" className="map"></div>;
};

export default Map;
