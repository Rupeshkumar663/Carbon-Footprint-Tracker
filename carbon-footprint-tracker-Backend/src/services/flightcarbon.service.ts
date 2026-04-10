export const calculateCarbon=(distance:number,passengers:number,seatClass:string)=>{
  if(distance<=0 || passengers<=0){
    throw new Error("Invalid input");
  }
  let factor=0.115;
  if(distance<1500)
     factor=0.15;  
  else if(distance<4000)
     factor=0.13; 
  else
     factor=0.11;                     

  if(seatClass==="business") 
    factor *=1.5;
  if(seatClass==="first") 
    factor *=2;

  const total=distance*factor*passengers;
  return {totalCO2:Number(total.toFixed(2)),perPassenger:Number((total/passengers).toFixed(2)),ecoScore: Math.max(0, Math.min(100,100-total/10))};
};