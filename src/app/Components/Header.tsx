"use client";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "./app/Components/public/Logo.png";
import Search from "./app/components/public/search.png";
import Filter from "./app/components/public/filter.png";
import Like from "./app/components/public/Like.png";
import Notification from "./app/components/public/Notification.png";
import Settings from "./app/components/public/Settings.png";
import Profile from "./app/components/public/profile.png";
import { client } from "@/sanity/lib/client"; // Sanity client import karein
import { searchCarsQuery } from "@/sanity/lib/qureries"; // Groq query import karein

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [carType, setCarType] = useState("");
  const [seating, setSeating] = useState("");
  const [price, setPrice] = useState("");
  interface Car {
    name: string;
    pricePerDay: number;
    transmission: string;
    fuelCapacity: number;
    seatingCapacity: number;
  }

  const [searchResults, setSearchResults] = useState<Car[]>([]);

  const handleSearch = async () => {
    try {
      const query = searchCarsQuery(searchQuery, carType, seating, price);
      const results = await client.fetch(query, { searchQuery, carType, seating, price });
      setSearchResults(results);
      console.log("Search Results:", results); // Debugging ke liye
    } catch (error) {
      console.error("Search Error:", error);
    }
  };

  return (
    <div className="h-auto w-full flex flex-wrap items-center justify-between px-4 py-4 bg-white">
      {/* Logo */}
      <div className="w-[120px] h-[40px] flex-shrink-0">
        <Image
          src={Logo}
          alt="Logo"
          width={120}
          height={40}
          className="w-full h-full object-contain ml-4"
        />
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 w-full max-w-[492px] h-[44px] border rounded-full px-3 mt-4 ml-1 md:mt-0 md:flex-1 md:mr-8">
        <Image
          src={Search}
          alt="Search"
          width={20}
          height={20}
        />
        <input
          type="text"
          placeholder="Search something here"
          className="flex-1 bg-transparent border-none outline-none text-sm px-2 w-[492px] h-[44px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>
          <Image
            src={Filter}
            alt="Filter"
            width={20}
            height={20}
          />
        </button>
      </div>

      {/* Profile Icons */}
      <div className="flex items-center space-x-4 mt-4 md:mt-0">
        <a href="#">
          <Image
            src={Like}
            alt="Like"
            width={36}
            height={36}
          />
        </a>
        <a href="#">
          <Image
            src={Notification}
            alt="Notification"
            width={36}
            height={36}
          />
        </a>
        <a href="#">
          <Image
            src={Settings}
            alt="Settings"
            width={36}
            height={36}
          />
        </a>
        <a href="#">
          <Image
            src={Profile}
            alt="Profile"
            width={44}
            height={44}
            className="rounded-full"
          />
        </a>
      </div>

      {/* Display Search Results */}
      {searchResults.length > 0 && (
        <div className="w-full mt-4">
          <h3 className="text-lg font-semibold mb-2">Search Results:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((car, index) => (
              <div key={index} className="border p-4 rounded-lg">
                <h4 className="text-xl font-bold">{car.name}</h4>
                <p>Price per day: ${car.pricePerDay}</p>
                <p>Transmission: {car.transmission}</p>
                <p>Fuel capacity: {car.fuelCapacity}L</p>
                <p>Seating capacity: {car.seatingCapacity}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}