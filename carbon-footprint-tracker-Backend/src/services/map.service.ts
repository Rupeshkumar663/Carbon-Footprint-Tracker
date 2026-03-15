import axios from "axios";
const formatDuration=(seconds:number)=>{
 const minutes=Math.floor(seconds/60);
 const hours=Math.floor(minutes/60);
 const remainingMinutes=minutes%60;
 return `${hours}:${remainingMinutes.toString().padStart(2,"0")}hr`;
};

const detectRoadType=(segments:any[])=>{
 let highway=0;
 let city=0;
 segments.forEach((seg)=>{
  const name=seg.name?.toLowerCase() || "";
  if(name.includes("highway")||name.includes("expressway")||name.includes("motorway")){
   highway++;
  }else{
   city++;
  }
 });
 return highway>city?"highway":"city";
};

const getElevation=async(lat:number,lng:number)=>{
 try{
  const res=await axios.get("https://api.open-elevation.com/api/v1/lookup",{params:{locations:`${lat},${lng}`}});
  return res.data.results[0].elevation;
 }catch{
  return 0;
 }
};

export const getmapData=async(start:string,end:string)=>{
 try{
  const [startGeo,endGeo]=await Promise.all([
   axios.get("https://nominatim.openstreetmap.org/search",{params:{q:start,format:"json"},headers:{"User-Agent":"carbon-footprint-tracker-app"}}),
   axios.get("https://nominatim.openstreetmap.org/search",{params:{q:end,format:"json"},headers:{"User-Agent":"carbon-footprint-tracker-app"}})
  ]);

  if(!startGeo.data.length || !endGeo.data.length){
   throw new Error("Location not found");
  }

  const startLat=parseFloat(startGeo.data[0].lat);
  const startLng=parseFloat(startGeo.data[0].lon);
  const endLat=parseFloat(endGeo.data[0].lat);
  const endLng=parseFloat(endGeo.data[0].lon);

  const routePromise=axios.post("https://api.openrouteservice.org/v2/directions/driving-car",{coordinates:[[startLng,startLat],[endLng,endLat]]},{headers:{Authorization:process.env.ORS_API_KEY,"Content-Type":"application/json"}});
  const elevationPromise=getElevation(startLat,startLng);

  const [response,elevation]=await Promise.all([routePromise,elevationPromise]);

  const route=response.data.routes[0];
  const summary=route.summary;
  const distanceKm=summary.distance/1000;
  const durationSeconds=summary.duration;
  const durationHours=durationSeconds/3600;
  const speed=distanceKm/durationHours;

  let trafficLevel="Low";
  if(speed<20){
   trafficLevel="High";
  }else if(speed<40){
   trafficLevel="Medium";
  }

  const steps=route.segments[0].steps;
  const roadType=detectRoadType(steps);

  return{
   distance:distanceKm.toFixed(1),
   duration:`Duration : ${formatDuration(durationSeconds)}`,
   speed:`${speed.toFixed(1)} km/h`,
   traffic_level:trafficLevel,
   road_type:roadType,
   elevation:`${elevation.toFixed(1)} m`
  };
 }catch(error){
  console.error("Map Service Error:",error);
  throw new Error("Map data not available");
 }
};