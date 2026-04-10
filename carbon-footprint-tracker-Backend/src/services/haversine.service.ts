export const getDistance=(lat1:number,lon1:number,lat2:number,lon2:number):number=>{
  const toRad=(deg:number)=>(deg*Math.PI)/180;
  if(lat1 < -90 || lat1 > 90 ||lat2 < -90 || lat2 > 90 ||lon1 < -180 || lon1 > 180 ||lon2 < -180 || lon2 > 180){
    throw new Error("Invalid coordinates");
  }
  const R=6371;
  const dLat=toRad(lat2-lat1);
  const dLon=toRad(lon2-lon1);
  const a=Math.sin(dLat/2) ** 2 +Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
  const distance=R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
  return distance;
};