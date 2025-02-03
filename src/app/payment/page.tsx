"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Car } from "@/types/Car"; // Import the interface

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pickupLocation: "",
    pickupDate: "",
    pickupTime: "",
    dropOffLocation: "",
    dropOffDate: "",
    dropOffTime: "",
    cardNumber: "",
    expirationDate: "",
    cvc: "",
    paymentMethod: "creditCard",
    termsAccepted: false,
  });

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const carId = "1"; // Replace with dynamic ID if available

  // Fetch car data from API
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch(`/Product/${carId}`);
        if (!response.ok) throw new Error("Failed to fetch car data");
        const data: Car = await response.json();
        console.log("Fetched Car Data:", data);
        setCar(data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCarData();
  }, [carId]);

  const handleInputChange = (e: { target: { name: string; value: string; type: string; checked: boolean } }) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }
    console.log("Form Data:", formData);
    router.push("/payment-success");
  };

  if (loading) {
    return <p>Loading car details...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Complete Your Rental</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Billing Info */}
        <div className="md:col-span-2 bg-gray-100 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Billing Info</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} className="border p-2 rounded" />
            <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} className="border p-2 rounded" />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} className="border p-2 rounded" />
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} className="border p-2 rounded" />
          </div>

          {/* Rental Info */}
          <h2 className="text-lg font-semibold mb-4">Rental Info</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <input type="text" name="pickupLocation" placeholder="Pick-Up Location" value={formData.pickupLocation} onChange={handleInputChange} className="border p-2 rounded" />
            <input type="date" name="pickupDate" value={formData.pickupDate} onChange={handleInputChange} className="border p-2 rounded" />
            <input type="time" name="pickupTime" value={formData.pickupTime} onChange={handleInputChange} className="border p-2 rounded" />
            <input type="text" name="dropOffLocation" placeholder="Drop-Off Location" value={formData.dropOffLocation} onChange={handleInputChange} className="border p-2 rounded" />
            <input type="date" name="dropOffDate" value={formData.dropOffDate} onChange={handleInputChange} className="border p-2 rounded" />
            <input type="time" name="dropOffTime" value={formData.dropOffTime} onChange={handleInputChange} className="border p-2 rounded" />
          </div>

          {/* Payment Method */}
          <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <input type="radio" name="paymentMethod" value="creditCard" checked={formData.paymentMethod === "creditCard"} onChange={handleInputChange} className="mr-2" />
              <label>Credit Card</label>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleInputChange} className="border p-2 rounded" />
              <input type="text" name="expirationDate" placeholder="MM/YY" value={formData.expirationDate} onChange={handleInputChange} className="border p-2 rounded" />
              <input type="text" name="cvc" placeholder="CVC" value={formData.cvc} onChange={handleInputChange} className="border p-2 rounded" />
            </div>
          </div>
        </div>

        {/* Rental Summary */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Rental Summary</h2>
          
          {car ? (
            <>
              <div className="flex justify-between mb-2">
                <span>Car:</span>
                <span>{car._id}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Make:</span>
                <span>{car.category}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Fuel Type:</span>
                <span>{car.fuelType}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Seating Capacity:</span>
                <span>{car.seatingCapacity} Persons</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Transmission:</span>
                <span>{car.transmission}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Price per day:</span>
                <span>${car.pricePerDay}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Total:</span>
                <span>${car.pricePerDay}</span>
              </div>
            </>
          ) : (
            <p>No car details available.</p>
          )}

          <div className="mt-6">
            <label className="flex items-center">
              <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleInputChange} className="mr-2" />
              I agree to the terms and conditions.
            </label>
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg mt-4 hover:bg-blue-600">
            Rent Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentPage;