import io from 'socket.io-client'
import React, { useEffect, useRef } from 'react';
import * as L from 'leaflet';
// import markerImg from '../icon/location.png'

const Map = () => {
  const mapRef = useRef(null);
  const markers = useRef({});

  useEffect(() => {
    const map = L.map('map').setView([62.173276, 14.942265], 5);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

  //   var myMarker = L.icon({
  //     iconUrl: markerImg,
  //     iconSize:     [38, 95],
  //     shadowSize:   [50, 64],
  // });

    const socket = io("http://localhost:1337");

    socket.on("message", (data) => {
      if (markers.current.hasOwnProperty(data.trainnumber)) {
        const marker = markers.current[data.trainnumber];
        marker.setLatLng(data.position);
      } else {
        const marker = L.marker(data.position).bindPopup(data.trainnumber).addTo(map);
        markers.current[data.trainnumber] = marker;
      }
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" className="map"></div>;
};

export default Map;