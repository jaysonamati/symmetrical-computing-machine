import { useRef, useEffect, useState } from 'react';
import React from 'react';

import "../styles/NavBar.css";

export default function NavElement({navLabel}) {
    return (
        <>
            <div className='nav-element-container'>
                <div className="NavButtonActual" onClick={() => {console.log('click')}}>
                    <p>{navLabel}</p>
                </div>
            </div>
        </>
    )
}