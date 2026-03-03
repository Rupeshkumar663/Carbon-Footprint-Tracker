
export type VehicleCategory =| "road"| "rail"| "air";

export type FuelUnit =| "liter"| "kWh";

export interface CarbonCalculationInput {
  vehicleId: string;
  distance: number;
  startLocation: string;
  endLocation: string;
}

export interface CarbonCalculationResult {
  carbonEmission: number;
  greenScore: number;
  isEcoFriendly: boolean;
}

export interface CreateRouteInput {
  vehicleId: string;
  distance: number;
  startLocation: string;
  endLocation: string;
  duration?: number;
}

export interface RouteResponse
  extends CarbonCalculationResult {
  _id: string;
  vehicleId: string;
  distance: number;
  startLocation: string;
  endLocation: string;
  duration?: number;
  createdAt: string;
}