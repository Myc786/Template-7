"use client";
import React, { useState } from "react";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { LuSettings2 } from "react-icons/lu";
import { FaHeart } from "react-icons/fa6";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import { client } from "@/sanity/lib/client";
import { searchCarsQuery } from "@/sanity/lib/qureries";

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
      console.log("Search Results:", results);
    } catch (error) {
      console.error("Search Error:", error);
    }
  };

  return (
    <div className="h-auto w-full flex flex-wrap items-center justify-between px-4 py-4 bg-white">
      {/* Logo */}
      <div className="flex items-center justify-between w-full md:w-auto">
      <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors duration-300">
        MORENT
      </Link>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 w-full max-w-[492px] h-[44px] border rounded-full px-3 mt-4 ml-1 md:mt-0 md:flex-1 md:mr-8">
      <CiSearch className="h-[20px] w-[20px]" />
      <input
        type="text"
        placeholder="Search something here"
        className="flex-1 bg-transparent border-none outline-none text-sm px-2 w-[492px] h-[44px]"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>
        <LuSettings2 className="h-[20px] w-[20px]" />
      </button>
      </div>

      {/* Profile & Authentication */}
      <div className="flex items-center space-x-4 mt-4 md:mt-0">
      <a href="#">
        <FaHeart className="w-7 h-7" />
      </a>
      <a href="#">
        <IoNotificationsCircleOutline className="h-9 w-9" />
      </a>
      <a href="#">
        <IoMdSettings className="h-9 w-9" />
      </a>

      {/* Authentication */}
      <div className="flex items-center space-x-4">
        <SignedOut>
        <SignInButton mode="modal">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
          Sign In
          </button>
        </SignInButton>
        </SignedOut>
        <SignedIn>
        <UserButton afterSignOutUrl="/" appearance={{
          elements: { avatarBox: "w-10 h-10 border-2 border-gray-300 shadow-md" }
        }} />
        </SignedIn>
      </div>
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
