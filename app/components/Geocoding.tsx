"use client";

import React, { useEffect, useMemo, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { geocodeAddress } from '../libs/nominatim';
import dynamic from 'next/dynamic';

interface Props {
  position: [number, number];
  setPosition: (position: [number, number]) => void;
  location: string;
  setLocation: (location: string) => void;
}

export default function GeocodingMap({ position, setPosition, location, setLocation } : Props) {
  
  /* eslint-disable react-hooks/exhaustive-deps */
  const Map = useMemo(() => dynamic(() => import('./Map'), {
    ssr: false
  }), [position]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const handleGeocode = async () => {
    const results = await geocodeAddress(location);
    if (results && results.length > 0) {
      const { lat, lon } = results[0];
      setPosition([parseFloat(lat), parseFloat(lon)]);
    }
  };


  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter address"
        className="border p-2 mb-4 w-full rounded-lg"
      />
      <button onClick={handleGeocode} className="bg-blue-500 hover:bg-blue-400 text-white p-2 rounded-lg">
        Search in map
      </button>
      <Map 
        center={position}
      />
    </div>
  );
}
