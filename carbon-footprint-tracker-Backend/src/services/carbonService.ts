const MAX_EMISSION_REFERENCE=300;
function normalize(score:number){
  return Math.max(0,Math.min(100,score));
}

export function calculateGreenMetrics(
  carbonEmission:number,
  fastestEmission?:number
) {
  if (!Number.isFinite(carbonEmission)) {
    throw new Error("Invalid carbon emission");
  }

  let rawScore=100-(carbonEmission / MAX_EMISSION_REFERENCE)*100;
  const greenScore=Math.round(normalize(rawScore));
  const isEcoFriendly=greenScore>=60;
  let carbonSaved=0;
  let savingPercentage=0;
  if(
    Number.isFinite(fastestEmission) &&
    fastestEmission! > carbonEmission
  ) {
    carbonSaved=Number((fastestEmission! - carbonEmission).toFixed(2));
    savingPercentage=Number(((carbonSaved / fastestEmission!) * 100).toFixed(2));
  }
  return {carbonEmission:Number(carbonEmission.toFixed(2)),greenScore,isEcoFriendly,carbonSaved, savingPercentage};
}