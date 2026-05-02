import OpenAI from "openai";
import dotenv from "dotenv"
dotenv.config()
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

function cleanBullets(text: string) {
  return text
    .split("\n")
    .map((t) => t.replace(/^[-•\d\.\)\s]+/, "").trim())
    .filter(Boolean)
    .slice(0, 3);
}

export async function generateCarbonAdvice(
  type: "fighter" | "flight",
  data: any
): Promise<string[]> {
  const base = `
You are a sustainability expert.
Give EXACTLY 3 short actionable tips (no numbering).
`;

  const fighterBlock = `
Fighter Jet:
Model: ${data.jetModel}
Mission: ${data.mission}
Hours: ${data.hours}
Speed: ${data.speed}
Altitude: ${data.altitude}
Payload: ${data.payload}
Carbon: ${data.carbon}
EcoScore: ${data.ecoScore}
`;

  const flightBlock = `
Flight:
Airline: ${data.airline}
From: ${data.from}
To: ${data.to}
Distance: ${data.distance}
Passengers: ${data.passengers}
Class: ${data.flightClass}
Carbon: ${data.carbon}
EcoScore: ${data.ecoScore}
`;

  const guidance = `
If EcoScore > 80 → optimization tips
If EcoScore 40-80 → moderate improvements
If EcoScore < 40 → strong actions
Return only 3 bullet lines.
`;

  const prompt = `${base}
${type === "fighter" ? fighterBlock : flightBlock}
${guidance}`;

  try {
    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      messages: [{ role: "user", content: prompt }],
    });

    const text = res.choices?.[0]?.message?.content || "";
    const tips = cleanBullets(text);

    return tips.length >= 3
      ? tips
      : [
          "Reduce payload weight",
          "Maintain optimal speed",
          "Optimize altitude",
        ];
  } catch {
    return [
      "Reduce payload weight",
      "Maintain optimal speed",
      "Optimize altitude",
    ];
  }
}