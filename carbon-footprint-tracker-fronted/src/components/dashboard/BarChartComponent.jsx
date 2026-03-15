import {BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer} from "recharts"

const data=[
{day:"Sun",value:3},
{day:"Mon",value:4},
{day:"Tue",value:3},
{day:"Wed",value:2},
{day:"Thu",value:2},
{day:"Fri",value:3},
{day:"Sat",value:3.5}
]

export default function BarChartComponent(){

return(

<div className="glass p-6 rounded-2xl">

<h2 className="text-white mb-4">
Weekly Carbon Trend
</h2>

<ResponsiveContainer width="100%" height={250}>

<BarChart data={data}>

<XAxis dataKey="day" stroke="#ccc"/>

<YAxis stroke="#ccc"/>

<Tooltip/>

<Bar dataKey="value" fill="#3b82f6"/>

</BarChart>

</ResponsiveContainer>

</div>

)

}