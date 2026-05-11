import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Impact {
  trees: number;
  jetFuel: number;
  flightHours: number;
  earthTrips: number;
}

interface FlightDashboardState {
  totalCO2: number;
  ecoScore: number;
  todayCO2: number;
  impact: Impact;
}

const initialState: FlightDashboardState = {
  totalCO2: 0,
  ecoScore: 0,
  todayCO2: 0,
  impact: {
    trees: 0,
    jetFuel: 0,
    flightHours: 0,
    earthTrips: 0,
  },
};

const flightDashboardSlice = createSlice({
  name: "flightDashboard",
  initialState,

  reducers: {
    setFlightDashboardData: (
      state,
      action: PayloadAction<FlightDashboardState>
    ) => {
      state.totalCO2 = action.payload.totalCO2;
      state.ecoScore = action.payload.ecoScore;
      state.todayCO2 = action.payload.todayCO2;
      state.impact = action.payload.impact;
    },
  },
});

export const { setFlightDashboardData } =
  flightDashboardSlice.actions;

export default flightDashboardSlice.reducer;