export const getCoordinates=async(city:string)=>{
  const res=await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`,{
      headers:{
        "User-Agent":"carbon-footprint-tracker/1.0 (samratrupesh05@gmail.com)"
      },
    }
  );
  const data=await res.json();
  if(!data.length){
    throw new Error("City not found");
  }
  return {lat:parseFloat(data[0].lat),lon:parseFloat(data[0].lon)};
};