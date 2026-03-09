const MAX_EMISSION_THRESHOLD = 20;
function normalize(score:number){
 return Math.max(0,Math.min(100,Math.round(score)));
}
export function calculateGreenMetrics(carbonEmission:number){
 if(!Number.isFinite(carbonEmission)){
  throw new Error("Invalid carbon emission");
 }
 const rawScore=100-(carbonEmission/MAX_EMISSION_THRESHOLD)*100;
 const greenScore=normalize(rawScore);
 const isEcoFriendly=greenScore>=70;
 return {carbonEmission,greenScore,isEcoFriendly};
}