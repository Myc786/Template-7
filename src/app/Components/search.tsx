// components/SearchBar.js
import React, { useState } from 'react';
import { client } from '@/sanity/lib/client';
import { searchCarsQuery } from '@/sanity/lib/qureries';

export default function SearchBar() {
  const [search, setSearch] = useState("");
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

  const [results, setResults] = useState<Car[]>([]);

  const handleSearch = async () => {
    const query = searchCarsQuery(search, carType, seating, price);
    const results = await client.fetch(query, { search, carType, seating, price });
    setResults(results);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search cars..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <input
        type="text"
        placeholder="Car type..."
        value={carType}
        onChange={(e) => setCarType(e.target.value)}
      />
      <input
        type="text"
        placeholder="Seating capacity..."
        value={seating}
        onChange={(e) => setSeating(e.target.value)}
      />
      <input
        type="text"
        placeholder="Max price..."
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {results.map((car, index) => (
          <div key={index}>
            <h3>{car.name}</h3>
            <p>Price per day: ${car.pricePerDay}</p>
            <p>Transmission: {car.transmission}</p>
            <p>Fuel capacity: {car.fuelCapacity}L</p>
            <p>Seating capacity: {car.seatingCapacity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}