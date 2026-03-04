import mongoose, { Schema, Model } from "mongoose";
export interface ICountry extends mongoose.Document {
  name:string;          // India, France
  code:string;          // IN, FR
  createdAt:Date;
  updatedAt:Date;
}
const countrySchema=new Schema<ICountry>(
  {
    name:{ 
        type:String,
         required:true,
          trim:true
        },
    code:{ 
        type:String,
         required:true,
         uppercase:true
         }
     },
  { timestamps:true }
);

const Country:Model<ICountry>=mongoose.model<ICountry>("Country", countrySchema);
export default Country;