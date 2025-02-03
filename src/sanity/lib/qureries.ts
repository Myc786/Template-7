import { groq } from "next-sanity";

export const allCarsQuery = groq`*[_type == "car"]{
  ...,
  category
}`;
export const six = groq`*[_type == "car"][0...5]`
export const popularCarsQuery = groq`*[_type == "car"]`;
export const carQuery = `*[_type == "car" && _id == $carId][0]`;
export const searchCarsQuery = (search: string, carType: string, seating: string, price: string) => groq`
  *[_type == "car" 
    && (!defined($search) || name match $search + "*") 
    && (!defined($carType) || type == $carType) 
    && (!defined($seating) || seatingCapacity == $seating) 
    && (!defined($price) || pricePerDay <= $price)
  ]{
    pricePerDay,
    transmission,
    _ref,
    fuelCapacity,
    seatingCapacity
  }`;
