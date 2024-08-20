import * as wasm from "universal-transport";

import useLocalStorage from 'use-local-storage';
import { useRef, useEffect, useState } from 'react';
import React from 'react';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import {vehicles_data} from "./dummy_data/vehicles.js";

import NavBar from "./ui/components/NavBar.js";
import UniClock from "./ui/components/UniClock.js";
import AssetBar from "./ui/components/AssetBar.js";

mapboxgl.accessToken = 'pk.eyJ1Ijoia2luZ29pbmF6M3IwIiwiYSI6ImNsa2FkNGQwMDA1ejUzZm80M2tsY3VxcmoifQ.QeAUXhNjF7Flu3DEnOoo1A';


export default function App() {

  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
  const [darkMode, setDarkMode] = useState(defaultDark);

  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  const [initialized, setInitialized] = useState(false);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(36.8241);
  const [lat, setLat] = useState(-1.2752);
  const [zoom, setZoom] = useState(12);

  /* Assign a unique ID to each vehicle */

  vehicles_data.features.forEach(function (vehicle, i) {
    vehicle.properties.id = i;
  });

  // This applies style to the button so as to trigger the dark transition. 
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);
  

  // This is the main function for switching themes.
  const switchTheme = () => {
    const newTheme = darkMode ? 'dark' : 'light';
    setTheme(newTheme);
    setDarkMode(!darkMode);
  }

  const mapDarkModeStyle = 'mapbox://styles/kingoinaz3r0/clkagpquv003001phayut3a65';
  const mapLightModeStyle = '';

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: mapDarkModeStyle,
        center: [lng, lat],
        zoom: zoom
    });
  });

  // https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  useEffect(() => {
    if (!map.current) return;
    map.current.on('load', () => {
      /* Add the data to your map as a layer */
      map.current.addLayer({
        id: 'vehicle_locations',
        type: 'circle',
         /* Add a GeoJSON source containing place coordinates and information. */
        source: {
          type: 'geojson',
          data: vehicles_data
        }
      });
    });
  })

  return (
    <>
      <h1>Universal Transport</h1>
      <UniClock data={dateState} />
      <div>
        <div className="asset-list">
          <AssetBar />
        </div>
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div className="content-container">
        <div ref={mapContainer} className="map-container" />
        </div>
      </div>
      <Counter />
      {/* pass props which determine what navbar to use */}
      <NavBar /> 
    </>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  function updateCount() {
    const transportSpace = wasm.TransportSpace.new();
    setCount(count + 1);
  }
  return (
    <button onClick={() => {updateCount()}}>
      You clicked me {count} times
    </button>
  );
}