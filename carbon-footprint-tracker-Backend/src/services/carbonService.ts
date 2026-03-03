import Vehicle from "../models/vehicle.model";
import Fuel from "../models/fuel.model";

const MAX_EMISSION_THRESHOLD=20;

function normalize(score:number):number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

export async function calculateRouteMetrics(vehicleId:string,distance:number) {
  if(!Number.isFinite(distance) || distance<0){
    throw new Error("Invalid distance");
  }
  const vehicle=await Vehicle.findById(vehicleId);
  if(!vehicle){
    throw new Error("Vehicle not found");
  }

  const fuel=await Fuel.findById(vehicle.fuel);
  if(!fuel){
    throw new Error("Fuel not found");
  }
  let emissionFactor=0;
  if(vehicle.isElectric){
    if(vehicle.energyConsumption===undefined || vehicle.energyConsumption===null){
    throw new Error("Energy consumption not found");
   }
    emissionFactor=(vehicle.energyConsumption || 0)*fuel.co2PerUnit;
  } else {
    if (vehicle.mileage===undefined || vehicle.mileage===null){
    throw new Error("Mileage not found");
  }
    emissionFactor=fuel.co2PerUnit /vehicle.mileage;
  }

  const carbonEmission=Number((distance*emissionFactor).toFixed(2));

  const rawScore=100-(carbonEmission / MAX_EMISSION_THRESHOLD)*100;
  const greenScore=normalize(rawScore);

  return { carbonEmission, greenScore,isEcoFriendly:greenScore>=70,
  };
}