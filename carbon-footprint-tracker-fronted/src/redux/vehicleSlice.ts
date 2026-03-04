import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";
import type { Vehicle, VehicleState } from "../types/carbonTypes";

const initialState:VehicleState={
  list:[],
  status:"idle",
  error:null,
};

export const fetchVehicles=createAsyncThunk<Vehicle[],void,{rejectValue:string}>(
  "vehicle/fetch",
  async(_, { rejectWithValue })=>{
    try {
      const response=await api.get("/vehicles");
      return response.data.data;
    } catch(error:any){
      return rejectWithValue(error.response?.data?.message ||"Failed to fetch vehicles");
    }
  }
);


const vehicleSlice=createSlice({
  name:"vehicle",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase(fetchVehicles.pending,(state)=>{
        state.status = "loading";
      })
      .addCase(fetchVehicles.fulfilled,(state,action)=>{
        state.status="succeeded";
        state.list=action.payload;
      })
      .addCase(fetchVehicles.rejected,(state,action)=>{
        state.status="failed";
        state.error=action.payload || "Something went wrong";
      });
  },
});

export default vehicleSlice.reducer;