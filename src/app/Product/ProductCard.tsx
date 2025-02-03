import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaGasPump, FaCogs, FaUserFriends } from "react-icons/fa";
import { urlFor } from "@/sanity/lib/image";
import type { Car } from "@/types/Car";

interface ProductCardProps {
  car: Car;
}

const ProductCard: React.FC<ProductCardProps> = ({ car }) => {
  const router = useRouter();

  return (
    <div
      key={car._id}
      className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition bg-white duration-200 
                 flex flex-col gap-4 w-full h-full min-h-[400px] max-w-[300px]"
    >
      {/* Car Name and Type */}
      <div className="flex flex-col">
        <h3 className="text-lg font-bold">{car.name}</h3>
        <p className="text-sm text-gray-500">{car.type}</p>
      </div>

      {/* Car Image */}
      {car.image && (
        <div className="relative w-full h-44 bg-white">
          <Image
            src={urlFor(car.image).url() as string}
            alt={car.name}
            width={300}
            height={200}
            className="rounded-lg object-contain"
          />
        </div>
      )}

      {/* Car Details */}
      <div className="flex flex-wrap gap-4 my-1 text-sm text-gray-600 items-center">
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

      {/* Price and Action Button */}
      <div className="flex justify-between items-center mt-2">
        <p className="text-lg font-bold">{car.pricePerDay}/day</p>
        <button
          onClick={() => router.push(`/Product/${car._id}`)} // ✅ FIXED
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Rent Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
