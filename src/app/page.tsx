import Image from "next/image";
import Hero from "./Components/Herosec";
import BookingSection from "./Components/Booking";
import CarCard from "./Components/CarCard";

export default function Home() {
  return (
   <div>
    <Hero/>
    <BookingSection/>
    <CarCard/>
   </div>
  );
}
