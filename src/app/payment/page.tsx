"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Car } from "@/types/Car";
import useAuth from "@/hooks/useAuth";
import React, { Suspense } from "react";

const CheckoutPage = () => {
  const { user } = useAuth();
  const [car, setCar] = useState<Car | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();

  const SearchParamsWrapper = () => {
    const searchParams = useSearchParams();
    const carId = searchParams.get("id");

    return { carId };
  };

  return (
    <Suspense fallback={<div>Loading search params...</div>}>
      <InnerCheckoutPage />
    </Suspense>
  );

  function InnerCheckoutPage() {
    const { carId } = SearchParamsWrapper();

    useEffect(() => {
      if (!user) {
        router.push("/login"); // Redirect to login if not authenticated
      }

      if (!carId) {
        setError("No car ID provided. Please select a car first.");
        setLoading(false);
        return;
      }

      const fetchCar = async () => {
        try {
          const carData = await client.fetch("*[_type == \"car\" && _id == $id][0]", { id: carId });
          if (!carData) {
            setError("No car found with the specified ID.");
          } else {
            setCar(carData);
          }
        } catch (err) {
          setError("Failed to fetch car details.");
        } finally {
          setLoading(false);
        }
      };

      fetchCar();
    }, [carId, user, router]);

    const handleIncreaseQuantity = () => setQuantity((prev) => prev + 1);
    const handleDecreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const handlePayment = () => {
      if (!carId) {
        setError("Car ID is missing. Please select a car first.");
        return;
      }

      alert("Payment processed successfully!");
      router.push(`/payment-success?carId=${carId}`);
    };

    if (loading) return <div className="text-center text-gray-500">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col md:flex-row gap-6">
        {/* Car Details Section */}
        <div className="w-full md:w-1/2 space-y-4">
          {car && (
            <div className="flex flex-col">
              <Image 
                src={urlFor(car.image).url()} 
                alt={car.name} 
                width={500} 
                height={300} 
                className="w-full h-auto object-cover rounded-lg"
              />
              <div className="mt-4">
                <h2 className="text-2xl font-bold">{car.name}</h2>
                <p className="text-gray-600">Price: ${car.pricePerDay}</p>
              </div>
            </div>
          )}
        </div>

        {/* Payment Form Section */}
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-2xl font-bold mb-4">Checkout</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="First Name" 
              className="w-full p-2 border rounded"
            />
            <input 
              type="text" 
              placeholder="Last Name" 
              className="w-full p-2 border rounded"
            />
            <input 
              type="text" 
              placeholder="Phone Number" 
              className="w-full p-2 border rounded"
            />
            <input 
              type="text" 
              placeholder="Address" 
              className="w-full p-2 border rounded"
            />
            <input 
              type="text" 
              placeholder="Town/City" 
              className="w-full p-2 border rounded"
            />
          </div>
          <h3 className="font-semibold">Pick-Up</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="Location" className="w-full p-2 border rounded" />
            <input type="date" className="w-full p-2 border rounded" />
            <input type="time" className="w-full p-2 border rounded" />
          </div>
          <h3 className="font-semibold mt-4">Drop-Off</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="Location" className="w-full p-2 border rounded" />
            <input type="date" className="w-full p-2 border rounded" />
            <input type="time" className="w-full p-2 border rounded" />
          </div>
          <h2 className="text-xl font-bold mb-4">Payment Method</h2>
          <div className="space-y-2">
            <div className="flex flex-row gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" value="card" className="w-4 h-4" /> Credit Card
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" value="paypal" className="w-4 h-4" /> PayPal
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" value="bitcoin" className="w-4 h-4" /> Bitcoin
              </label>
            </div>
            <input type="text" placeholder="Card Number" className="w-full p-2 border rounded" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Expiration Date" className="w-full p-2 border rounded" />
              <input type="text" placeholder="CVC" className="w-full p-2 border rounded" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <button 
              className="w-full md:w-auto bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Complete Payment
            </button>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <button onClick={handleDecreaseQuantity} className="px-3 py-1 bg-gray-300 rounded-lg hover:bg-gray-400">-</button>
            <span>{quantity}</span>
            <button onClick={handleIncreaseQuantity} className="px-3 py-1 bg-gray-300 rounded-lg hover:bg-gray-400">+</button>
          </div>
          <p className="text-gray-700 font-bold">Subtotal: ${car?.pricePerDay ? car.pricePerDay * quantity : 0}</p>
          <p className="text-gray-700 font-bold">Total: ${car?.pricePerDay ? car.pricePerDay * quantity : 0}</p>
        </div>
      </div>
    );
  }
};

export default CheckoutPage;
