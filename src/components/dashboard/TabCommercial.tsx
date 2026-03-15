import KPICard from "./KPICard";
import ChartCard from "./ChartCard";
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ComposedChart, Bar, Line, ZAxis
} from "recharts";

const bubbleData = [
  { discount: 3, margin: 52, revenue: 310, product: "Socks" },
  { discount: 5, margin: 46, revenue: 420, product: "Mountain Bike" },
  { discount: 8, margin: 44, revenue: 390, product: "Jersey" },
  { discount: 10, margin: 41, revenue: 580, product: "Road Bike" },
  { discount: 12, margin: 39, revenue: 510, product: "Pedals" },
  { discount: 15, margin: 36, revenue: 710, product: "Touring Bike" },
  { discount: 18, margin: 34, revenue: 690, product: "Frame" },
  { discount: 20, margin: 31, revenue: 650, product: "Helmet" },
  { discount: 25, margin: 28, revenue: 820, product: "Wheels" },
  { discount: 30, margin: 22, revenue: 480, product: "Gloves" },
];

// Linear regression for trendline
const calcTrendline = (data: typeof bubbleData) => {
  const n = data.length;
  const sumX = data.reduce((s, d) => s + d.discount, 0);
  const sumY = data.reduce((s, d) => s + d.margin, 0);
  const sumXY = data.reduce((s, d) => s + d.discount * d.margin, 0);
  const sumX2 = data.reduce((s, d) => s + d.discount * d.discount, 0);
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  return { slope, intercept };
};

const { slope, intercept } = calcTrendline(bubbleData);
const trendlineData = [
  { discount: 0, margin: intercept },
  { discount: 35, margin: slope * 35 + intercept },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 text-[11px] shadow-sm">
      <p className="font-medium text-foreground mb-1">{d.product}</p>
      <p className="text-secondary-foreground">Desconto: <span className="font-mono font-medium">{d.discount}%</span></p>
      <p className="text-secondary-foreground">Margem: <span className="font-mono font-medium">{d.margin}%</span></p>
      <p className="text-secondary-foreground">Receita: <span className="font-mono font-medium">R$ {d.revenue}K</span></p>
    </div>
  );
};

const productPerformance = [
  { product: "Mountain-200", revenue: "R$ 4.2M", margin: "46%", marginWidth: 92 },
  { product: "Road-650", revenue: "R$ 3.8M", margin: "41%", marginWidth: 82 },
  { product: "Touring-1000", revenue: "R$ 2.9M", margin: "39%", marginWidth: 78 },
  { product: "Mountain-100", revenue: "R$ 2.5M", margin: "44%", marginWidth: 88 },
  { product: "Road-450", revenue: "R$ 2.1M", margin: "36%", marginWidth: 72 },
  { product: "HL Helmet", revenue: "R$ 1.8M", margin: "52%", marginWidth: 100 },
];

const ordersByRegion = [
  { region: "N. America", orders: 4500, ticketMedio: 285 },
  { region: "Europe", orders: 3200, ticketMedio: 310 },
  { region: "Pacific", orders: 2100, ticketMedio: 270 },
  { region: "S. America", orders: 1800, ticketMedio: 245 },
  { region: "Africa", orders: 900, ticketMedio: 220 },
];

const TICK = { fontSize: 10, fill: "#6B6560" };
const GRID = "rgba(0,0,0,0.05)";

const TabCommercial = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <KPICard title="Taxa de Retenção" value="68,4%" trend="+3.2pp vs anterior" trendPositive subtitle="Clientes com mais de 1 compra" />
        <KPICard title="Total de Pedidos" value="12.500" trend="+15.8% YoY" trendPositive />
        <KPICard title="Ticket Médio" value="R$ 278" trend="+6.4% YoY" trendPositive />
        <KPICard title="Produtos Ativos" value="295" subtitle="em 4 categorias" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ChartCard title="Desconto (%) × Margem (%) — Bubble = Receita" legend={[{ color: "#2D1B14", label: "Produto" }, { color: "#6B6560", label: "Tendência" }]}>
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
              <XAxis dataKey="discount" name="Desconto" unit="%" tick={TICK} axisLine={false} tickLine={false} type="number" domain={[0, 35]} tickCount={8} />
              <YAxis dataKey="margin" name="Margem" unit="%" tick={TICK} axisLine={false} tickLine={false} type="number" domain={[15, 60]} />
              <ZAxis dataKey="revenue" range={[40, 400]} name="Receita" />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Scatter data={bubbleData} fill="#2D1B14" fillOpacity={0.6} stroke="#2D1B14" strokeWidth={1} />
              <Scatter data={trendlineData} fill="none" line={{ stroke: "#6B6560", strokeWidth: 1.5, strokeDasharray: "6 3" }} shape={() => null} legendType="none" />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Performance de Produto (Top 6)">
          <table className="w-full text-[12px]">
            <thead>
              <tr style={{ borderBottom: "1px solid #E2E0DC" }}>
                <th className="text-left py-2 label-upper">Produto</th>
                <th className="text-right py-2 label-upper">Receita</th>
                <th className="text-left py-2 pl-4 label-upper">Margem</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {productPerformance.map((p) => (
                <tr key={p.product} style={{ borderBottom: "1px solid #E2E0DC" }} className="hover:bg-background transition-colors">
                  <td className="py-2.5 text-foreground font-sans">{p.product}</td>
                  <td className="py-2.5 text-right">{p.revenue}</td>
                  <td className="py-2.5 pl-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-sm overflow-hidden">
                        <div className="h-full rounded-sm" style={{ width: `${p.marginWidth}%`, background: "#166534" }} />
                      </div>
                      <span className="text-[11px]">{p.margin}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ChartCard>
      </div>

      <ChartCard title="Pedidos × Ticket Médio por Região" legend={[{ color: "#F3F4F1", label: "Pedidos" }, { color: "#2D1B14", label: "Ticket Médio" }]}>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={ordersByRegion}>
            <CartesianGrid stroke={GRID} vertical={false} />
            <XAxis dataKey="region" tick={TICK} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={TICK} axisLine={false} tickLine={false} />
            <YAxis yAxisId="right" orientation="right" tick={TICK} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${v}`} />
            <Tooltip />
            <Bar yAxisId="left" dataKey="orders" name="Pedidos" fill="#F3F4F1" stroke="#2D1B14" strokeWidth={1} radius={[3, 3, 0, 0]} barSize={36} />
            <Line yAxisId="right" dataKey="ticketMedio" name="Ticket Médio" stroke="#2D1B14" strokeWidth={1.5} dot={{ fill: "#2D1B14", r: 4 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
};

export default TabCommercial;
