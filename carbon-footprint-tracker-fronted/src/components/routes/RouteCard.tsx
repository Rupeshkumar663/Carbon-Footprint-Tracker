export default function RouteCard({route}:any){

 return(

 <div className="grid grid-cols-4 gap-6">

 <div className="bg-gray-100 p-6 rounded-xl">
 <p>Distance</p>
 <h2>{route.distance} km</h2>
 </div>

 <div className="bg-gray-100 p-6 rounded-xl">
 <p>Carbon</p>
 <h2 className="text-red-400">
 {route.carbon} kg
 </h2>
 </div>

 <div className="bg-gray-100 p-6 rounded-xl">
 <p>Trees</p>
 <h2 className="text-emerald-400">
 {route.trees}
 </h2>
 </div>

 <div className="bg-gray-100 p-6 rounded-xl">
 <p>Eco Score</p>
 <h2 className="text-emerald-400">
 {route.score}
 </h2>
 </div>

 </div>

 );

}