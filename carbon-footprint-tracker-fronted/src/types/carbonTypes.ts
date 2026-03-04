export interface CarbonInput {
  vehicleId: string;
  distance: number;
  startLocation: string;
  endLocation: string;
  duration?: number;
}

export interface CarbonResult {
  _id: string;
  carbonEmission: number;
  greenScore: number;
  isEcoFriendly: boolean;
  vehicle: string;
  distance: number;
  startLocation: string;
  endLocation: string;
  duration?: number;
  createdAt: string;
}

export interface CarbonState {
  status: "idle" | "loading" | "succeeded" | "failed";
  result: CarbonResult | null;
  error: string | null;
}

export interface Vehicle {
  _id: string;
  name: string;
  category: "road" | "rail" | "air";
  fuel: string;
  mileage?: number;
  energyConsumption?: number;
  isElectric: boolean;
  isActive: boolean;
}

export interface VehicleState {
  list: Vehicle[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}