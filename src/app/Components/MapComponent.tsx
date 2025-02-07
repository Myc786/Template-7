"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Dynamically import React-Leaflet components (disable SSR)
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Polyline = dynamic(() => import("react-leaflet").then((mod) => mod.Polyline), { ssr: false });

// Custom car icon for the map
const carIcon = new L.Icon({
  iconUrl: "/car-marker.png", // Make sure this image exists in `/public`
  iconSize: [40, 25],
  iconAnchor: [20, 12],
});

const TrackingMap = () => {
  // Dummy route simulating car movement
  const route: [number, number][] = [
    [24.8607, 67.0011], // Karachi start point
    [24.8615, 67.0091],
    [24.8623, 67.0151],
    [24.8632, 67.0221],
    [24.8640, 67.0281], // End point
  ];

  const [positionIndex, setPositionIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPositionIndex((prevIndex) => (prevIndex < route.length - 1 ? prevIndex + 1 : prevIndex));
    }, 2000); // Move every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-96">
      <MapContainer center={route[0]} zoom={14} className="w-full h-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Polyline positions={route} color="blue" />
        <Marker position={route[positionIndex]} icon={carIcon} />
      </MapContainer>
    </div>
  );
};

export default TrackingMap;
