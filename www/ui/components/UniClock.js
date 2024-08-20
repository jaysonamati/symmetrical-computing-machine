import { useRef, useEffect, useState } from 'react';
import React from 'react';

export default function UniClock({data}) {
    return(
        <>
        <div className="time-banner">
            <p>
            {' '}
            {data.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            })}
            </p>
            <p>
            {data.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            })}
            </p>
        </div>
        </>
    )
}