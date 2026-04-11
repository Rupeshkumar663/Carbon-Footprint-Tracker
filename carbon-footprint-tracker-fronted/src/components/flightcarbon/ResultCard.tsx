// src/components/ResultCard.tsx

export default function ResultCard({ data }: any) {
  if (!data) return null;

  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      <div className="p-4 bg-white rounded-xl shadow">
        <h3>Total CO2</h3>
        <p className="text-xl font-bold">{data.totalCO2} kg</p>
      </div>

      <div className="p-4 bg-white rounded-xl shadow">
        <h3>Eco Score</h3>
        <p className="text-xl font-bold text-green-600">
          {data.ecoScore}
        </p>
      </div>

      <div className="p-4 bg-white rounded-xl shadow">
        <h3>AI Advice</h3>
        <p>{data.aiAdvice}</p>
      </div>
    </div>
  );
}