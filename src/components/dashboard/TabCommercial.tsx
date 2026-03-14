import KPICard from "./KPICard";
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ComposedChart, Bar, Line, Legend, ZAxis
} from "recharts";

const scatterData = [
  { discount: 5, revenue: 420, product: "Mountain Bike" },
  { discount: 10, revenue: 580, product: "Road Bike" },
  { discount: 15, revenue: 710, product: "Touring Bike" },
  { discount: 20, revenue: 650, product: "Helmet" },
  { discount: 8, revenue: 390, product: "Jersey" },
  { discount: 25, revenue: 820, product: "Wheels" },
  { discount: 12, revenue: 510, product: "Pedals" },
  { discount: 30, revenue: 480, product: "Gloves" },
  { discount: 3, revenue: 310, product: "Socks" },
  { discount: 18, revenue: 690, product: "Frame" },
];

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

const TabCommercial = () => {
  return (
    <div className="space-y-6">
      {/* Retention KPI */}
      <div className="grid grid-cols-4 gap-6">
        <KPICard title="Taxa de Retenção" value="68,4%" trend="+3.2pp vs anterior" trendPositive subtitle="Clientes com mais de 1 compra" />
        <KPICard title="Total de Pedidos" value="12.500" trend="+15.8% YoY" trendPositive />
        <KPICard title="Ticket Médio" value="R$ 278" trend="+6.4% YoY" trendPositive />
        <KPICard title="Produtos Ativos" value="295" subtitle="em 4 categorias" />
      </div>

      {/* Scatter + Product Table */}
      <div className="grid grid-cols-2 gap-6">
        <ChartCard title="Desconto (%) × Receita por Produto">
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="discount" name="Desconto" unit="%" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
              <YAxis dataKey="revenue" name="Receita" unit="K" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
              <ZAxis range={[60, 60]} />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} formatter={(value: number, name: string) => [name === "Desconto" ? `${value}%` : `R$ ${value}K`, name]} />
              <Scatter data={scatterData} fill="#2D1B14" fillOpacity={0.7} />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Performance de Produto (Top 6)">
          <table className="w-full text-[0.8125rem]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 font-semibold text-muted-foreground">Produto</th>
                <th className="text-right py-2 font-semibold text-muted-foreground">Receita</th>
                <th className="text-left py-2 pl-4 font-semibold text-muted-foreground">Margem</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {productPerformance.map((p) => (
                <tr key={p.product} className="border-b border-border hover:bg-background transition-colors">
                  <td className="py-2.5 text-foreground font-sans">{p.product}</td>
                  <td className="py-2.5 text-right">{p.revenue}</td>
                  <td className="py-2.5 pl-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-sm overflow-hidden">
                        <div className="h-full bg-success rounded-sm" style={{ width: `${p.marginWidth}%` }} />
                      </div>
                      <span className="text-[0.75rem]">{p.margin}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ChartCard>
      </div>

      {/* Combo Chart */}
      <ChartCard title="Pedidos × Ticket Médio por Região">
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={ordersByRegion}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis dataKey="region" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${v}`} />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="orders" name="Pedidos" fill="#F3F4F1" stroke="#2D1B14" strokeWidth={1} radius={[3, 3, 0, 0]} barSize={36} />
            <Line yAxisId="right" dataKey="ticketMedio" name="Ticket Médio" stroke="#2D1B14" strokeWidth={2} dot={{ fill: "#2D1B14", r: 4 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
};

const ChartCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-card border border-border rounded-md p-5 card-hover">
    <h3 className="text-[0.875rem] font-semibold text-foreground mb-4 tracking-[-0.01em]">{title}</h3>
    {children}
  </div>
);

export default TabCommercial;
