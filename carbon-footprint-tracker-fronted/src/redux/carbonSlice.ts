import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";
import type {CarbonInput,CarbonResult,CarbonState} from "../types/carbonTypes";

const initialState: CarbonState={
  status:"idle",
  result:null,
  error:null,
};

export const createCarbonRecord=createAsyncThunk<CarbonResult,CarbonInput,{ rejectValue: string }>(
  "carbon/create",
  async(data,{ rejectWithValue })=>{
    try{
      const response=await api.post("/routes",data);
      return response.data.data;
    } catch(error:any){
      return rejectWithValue(error.response?.data?.message ||"Failed to create carbon record"
      );
    }
  }
);

const carbonSlice = createSlice({
  name:"carbon",
  initialState,
  reducers:{
    resetCarbonState:(state) => {
      state.status="idle";
      state.result=null;
      state.error=null;
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(createCarbonRecord.pending,(state)=>{
        state.status="loading";
        state.error=null;
      })
      .addCase(createCarbonRecord.fulfilled,(state,action)=>{
        state.status="succeeded";
        state.result=action.payload;
      })
      .addCase(createCarbonRecord.rejected,(state,action)=>{
        state.status="failed";
        state.error=action.payload || "Something went wrong";
      });
  },
});

export const {resetCarbonState}=carbonSlice.actions;
export default carbonSlice.reducer;