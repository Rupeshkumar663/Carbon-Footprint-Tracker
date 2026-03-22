import axios from "axios";
const detectRoadType=(segments:any[]=[])=>{
  let highway=0;
  let city=0;
  segments.forEach((seg)=>{
    const name=seg?.name?.toLowerCase() || "";
    if(
      name.includes("highway") ||
      name.includes("expressway") ||
      name.includes("motorway")
    ) {
      highway++;
    } else {
      city++;
    }
  });
  return highway>city?"highway":"city";
};
const geoCode=async(place:string)=>{
  try {
    const res=await axios.get("https://us1.locationiq.com/v1/search.php",
      {
        params:{
          key:process.env.LOCATIONIQ_KEY,
          q:place,
          format:"json",
        },
      }
    );
    if(!res.data || res.data.length===0){
      throw new Error(`Location not found:${place}`);
    }
    return {lat:parseFloat(res.data[0].lat),lon:parseFloat(res.data[0].lon)};
  } catch(error:any){
    console.error("GEOCODE ERROR:",error?.response?.data || error.message);
    throw new Error("Geocoding failed");
  }
};

export const getmapData=async(start:string,end:string)=>{
  try {
    console.log("Start:",start);
    console.log(" End:",end);
    const startLoc=await geoCode(start);
    const endLoc=await geoCode(end);
    console.log("Coordinates:",startLoc,endLoc);
    const routeRes=await axios.post("https://api.openrouteservice.org/v2/directions/driving-car",
      {
        coordinates: [
          [startLoc.lon,startLoc.lat],
          [endLoc.lon,endLoc.lat],
        ],
        instructions:true,
        geometry:true,
      },
      {
        headers:{Authorization:process.env.ORS_API_KEY,"Content-Type": "application/json",},
      }
    );
    console.log(" ORS RESPONSE:", routeRes.data);
    if(!routeRes.data ||!routeRes.data.routes || routeRes.data.routes.length===0){
      throw new Error("No routes found from ORS");
    }
    const baseRoute=routeRes.data.routes[0];
    const geometry=baseRoute.geometry || null;
    const summary=baseRoute.summary || {distance:0,duration:0};
    const steps=baseRoute.segments?.[0]?.steps?.map((s:any)=>({name:s.name,})) || [];
    const roadType=detectRoadType(steps);
    const routes=[0, 1, 2].map((i)=>{
      const distance=summary.distance / 1000 + i * 0.5;
      const duration=summary.duration + i * 120;
      const speed=duration>0?distance/(duration/3600):0;
      let trafficLevel="Low";
      if(speed<20)
         trafficLevel="High";
      else if(speed<40) 
        trafficLevel="Medium";
      return {distance,duration,speed,traffic_level:trafficLevel,road_type:roadType,elevation:0,geometry};
    });
    return {routes,start:startLoc,end:endLoc};
  } catch(error:any){
    console.error("MAP ERROR FULL:",error?.response?.data || error.message);
    throw new Error("Map data not available");
  }
};