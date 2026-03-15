import KPICard from "./KPICard";
import ChartCard from "./ChartCard";
import MarginScatterChart from "./MarginScatterChart";
import {
  ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip
} from "recharts";

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
        <ChartCard title="Desempenho de Margem vs. Desconto" legend={[{ color: "#6B6560", label: "Tendência" }]} extra={<MarginLegend />}>
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
              <XAxis dataKey="discount" name="Desconto" unit="%" tick={TICK} axisLine={false} tickLine={false} type="number" domain={[0, 35]} tickCount={8} />
              <YAxis dataKey="margin" name="Margem" unit="%" tick={TICK} axisLine={false} tickLine={false} type="number" domain={[15, 60]} />
              <ZAxis dataKey="revenue" range={[40, 400]} name="Receita" />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Scatter data={bubbleData} shape={<CustomBubbleShape />} />
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
