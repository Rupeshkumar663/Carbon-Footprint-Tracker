export default function Heatmap(){

const colors=[
"bg-green-500",
"bg-green-400",
"bg-yellow-400",
"bg-orange-400",
"bg-red-400",
"bg-red-500"
]

return(

<div className="glass p-6 rounded-2xl">

<h2 className="text-white mb-4">
Carbon Heatmap
</h2>

<div className="grid grid-cols-7 gap-2">

{colors.map((c,i)=>(
<div key={i} className={`${c} h-10 rounded`} />
))}

</div>

</div>

)

}