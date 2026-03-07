import axios from "axios";

const formatDuration = (seconds:number)=>{

 const minutes = Math.floor(seconds / 60);
 const hours = Math.floor(minutes / 60);
 const remainingMinutes = minutes % 60;

 return `${hours}:${remainingMinutes.toString().padStart(2,"0")} hr`;
};


// road type detect
const detectRoadType = (steps:any[])=>{

 let highway = 0;
 let city = 0;

 steps.forEach((step)=>{

  const instruction = step.html_instructions?.toLowerCase() || "";

  if(
   instruction.includes("nh") ||
   instruction.includes("highway") ||
   instruction.includes("expressway")
  ){
   highway++;
  }else{
   city++;
  }

 });

 return highway > city ? "highway" : "city";
};


// elevation API
const getElevation = async(lat:number,lng:number)=>{

 const res = await axios.get(
  "https://maps.googleapis.com/maps/api/elevation/json",
  {
   params:{
    locations:`${lat},${lng}`,
    key:process.env.GOOGLE_MAPS_KEY
   }
  }
 );

 return res.data.results[0].elevation;
};


export const getmapData = async(
 start:string,
 end:string,
)=>{

 const response = await axios.get(
  "https://maps.googleapis.com/maps/api/directions/json",
  {
   params:{
    origin:start,
    destination:end,
    departure_time:"now",
    key:process.env.GOOGLE_MAPS_KEY
   }
  }
 );

 const route = response.data.routes[0];
 const leg = route.legs[0];

 // distance
 const distanceKm = leg.distance.value / 1000;

 // duration
 const durationSeconds = leg.duration.value;

 // traffic
 const trafficTime = leg.duration_in_traffic?.value || durationSeconds;

 let trafficLevel = "Low";

 if(trafficTime > durationSeconds * 1.3){
  trafficLevel = "High";
 }
 else if(trafficTime > durationSeconds * 1.1){
  trafficLevel = "Medium";
 }

 // speed
 const durationHours = durationSeconds / 3600;
 const speed = distanceKm / durationHours;

 // road type
 const steps = leg.steps;
 const roadType = detectRoadType(steps);

 // elevation
 const lat = leg.start_location.lat;
 const lng = leg.start_location.lng;
 const elevation = await getElevation(lat,lng);

 return {

  distance: `Distance : ${distanceKm.toFixed(1)} km`,

  duration: `Duration : ${formatDuration(durationSeconds)}`,

  speed: `${speed.toFixed(1)} km/h`,

  traffic_level: trafficLevel,

  road_type: roadType,

  elevation: `${elevation.toFixed(1)} m`,



 };

};