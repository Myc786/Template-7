export interface CarTrackingData {
  carId: string;
  currentLocation: {
    latitude: number;
    longitude: number;
    timestamp: string;
  };
  speed?: number;
  direction?: string;
  batteryLevel?: number;
  isMoving?: boolean;
  status?: string;
}