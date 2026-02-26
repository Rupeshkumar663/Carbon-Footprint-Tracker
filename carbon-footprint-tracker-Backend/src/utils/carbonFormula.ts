
export type TransportType=|"car"|"bike"|"bus"|"train"|"walk"|"cycle";
/* Emission Factors (kg CO₂ per km) */
const EMISSION_FACTOR:Record<TransportType,number>={
  car:0.12,
  bike:0.05,
  bus:0.08,
  train:0.04,
  walk:0,
  cycle:0,
};

/* Calculate Carbon Emission */
export function calculateCarbonEmission(transportType:TransportType,distance:number):number{
  if(distance<0) {
    throw new Error("Distance cannot be negative");
  }

  const factor=EMISSION_FACTOR[transportType];
  const emission=factor*distance;
  return Number(emission.toFixed(2));
}