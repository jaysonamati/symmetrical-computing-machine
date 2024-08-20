import { useRef, useEffect, useState } from 'react';
import React from 'react';

import "../styles/NavBar.css";

import NavElement from "../components/NavElement.js";

export default function NavBar() {
    const vehicleNavLabels = [];
    const transportSpaceNavLabels = [];
    return (
        <>
            <div className="nav-container">
                <NavElement navLabel={"Navigation"}/>
                <NavElement navLabel={"Navigation"}/>
                <NavElement navLabel={"Navigation"}/>
                <NavElement navLabel={"Navigation"}/>
            </div>
        </>
    )
}