/* ==============================
   Transport Type
============================== */

export type TransportType =
  | "car"
  | "bike"
  | "bus"
  | "train"
  | "walk"
  | "cycle";


/* ==============================
   API Input Type
============================== */

export interface CarbonInput {
  distance: number;
  transportType: TransportType;
}


/* ==============================
   API Response Type
============================== */

export interface CarbonResult {
  carbonEmission: number;
  greenScore: number;
  isEcoFriendly: boolean;
}


/* ==============================
   Redux State Type
============================== */

export interface CarbonState {
  status: "idle" | "loading" | "succeeded" | "failed";
  result: CarbonResult | null;
  error: string | null;
}