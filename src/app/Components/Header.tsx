"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [carType, setCarType] = useState("");
  const [seating, setSeating] = useState("");
  const [price, setPrice] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    // Your search function logic
  };

  return (
    <div className="h-auto w-full flex flex-wrap items-center justify-between px-4 py-4 bg-white">
      {/* Logo */}
      <div className="w-[120px] h-[40px] flex-shrink-0">
        <Image
          src="/Logo.png" // Referencing from public folder
          alt="Logo"
          width={120}
          height={40}
          className="w-full h-full object-contain ml-4"
        />
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 w-full max-w-[492px] h-[44px] border rounded-full px-3 mt-4 ml-1 md:mt-0 md:flex-1 md:mr-8">
        <Image
          src="/search.png" // Referencing from public folder
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
            src="/filter.png" // Referencing from public folder
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
            src="/Like.png" // Referencing from public folder
            alt="Like"
            width={36}
            height={36}
          />
        </a>
        <a href="#">
          <Image
            src="/Notification.png" // Referencing from public folder
            alt="Notification"
            width={36}
            height={36}
          />
        </a>
        <a href="#">
          <Image
            src="/Settings.png" // Referencing from public folder
            alt="Settings"
            width={36}
            height={36}
          />
        </a>
        <a href="#">
          <Image
            src="/profile.png" // Referencing from public folder
            alt="Profile"
            width={44}
            height={44}
            className="rounded-full"
          />
        </a>
      </div>
    </div>
  );
}
