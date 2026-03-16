import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const scatterData = [
  { x: 5,  y: 52, category: "bom" },
  { x: 8,  y: 48, category: "bom" },
  { x: 10, y: 45, category: "bom" },
  { x: 12, y: 43, category: "bom" },
  { x: 15, y: 41, category: "bom" },
  { x: 18, y: 38, category: "medio" },
  { x: 20, y: 36, category: "medio" },
  { x: 22, y: 34, category: "medio" },
  { x: 25, y: 32, category: "medio" },
  { x: 28, y: 29, category: "critico" },
  { x: 30, y: 27, category: "critico" },
  { x: 33, y: 24, category: "critico" },
  { x: 35, y: 21, category: "critico" },
];

const trendData = [{ x: 0, y: 55 }, { x: 35, y: 18 }];

const COLORS: Record<string, string> = {
  bom: "#166534",
  medio: "#D97706",
  critico: "#92400E",
};

const TICK = { fontSize: 10, fill: "#6B6560" };
const GRID = "rgba(0,0,0,0.06)";

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const label = d.category === "bom" ? "Bom" : d.category === "medio" ? "Médio" : "Crítico";
  return (
    <div style={{ background: "#fff", border: "1px solid #E2E0DC", borderRadius: 8, padding: "8px 12px", fontSize: 11 }}>
      <p style={{ fontWeight: 500, color: "#2D1B14", marginBottom: 4 }}>{label}</p>
      <p style={{ color: "#6B6560" }}>Desconto: {d.x}%</p>
      <p style={{ color: "#6B6560" }}>Margem: {d.y}%</p>
    </div>
  );
};

const MarginScatterChart = () => (
  <div style={{ background: "#fff", border: "1px solid #E2E0DC", borderRadius: 10, padding: 22 }}>
    <h3 style={{ fontSize: 13, fontWeight: 500, color: "#2D1B14", marginBottom: 8 }}>
      Desempenho de Margem vs. Desconto
    </h3>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 16 }}>
      {[
        { color: "#166534", label: "Bom (≥40%)" },
        { color: "#D97706", label: "Médio (30–39%)" },
        { color: "#92400E", label: "Crítico (<30%)" },
      ].map((item) => (
        <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 9, height: 9, borderRadius: 2, background: item.color, display: "inline-block" }} />
          <span style={{ fontSize: 11, color: "#6B6560" }}>{item.label}</span>
        </div>
      ))}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ width: 16, borderTop: "2px dashed #6B6560", display: "inline-block" }} />
        <span style={{ fontSize: 11, color: "#6B6560" }}>Tendência</span>
      </div>
    </div>
    <ResponsiveContainer width="100%" height={280}>
      <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
        <CartesianGrid stroke={GRID} />
        <XAxis dataKey="x" type="number" domain={[-1, 37]} tickFormatter={(v) => `${v}%`} tick={TICK} axisLine={false} tickLine={false} label={{ value: "Desconto (%)", position: "insideBottom", offset: -10, fontSize: 10, fill: "#6B6560" }} />
        <YAxis dataKey="y" type="number" domain={[13, 68]} tickFormatter={(v) => `${v}%`} tick={TICK} axisLine={false} tickLine={false} label={{ value: "Margem (%)", angle: -90, position: "insideLeft", offset: 10, fontSize: 10, fill: "#6B6560" }} />
        <Tooltip content={<CustomTooltip />} />
        <Scatter data={trendData} line={{ stroke: "#6B6560", strokeWidth: 1.5, strokeDasharray: "6 4" }} shape={() => null as any} legendType="none" />
        <Scatter data={scatterData}>
          {scatterData.map((entry, i) => (
            <Cell key={i} fill={COLORS[entry.category]} stroke="rgba(255,255,255,0.8)" strokeWidth={2} />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  </div>
);

export default MarginScatterChart;
