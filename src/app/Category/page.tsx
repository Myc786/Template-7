"use client";

import { client } from "@/sanity/lib/client";
import { allCarsQuery } from "@/sanity/lib/qureries";
import type { Car } from "@/types/Car";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "../Product/ProductCard";

function CategoryContent() {
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
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Section */}
        <div className="w-full md:w-1/4 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          <div className="space-y-4">
            {/* Brand Filter */}
            <div>
              <h3 className="font-semibold mb-2">Brands</h3>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                {["Toyota", "Honda", "Ford", "BMW"].map((brand) => (
                  <div key={brand} className="flex items-center">
                    <input type="checkbox" id={brand} checked={selectedBrands.includes(brand)} onChange={() => handleBrandChange(brand)} className="mr-2" />
                    <label htmlFor={brand}>{brand}</label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Car Type Filter */}
            <div>
              <h3 className="font-semibold mb-2">Car Types</h3>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                {["Sport", "SUV", "Sedan", "Hatchback", "Coupe"].map((type) => (
                  <div key={type} className="flex items-center">
                    <input type="checkbox" id={type} checked={carTypes.includes(type)} onChange={() => handleCarTypeChange(type)} className="mr-2" />
                    <label htmlFor={type}>{type}</label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Range Filter */}
            <div>
              <h3 className="font-semibold mb-2">Price Range</h3>
              <input type="range" min="0" max="1000" value={priceRange[1]} onChange={handlePriceChange} className="w-full" />
              <p>Max Price: ${priceRange[1]}</p>
            </div>
          </div>
          {/* Apply Filters Button */}
          <button 
            onClick={() => setApplyFilters(true)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 w-full"
          >
            Apply Filters
          </button>
        </div>

        {/* Cars Grid Section */}
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCars.map((car) => (
              <ProductCard key={car._id} car={car} />
            ))}
          </div>
          
          {filteredCars.length === 0 && (
            <div className="text-center text-gray-500 mt-10">
              No cars found matching your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CategoryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryContent />
    </Suspense>
  );
}
