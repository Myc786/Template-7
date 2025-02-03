"use client";

import { client } from "@/sanity/lib/client";
import { allCarsQuery } from "@/sanity/lib/qureries";
import type { Car } from "@/types/Car";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "../Product/ProductCard";

const CategoryPage = () => {
  const searchParams = useSearchParams();
  const categoryTag = searchParams.get("tag") || "all";
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [carTypes, setCarTypes] = useState<string[]>([]);
  const [seatingCapacities, setSeatingCapacities] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [applyFilters, setApplyFilters] = useState(false);

  useEffect(() => {
    async function fetchCars() {
      const fetchedCars: Car[] = await client.fetch(allCarsQuery);
      let categoryFiltered = categoryTag !== "all" ? fetchedCars.filter(car => car.tags.includes(categoryTag)) : fetchedCars;
      setCars(categoryFiltered);
      setFilteredCars(categoryFiltered);
    }
    fetchCars();
  }, [categoryTag]);

  useEffect(() => {
    if (applyFilters) {
      let newFilteredCars = cars.filter(car => 
        (selectedBrands.length === 0 || selectedBrands.includes(car._type)) &&
        (carTypes.length === 0 || carTypes.includes(car.type)) &&
        (seatingCapacities.length === 0 || seatingCapacities.includes(car.seatingCapacity)) &&
        Number(car.price) >= priceRange[0] && Number(car.price) <= priceRange[1]
      );
      setFilteredCars(newFilteredCars);
      setApplyFilters(false);
    }
  }, [applyFilters, cars, priceRange, selectedBrands, carTypes, seatingCapacities]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };

  const handleCarTypeChange = (type: string) => {
    setCarTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  const handleSeatingChange = (seats: number) => {
    setSeatingCapacities(prev => prev.includes(seats) ? prev.filter(s => s !== seats) : [...prev, seats]);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange([0, parseInt(event.target.value)]);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex">
      {/* Sidebar Filter */}
      <aside className="w-1/4  border-r bg-white rounded max-h-auto p-7">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        {/* Brand Filter */}
        <div className="mb-4">
          <h3 className="font-medium">Brand</h3>
          {["Toyota", "Honda", "Ford", "BMW"].map((brand) => (
            <div key={brand} className="flex items-center mt-2">
              <input type="checkbox" id={brand} checked={selectedBrands.includes(brand)} onChange={() => handleBrandChange(brand)} className="mr-2" />
              <label htmlFor={brand}>{brand}</label>
            </div>
          ))}
        </div>
        {/* Car Type Filter */}
        <div className="mb-4">
          <h3 className="font-medium">Car Type</h3>
          {["Sport", "SUV", "Sedan", "Hatchback", "Coupe"].map((type) => (
            <div key={type} className="flex items-center mt-2">
              <input type="checkbox" id={type} checked={carTypes.includes(type)} onChange={() => handleCarTypeChange(type)} className="mr-2" />
              <label htmlFor={type}>{type}</label>
            </div>
          ))}
        </div>
        {/* Seating Capacity Filter */}
        <div className="mb-4">
          <h3 className="font-medium">Seating Capacity</h3>
          {[2, 4, 5, 7].map((seats) => (
            <div key={seats} className="flex items-center mt-2">
              <input type="checkbox" id={`${seats}seats`} checked={seatingCapacities.includes(seats)} onChange={() => handleSeatingChange(seats)} className="mr-2" />
              <label htmlFor={`${seats}seats`}>{seats} Seats</label>
            </div>
          ))}
        </div>
        {/* Price Range Filter */}
        <div>
          <h3 className="font-medium">Price Range</h3>
          <input type="range" min="0" max="1000" value={priceRange[1]} onChange={handlePriceChange} className="w-full" />
          <p>Max Price: ${priceRange[1]}</p>
        </div>
        {/* Apply Filters Button */}
        <button 
          onClick={() => setApplyFilters(true)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 w-full"
        >
          Apply Filters
        </button>
      </aside>
      
      {/* Cars List */}
      <div className="w-3/4 pl-5">
        <h1 className="text-3xl font-bold mb-6 capitalize">{categoryTag} Cars</h1>
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <ProductCard key={car._id} car={car} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No cars found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
