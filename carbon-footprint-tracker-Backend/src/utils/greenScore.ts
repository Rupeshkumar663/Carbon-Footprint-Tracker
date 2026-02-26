
const MAX_EMISSION_THRESHOLD=20;
/* Clamp value between 0–100 */
function normalize(score:number):number{
  return Math.max(0,Math.min(100,Math.round(score)));
}

/* Calculate Green Score */
export function calculateGreenScore(
  carbonEmission:number
):number{
  if(carbonEmission<0){
    throw new Error("Carbon emission cannot be negative");
  }
  const rawScore=100-(carbonEmission/MAX_EMISSION_THRESHOLD)*100;
  return normalize(rawScore);
}

/* Eco Friendly Checker */
export function isEcoFriendly(
  greenScore:number
):boolean{
  return greenScore>=70;
}