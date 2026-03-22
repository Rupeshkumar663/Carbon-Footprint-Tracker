import axios from "axios";
export const getWeatherInfo=async(city:string)=>{
 try {
  const response=await axios.get("https://api.openweathermap.org/data/2.5/weather",{params:{q:city, units:"metric",appid:process.env.WEATHER_API_KEY}});
    return response.data.main.temp;
  } catch(error){
    console.log("Weather API error");
    return 25; 
  }
 };