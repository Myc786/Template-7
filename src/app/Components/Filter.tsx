// Filters.tsx
import React from "react";

interface FiltersProps {
  filters: {
    fuelType: string[];
    transmission: string[];
    seatingCapacity: string[];
    carType: string[];
    minPrice: number;
    maxPrice: number;
  };
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  applyFilters: () => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, handleCheckboxChange, handlePriceChange, applyFilters }) => {
  return (
    <div className="w-full bg-white p-3 rounded-lg">
      <div className="space-y-6">
        {/* Fuel Type Filter */}
        <div className="filter-section">
          <label className="block font-semibold mb-3 text-gray-700">Fuel Type</label>
          <div className="space-y-2">
            {["Petrol", "Diesel", "Electric"].map((type) => (
              <div key={type} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="fuelType"
                  value={type}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-blue-500"
                />
                <span className="text-gray-600">{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Transmission Filter */}
        <div className="filter-section">
          <label className="block font-semibold mb-3 text-gray-700">Transmission</label>
          <div className="space-y-2">
            {["Automatic", "Manual"].map((type) => (
              <div key={type} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="transmission"
                  value={type}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-blue-500"
                />
                <span className="text-gray-600">{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Seating Capacity Filter */}
        <div className="filter-section">
          <label className="block font-semibold mb-3 text-gray-700">Seating Capacity</label>
          <div className="space-y-2">
            {["2", "5", "7"].map((capacity) => (
              <div key={capacity} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="seatingCapacity"
                  value={capacity}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-blue-500"
                />
                <span className="text-gray-600">{capacity} Seats</span>
              </div>
            ))}
          </div>
        </div>

        {/* Car Type Filter */}
        <div className="filter-section">
          <label className="block font-semibold mb-3 text-gray-700">Car Type</label>
          <div className="space-y-2">
            {["SUV", "Sedan", "Hatchback", "Coupe", "Convertible"].map((type) => (
              <div key={type} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="carType"
                  value={type}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-blue-500"
                />
                <span className="text-gray-600">{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="filter-section">
          <label className="block font-semibold mb-3 text-gray-700">Price Range</label>
          <div className="flex flex-col gap-3">
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handlePriceChange}
              placeholder="Min Price"
              className="px-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handlePriceChange}
              placeholder="Max Price"
              className="px-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <button
        onClick={applyFilters}
        className="mt-6 w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;
