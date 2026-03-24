import KPICard from "./KPICard";
import ChartCard from "./ChartCard";
import MarginScatterChart from "./MarginScatterChart";
import {
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip
} from "recharts";

const productPerformance = [
  { product: "Mountain-200", revenue: "R$ 4.2M", margin: "46%", marginWidth: 92 },
  { product: "Road-650", revenue: "R$ 3.8M", margin: "41%", marginWidth: 82 },
  { product: "Touring-1000", revenue: "R$ 2.9M", margin: "39%", marginWidth: 78 },
  { product: "Mountain-100", revenue: "R$ 2.5M", margin: "44%", marginWidth: 88 },
  { product: "Road-450", revenue: "R$ 2.1M", margin: "36%", marginWidth: 72 },
  { product: "HL Helmet", revenue: "R$ 1.8M", margin: "52%", marginWidth: 100 },
];


const TICK = { fontSize: 10, fill: "#6B6560" };
const GRID = "rgba(0,0,0,0.05)";

const TabCommercial = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <KPICard title="Total de Pedidos" value="12.500" trend="+15.8% YoY" trendPositive />
        <KPICard title="Ticket Médio" value="R$ 278" trend="+6.4% YoY" trendPositive />
        <KPICard title="Produtos Ativos" value="295" subtitle="em 4 categorias" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <MarginScatterChart />

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

    </div>
  );
};

export default TabCommercial;
