import {MapContainer,TileLayer,Marker,Popup} from "react-leaflet"
import "leaflet/dist/leaflet.css"

export default function MapCard(){

return(

<div className="glass p-4 rounded-2xl">

<h2 className="text-white mb-2">
Route Map
</h2>

<MapContainer center={[28.6,77.2]} zoom={10} style={{height:"200px"}}>

<TileLayer
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

<Marker position={[28.6,77.2]}>
<Popup>Start</Popup>
</Marker>

</MapContainer>

</div>

)

}