import * as wasm from "universal-transport";
import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';
import { createRoot } from "react-dom/client";

import App from './App.js';

// // clear the existing html content 
// document.body.innerHTML = '<div id="app"></div>';

// // Render your react component instead
// const root = createRoot(document.getElementById('app'));
// root.render(<h1>Hello, kovachs</h1>)

const root = createRoot(document.getElementById('root'));
root.render(<App />);

// function NavigationBar() {
//     // TODO: Actually implement a navigation bar
//     return <h1>Hello from React!</h1>;
//   }
  
//   const domNode = document.getElementById('navigation');
//   const root = createRoot(domNode);
//   root.render(<NavigationBar />);

// wasm.greet("Kovachs");

// mapboxgl.accessToken = '<your access token here>';
// const map = new mapboxgl.Map({
//     container: 'map', // container ID
//     style: 'mapbox://styles/mapbox/streets-v12', // style URL
//     center: [-74.5, 40], // starting position [lng, lat]
//     zoom: 9 // starting zoom
// });
