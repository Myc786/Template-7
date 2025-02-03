"use client";
import { client } from "@/sanity/lib/client";
import { allCarsQuery } from "@/sanity/lib/qureries";
import type { Car } from "@/types/Car";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "../Product/ProductCard";

const Car = () => {
  const router = useRouter();
  const [Cars, setCars] = useState<Car[]>([]);
  const [showMorePopular, setShowMorePopular] = useState(false);
  const [showMoreRecommended, setShowMoreRecommended] = useState(false);

  // Number of cars to show initially
  const INITIAL_CARS_DISPLAY = 8;

  useEffect(() => {
    async function fetchCars() {
      const fetchCars: Car[] = await client.fetch(allCarsQuery);
      setCars(fetchCars);
    }
    fetchCars();
  }, []);

  const navigateToCategory = (tag: string) => {
    router.push(`/Category?tag=${tag}`);
  };

  // Function to render cars with show more/less logic
  const renderCarSection = (
    tag: string, 
    showMore: boolean, 
    toggleShowMore: () => void
  ) => {
    const filteredCars = Cars.filter((Car) => Car.tags.includes(tag));
    const displayCars = showMore 
      ? filteredCars 
      : filteredCars.slice(0, INITIAL_CARS_DISPLAY);

    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">
            {tag === 'popular' ? 'Popular Cars' : 'Recommended Cars'}
          </h2>
          {filteredCars.length > INITIAL_CARS_DISPLAY && (
            <button
              onClick={() => navigateToCategory(tag)}
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full 
                         hover:bg-blue-100 transition-colors duration-300 
                         flex items-center space-x-2"
            >
              {showMore ? 'Show Less' : `View All (${filteredCars.length})`}
            </button>
          )}
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 
                         ${tag === 'recommended' ? 'place-items-center' : ''}`}>
          {displayCars.map((Car) => (
            <ProductCard key={Car._id} car={Car} />
          ))}
        </div>
        {tag === 'recommended' && filteredCars.length > INITIAL_CARS_DISPLAY && !showMore && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => navigateToCategory(tag)}
              className="px-6 py-3 bg-blue-600 text-white rounded-full 
                         hover:bg-blue-700 transition-colors duration-300 
                         flex items-center space-x-2"
            >
              show more ({filteredCars.length})
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {renderCarSection('popular', showMorePopular, () => setShowMorePopular(!showMorePopular))}
      {renderCarSection('recommended', showMoreRecommended, () => setShowMoreRecommended(!showMoreRecommended))}
    </div>
  );
};

export default Car;
