import axios from "axios";

export const getWeatherInfo = async(city:string)=>{

 const response = await axios.get(
  "https://api.openweathermap.org/data/2.5/weather",
  {
   params:{
    q: city,
    units: "metric",
    appid: process.env.WEATHER_API_KEY
   }
  }
 );

 return {

  temperature: response.data.main.temp,

  weather: response.data.weather[0].main,

 };

};