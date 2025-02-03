import { useRouter } from 'next/router';

const PaymentSuccess = () => {
  const router = useRouter();
  const { carId } = router.query; // Assume carId is passed in the query string or obtained from your state or API

  const goToTrackingPage = () => {
    if (carId) {
      // Redirect to the tracking page of the rented car
      router.push(`/tracking/${carId}`);
    }
  };

  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-semibold mb-4">Payment Successful!</h1>
      <p className="text-lg text-gray-600 mb-6">Thank you for your payment. Your transaction has been processed.</p>
      
      <button
        onClick={goToTrackingPage}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 mb-4"
      >
        Track Your Car
      </button>

      <br />

      <button
        onClick={() => window.location.href = "/"}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
      >
        Go to Home
      </button>
    </div>
  );
};

export default PaymentSuccess;
