import {LineChart,Line,XAxis,YAxis,Tooltip,ResponsiveContainer} from "recharts"

const data=[
{month:"Jan",value:7},
{month:"Feb",value:12},
{month:"Mar",value:8},
{month:"Apr",value:6},
{month:"May",value:9},
{month:"Jun",value:7},
{month:"Jul",value:8},
{month:"Aug",value:6},
{month:"Sep",value:9},
{month:"Oct",value:8},
{month:"Dec",value:9}
]

export default function LineChartComponent(){

return(

<div className="glass p-6 rounded-2xl">

<h2 className="text-white mb-4">
Monthly Carbon Emissions
</h2>

<ResponsiveContainer width="100%" height={250}>

<LineChart data={data}>

<XAxis dataKey="month" stroke="#ccc"/>

<YAxis stroke="#ccc"/>

<Tooltip/>

<Line type="monotone" dataKey="value" stroke="#4ade80" strokeWidth={3}/>

</LineChart>

</ResponsiveContainer>

</div>

)

}