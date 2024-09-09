"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
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

  const Map = useMemo(() => dynamic(() => import('./Map'), {
    ssr: false
}), [position]);

  const handleGeocode = async () => {
    const results = await geocodeAddress(location);
    if (results && results.length > 0) {
      const { lat, lon } = results[0];
      console.log(lat, lon);
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
