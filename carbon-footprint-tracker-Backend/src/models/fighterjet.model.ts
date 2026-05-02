import mongoose from "mongoose";
const emissionSchema=new mongoose.Schema({
  userId:{
      type:mongoose.Types.ObjectId,
      ref:"User"
    },
  jetModel:{
    type:String
   },
  hours:{
     type:Number
  },
  payload:{
     type:Number
  },
  altitude:{
    type: Number
  },
  speed:{
    type: Number
  },
  distance:{
    type:Number
  },
  mission:{
    type:String
  },
  carbon:{
      type:Number,
      required:true,
  },
  ecoScore:{
      type:Number,
      required:true,
  },
  label:{
      type:String,
      required:true,
    }
},
{
    timestamps:true
});

export default mongoose.model("Emission",emissionSchema);