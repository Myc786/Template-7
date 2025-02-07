"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

export default function TrackingPage() {
  const searchParams = useSearchParams();
  const carId = searchParams.get("carId");

  // Dummy car location (Karachi coordinates)
  const carLocation: L.LatLngTuple = [24.8607, 67.0011];

  // Current time state
  const [currentTime, setCurrentTime] = useState(new Date());

  // Dummy car icon
  const carIcon = L.icon({
    iconUrl: "/car1",
    iconSize: [50, 30],
    iconAnchor: [25, 15],
  });

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-green-600">Car Tracking</h2>
        <div className="text-gray-700">
          <p>Car ID: {carId}</p>
          <p>Current Time: {currentTime.toLocaleTimeString()}</p>
        </div>
      </div>

      <div className="h-[500px] w-full">
        <MapContainer 
          center={carLocation} 
          zoom={13} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={carLocation} icon={carIcon} />
        </MapContainer>
      </div>
    </div>
  );
}
