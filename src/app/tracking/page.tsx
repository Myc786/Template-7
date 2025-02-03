// src/pages/tracking/[carId].tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CarTrackingData } from '@/types/CarTracking';

const CarTrackingPage = () => {
  const router = useRouter();
  const { carId } = router.query; // Extract carId from URL

  const [trackingData, setTrackingData] = useState<CarTrackingData | null>(null);

  useEffect(() => {
    if (!carId) return; // Ensure carId is available

    const fetchCarLocation = async () => {
      // In a real implementation, you would fetch this data from your backend or external API
      const mockTrackingData: CarTrackingData = {
        carId: carId as string,
        currentLocation: {
          latitude: 40.7128, // Example coordinates
          longitude: -74.0060,
          timestamp: new Date().toISOString(),
        },
        isMoving: true,
        speed: 45, // km/h
        status: 'active',
        batteryLevel: 85,
      };

      setTrackingData(mockTrackingData);
    };

    // Fetch car location on page load
    fetchCarLocation();

    // Set up polling to update the location every 30 seconds
    const intervalId = setInterval(fetchCarLocation, 30000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [carId]);

  if (!trackingData) {
    return <div>Loading car location...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Car Tracking</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Car Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Car ID: {trackingData.carId}</p>
            <p className="font-medium">Status: {trackingData.status}</p>
            <p className="font-medium">
              Location: {trackingData.currentLocation.latitude.toFixed(4)}, 
              {trackingData.currentLocation.longitude.toFixed(4)}
            </p>
          </div>
          <div>
            <p className="font-medium">
              Moving: {trackingData.isMoving ? 'Yes' : 'No'}
            </p>
            <p className="font-medium">
              Speed: {trackingData.speed ? `${trackingData.speed} km/h` : 'N/A'}
            </p>
            <p className="font-medium">
              Battery: {trackingData.batteryLevel}% 
            </p>
          </div>
        </div>
        {/* Optional: Integrate a map component here */}
        <div className="mt-6">
          {/* Example: Use a map integration component */}
          <p className="text-lg font-medium mb-4">Location on map:</p>
          {/* You can integrate a map library such as Google Maps or Mapbox */}
          {/* Example: */}
          {/* <MapComponent latitude={trackingData.currentLocation.latitude} longitude={trackingData.currentLocation.longitude} /> */}
        </div>
      </div>
    </div>
  );
};

export default CarTrackingPage;
