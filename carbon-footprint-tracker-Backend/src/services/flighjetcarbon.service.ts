export type MissionType =
  | "Training"
  | "Combat"
  | "Patrol"
  | "Reconnaissance"
  | "Air Superiority"
  | "Ground Attack"
  | "Interception"
  | "Surveillance";

export interface FighterCarbonInput {
  hours: number;
  payload?: number;
  speed: number;
  altitude?: number;
  jetModel: string;
  mission?: MissionType;
}

export interface FighterCarbonResult {
  carbon: number;
  carbonTons: number;
  ecoScore: number;
  label: string;
}

// 🔥 Fuel burn rate (kg/hour)
const jetFuelBurnRates: Record<string, number> = {
  "F-16 Fighting Falcon": 2400,
  "F-22 Raptor": 3000,
  "F-35 Lightning II": 2800,
  "SU-57": 3200,
  Rafale: 2700,
  "Eurofighter Typhoon": 2600,
  "J-20 Mighty Dragon": 3100,
  "MiG-29": 2500,
  "MiG-35": 2600,
  "Tejas LCA": 2000,
  "F/A-18 Super Hornet": 2700,
  "Mirage 2000": 2300,
  "Gripen E": 2100,
  "SU-30MKI": 3300,
  "F-15 Eagle": 2900,
  default: 2500,
};

const missionFactor: Record<MissionType, number> = {
  Training: 1,
  Combat: 1.3,
  Patrol: 1.1,
  Reconnaissance: 1.05,
  "Air Superiority": 1.25,
  "Ground Attack": 1.2,
  Interception: 1.15,
  Surveillance: 1.08,
};

// ✅ Eco Score (fixed)
const getEcoScore = (carbon: number, baseline: number) => {
  const ratio = carbon / baseline;

  let score = 100 - (ratio - 1) * 60;
  score = Math.max(0, Math.min(100, score));

  let label = "";
  if (score >= 80) label = "Excellent 🌱";
  else if (score >= 60) label = "Good 👍";
  else if (score >= 40) label = "Moderate ⚠️";
  else if (score >= 20) label = "Poor 🚨";
  else label = "Very Bad 💀";

  return { score: Math.round(score), label };
};

// 🚀 MAIN FUNCTION
export const calculateFighterCarbon = ({
  hours,
  payload = 0,
  speed,
  altitude = 0,
  jetModel,
  mission = "Training",
}: FighterCarbonInput): FighterCarbonResult => {

  // ✅ Validation (important)
  if (hours <= 0 || speed <= 0) {
    return { carbon: 0, carbonTons: 0, ecoScore: 0, label: "Invalid Input" };
  }

  // ⚙️ Base fuel burn
  const baseFuel =
    jetFuelBurnRates[jetModel] ?? jetFuelBurnRates.default;

  const missionMul = missionFactor[mission];

  // 🔥 Factors
  const payloadFactor = 1 + payload / 10000;

  let speedFactor = 1;
  if (speed < 700) speedFactor = 1.2;
  else if (speed > 1300) speedFactor = 1.25;

  const altitudeFactor = altitude > 10000 ? 0.9 : 1.1;

  // 🧮 Fuel calculation
  const fuelBurnRate =
    baseFuel *
    missionMul *
    payloadFactor *
    speedFactor *
    altitudeFactor;

  const totalFuel = fuelBurnRate * hours;

  // 🧠 CO2 conversion
  const carbon = totalFuel * 3.16;

  const finalCarbon = Math.round(carbon * 100) / 100;
  const carbonTons = +(finalCarbon / 1000).toFixed(2);

  // 🎯 Dynamic baseline (IMPORTANT FIX)
  const baselineFuel = baseFuel * hours * missionMul;
  const baselineCarbon = baselineFuel * 3.16;

  const eco = getEcoScore(finalCarbon, baselineCarbon);

  return {
    carbon: finalCarbon,
    carbonTons,
    ecoScore: eco.score,
    label: eco.label,
  };
};