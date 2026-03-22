import axios from "axios";
const cache=new Map<string,any>();

const normalizeInput=(data:any)=>({
  ...data,
  distance: Number(data.distance),
  mileage: Number(data.mileage),
  speed: Number(data.speed),
  traffic_level: Number(data.traffic_level),
  vehicle_load: Number(data.vehicle_load),
  elevation_gain: Number(data.elevation_gain),
  engine_cc: Number(data.engine_cc),
  fuel_type: Number(data.fuel_type)
});

const fallbackCarbon=(data:any)=>{
  if(data.fuel_type===2){
    const carbon=data.distance * 0.05;
    return {carbon_emission: Number(carbon.toFixed(2)),source:"fallback_electric"};
  }
  const fuelUsed=data.distance/(data.mileage || 15);
  let factor=2.31; 
  if(data.fuel_type===1) 
      factor=2.68; 
  if(data.fuel_type===3)
      factor=2.0;
  let carbon=fuelUsed*factor;
  carbon+=data.traffic_level * 0.2;
  carbon+=data.vehicle_load * 0.1;
  carbon+=data.elevation_gain * 0.0005;
  return {carbon_emission: Number(carbon.toFixed(2)),source:"fallback"};
 };

 export const predictCarbon=async(data:any)=>{
  try {
    const cleanData=normalizeInput(data);
    const key=`${cleanData.distance}-${cleanData.traffic_level}-${cleanData.vehicle_load}-${cleanData.mileage}-${cleanData.fuel_type}`;
    if(cache.has(key)){
      return cache.get(key);
    }
    let result;
    try {
      const res=await axios.post("http://127.0.0.1:8000/predict",cleanData,
        {
          headers:{ "Content-Type": "application/json" },
          timeout:3000 
        }
      );
      const mlValue=res.data?.carbon_emission;
      if(mlValue && mlValue>0){
        result={carbon_emission: Number(mlValue),source:"ml"};
      } else{
        console.warn("⚠ ML returned 0 → fallback used");
        result=fallbackCarbon(cleanData);
      }
    } catch(err){
      console.warn("⚠ ML failed → fallback used");
      result=fallbackCarbon(cleanData);
    }
     cache.set(key,result);
     return result;
  } catch(error:any){
    console.error("ML SERVICE ERROR:",error?.message);
    return fallbackCarbon(normalizeInput(data));
  }
};