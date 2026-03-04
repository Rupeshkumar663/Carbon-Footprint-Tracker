import mongoose, { Schema, Model } from "mongoose";
import type { VehicleCategory } from "../types/carbonType";

export interface IVehicle extends mongoose.Document {
  name: string;              // Car, Metro
  category: VehicleCategory;
  fuel: mongoose.Schema.Types.ObjectId;
  mileage?: number;
  energyConsumption?: number;
  isElectric: boolean;
  isActive: boolean;
}

const vehicleSchema = new Schema<IVehicle>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      enum: ["road", "rail", "air"],
      required: true,
    },

    fuel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fuel",
      required: true,
    },

    mileage: {
      type: Number,
      min: 0
    },

    energyConsumption: {
      type: Number,
      min: 0
    },

    isElectric: {
      type: Boolean,
      default: false
    },

    isActive: {
      type: Boolean,
      default: true
    },
  },
  { timestamps: true }
);

const Vehicle: Model<IVehicle> = mongoose.model<IVehicle>("Vehicle", vehicleSchema);

export default Vehicle;