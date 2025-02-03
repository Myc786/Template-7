import { ReactNode } from "react";
import { Trans } from "react-i18next";

// Updated Car interface with ReactNode and Trans for i18next
export interface Car {
  gallery: any;
  featureImages: any;
  price: ReactNode | Iterable<ReactNode>;
  title: ReactNode | Iterable<ReactNode>;
  additionalImages: any;
  description: ReactNode | Iterable<ReactNode> | JSX.Element; // Allow JSX elements (for Trans or other components)
  fuelType: any;
  _id: string;
  _type: string;
  name: string;
  make: string;
  image: any;
  pricePerDay: number;
  seatingCapacity: number;
  fuelCapacity: string;
  type: string;
  transmission: string;
  tags: any;
  category: string;
  location?: string;
}
