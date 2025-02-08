"use client";

import { useParams } from "next/navigation";
import { Key, useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { FaGasPump, FaCogs, FaUserFriends } from "react-icons/fa";
import type { Car } from "@/types/Car";
import Image from "next/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { useRouter } from "next/navigation";

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [relatedCars, setRelatedCars] = useState<Car[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [reviewText, setReviewText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const router = useRouter();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Mobile view adjustments
      } else {
        // Desktop view adjustments
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (!id) return;

    const fetchCar = async () => {
      try {
        const carData = await client.fetch(`*[_type == "car" && _id == $id][0]`, { id });
        if (!carData) {
          setError("Car not found.");
          return;
        }
        setCar(carData);
        setMainImage(urlFor(carData.image).url()); // Set first image as main
      } catch (err) {
        setError("Failed to fetch car details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedCars = async () => {
      try {
        const relatedCarsData = await client.fetch(`*[_type == "car" && _id != $id][0...8]`, { id });
        setRelatedCars(relatedCarsData);
      } catch (err) {
        setError("Failed to fetch related cars. Please try again.");
      }
    };

    fetchCar();
    fetchRelatedCars();
  }, [id]);

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  function handleSubmitReview(event: React.MouseEvent<HTMLButtonElement>): void {
    throw new Error("Function not implemented.");
  }

  const handleRentNow = () => {
    // Directly redirect to payment page
    if (car) {
      router.push(`/payment?id=${car._id}`);
    }

  };

  return (
    <div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow mb-6 md:mb-0">
      <h2 className="text-lg font-semibold md:hidden">Filter</h2>
      <details className="md:hidden">
        <summary className="cursor-pointer text-gray-700 font-semibold">Filters</summary>
        <div className="mt-4">
        {/* Car Type Filter */}
        <div className="mt-4">
          <h3 className="text-gray-700 font-semibold">Car Type</h3>
          <div className="mt-2 space-y-1">
          {["Sport", "SUV", "Sedan", "Hatchback", "Coupe"].map((type) => (
            <label key={type} className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-purple-600" />
            <span className="text-gray-700">{type}</span>
            </label>
          ))}
          </div>
        </div>

        {/* Seating Capacity */}
        <div className="mt-4">
          <h3 className="text-gray-700 font-semibold">Seats</h3>
          <div className="mt-2 space-y-1">
          {[2, 4, 5, 7].map((seats) => (
            <label key={seats} className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-purple-600" />
            <span className="text-gray-700">{seats} Seats</span>
            </label>
          ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mt-4">
          <h3 className="text-gray-700 font-semibold">Max Price ($)</h3>
          <input type="range" min="50" max="500" className="w-full mt-2" />
        </div>
        </div>
      </details>
      <div className="hidden md:block">
        <h2 className="text-lg font-semibold">Filter</h2>
        {/* Car Type Filter */}
        <div className="mt-4">
        <h3 className="text-gray-700 font-semibold">Car Type</h3>
        <div className="mt-2 space-y-1">
          {["Sport", "SUV", "Sedan", "Hatchback", "Coupe"].map((type) => (
          <label key={type} className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-purple-600" />
            <span className="text-gray-700">{type}</span>
          </label>
          ))}
        </div>
        </div>

        {/* Seating Capacity */}
        <div className="mt-4">
        <h3 className="text-gray-700 font-semibold">Seats</h3>
        <div className="mt-2 space-y-1">
          {[2, 4, 5, 7].map((seats) => (
          <label key={seats} className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-purple-600" />
            <span className="text-gray-700">{seats} Seats</span>
          </label>
          ))}
        </div>
        </div>

        {/* Price Range */}
        <div className="mt-4">
        <h3 className="text-gray-700 font-semibold">Max Price ($)</h3>
        <input type="range" min="50" max="500" className="w-full mt-2" />
        </div>
      </div>
      </aside>

      {/* Car Details */}
      <main className="w-full md:w-3/4">
      {/* Hero Section */}
      <section className="bg-white text-white p-6 rounded-xl flex flex-col md:flex-row gap-3 items-center">
        <Image
        src={mainImage || "/car-placeholder.jpg"}
        alt={typeof car?.title === 'string' ? car.title : "Car Image"}
        width={400}
        height={250}
        className="rounded-lg w-full md:w-auto"
        />
        <div className="flex flex-col gap-2 w-full md:w-1/2">
        <h1 className="text-2xl text-gray-700 font-bold">{car?.name || "Loading..."}</h1>
        <p className="text-gray-600 mt-2">{car?._type || "Loading..."}</p>
        <p className="text-gray-500 mt-2 text-center md:text-left">The Toyota Corolla 2023 is a stylish and fuel-efficient sedan, perfect for city drives and long road trips. With a sleek design, spacious interior, and advanced safety features, this car offers a smooth and enjoyable ride for any occasion. </p>
        <h1 className="text-gray-500 font-semibold text-2xl">{car?.pricePerDay}</h1>
        <button
          onClick={handleRentNow}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Rent Now
        </button>
        </div>
      </section>

      {/* Feature Images */}
      {car?.image.length ? (
        <section className="flex space-x-4 mt-4">
        {car.image.map((image: SanityImageSource, index: Key | null | undefined) => (
          <Image
          key={index}
          src={mainImage || "/car-placeholder.jpg"}
          alt={typeof car?.title === 'string' ? car.title : "Car Image"}
          width={100}
          height={70}
          className="cursor-pointer rounded-md shadow-md hover:scale-105 transition"
          onClick={() => setMainImage(urlFor(image).url())}
          />
        ))}
        </section>
      ) : (
        <p className="text-center mt-4">No feature images available.</p>
      )}

      {/* Reviews Section */}
      <section className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-lg font-semibold">Reviews</h2>
        <div className="mt-4 space-y-4">
        {/* Replace with dynamic reviews */}
        <div className="border-b pb-4">
          <p className="font-semibold">Alex Stanton</p>
          <p className="text-gray-500">Great experience with this car! Smooth drive and good mileage.</p>
        </div>
        <div>
          <p className="font-semibold">Skylar Diaz</p>
          <p className="text-gray-500">Highly recommend for road trips! Comfortable and stylish.</p>
        </div>
        </div>
        {/* Review Form */}
        <div className="mt-6">
        <h3 className="text-lg font-semibold">Write a Review</h3>
        <h1>name</h1>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full p-4 mt-2 border border-gray-300 rounded-lg"
          placeholder="Write your review here..."
        />
        <div className="mt-2">
          <span className="text-gray-500">Rating: </span>
          {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`text-2xl text-yellow-400 ${star <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            ★
          </button>
          ))}
        </div>
        <button
          onClick={handleSubmitReview}
          className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg"
        >
          Submit Review
        </button>
        </div>
      </section>

      {/* Related Cars */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold">Related Cars</h2>
        <div className="grid grid-cols-1 p-5 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {relatedCars.map((car) => (
          <div key={car._id} className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold">{car.name}</h3>
          <p className="text-sm text-gray-500">{car.type}</p>
          <Image
            src={urlFor(car.image).url()}
            alt={car.name}
            width={300}
            height={200}
            className="rounded-lg"
          />
          <div className="flex flex-row gap-2 py-8">
            <span className="flex items-center gap-1">
            <FaGasPump className="text-blue-500" /> {car.fuelCapacity}
            </span>
            <span className="flex items-center gap-1">
            <FaCogs className="text-green-500" /> {car.transmission}
            </span>
            <span className="flex items-center gap-1">
            <FaUserFriends className="text-red-500" /> {car.seatingCapacity}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-lg font-bold">{car.pricePerDay}/day</p>
            <button
            onClick={handleRentNow}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
            Rent Now
            </button>
          </div>
          </div>
        ))}
        </div>
      </section>
      </main>
    </div>
  );
};

export default CarDetail;