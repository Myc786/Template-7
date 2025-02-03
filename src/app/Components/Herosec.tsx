import Image from "next/image";
import car1 from "./public/car1.png"
import car2 from "./public/car2.png"
const Hero = () => {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-8 bg-white">
        {/* Card 1 */}
        <div className="bg-blue-500 text-white rounded-lg p-6 flex flex-col justify-between shadow-lg">
          <div>
            <h2 className="text-3xl font-bold mb-4">The Best Platform for Car Rental</h2>
            <p className="text-lg mb-6">
              Ease of doing a car rental safely and reliably. Of course at a low price.
            </p>
            <button className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100">
              Rental Car
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <Image
              src={car1}
              alt="Car Rental"
              className="w-full max-w-xs"
              width={406} height={116}
            />
          </div>
        </div>
  
        {/* Card 2 */}
        <div className="bg-blue-600 text-white rounded-lg p-6 flex flex-col justify-between shadow-lg">
          <div>
            <h2 className="text-3xl font-bold mb-4">Easy way to rent a car at a low price</h2>
            <p className="text-lg mb-6">
              Providing cheap car rental services and safe and comfortable facilities.
            </p>
            <button className="bg-white text-purple-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100">
              Rental Car
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <Image
              src={car2}
              alt="Cheap Car Rental"
              className="w-full max-w-xs"
              width={340} height={108}
            />
          </div>
        </div>
      </section>
    );
  };
  
  export default Hero;
  