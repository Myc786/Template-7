"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PaymentSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [carId, setCarId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get("carId");
    setCarId(id);

    if (!id) {
      setError("Error: Car ID is missing. Please contact support.");
    }

    console.log("carId:", id);
    console.log("Current URL:", window.location.href);
  }, [searchParams]);

  const goToTrackingPage = () => {
    if (carId) {
      console.log("Redirecting to tracking page with carId:", carId);
      router.push(`/tracking/${carId}`);
    } else {
      console.error("carId is not available");
      setError("Car ID is missing. Unable to track your car.");
    }
  };

  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-semibold mb-4">Payment Successful!</h1>
      <p className="text-lg text-gray-600 mb-6">
        Thank you for your payment. Your transaction has been processed.
      </p>

      {error && (
        <div className="text-red-500 text-lg font-semibold mb-4">
          {error}
        </div>
      )}

      <button
        onClick={goToTrackingPage}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 mb-4"
        disabled={!carId} // Disable button if carId is missing
      >
        Track Your Car
      </button>

      <br />

      <button
        onClick={() => router.push("/")}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
      >
        Go to Home
      </button>
    </div>
  );
};

export default PaymentSuccess;
