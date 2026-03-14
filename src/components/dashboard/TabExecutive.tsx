import KPICard from "./KPICard";
import ChartCard from "./ChartCard";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ComposedChart, Area
} from "recharts";

const revenueByRegion = [
  { region: "N. America", revenue: 12400000, margin: 42 },
  { region: "Europe", revenue: 8900000, margin: 38 },
  { region: "Pacific", revenue: 5600000, margin: 45 },
  { region: "S. America", revenue: 3200000, margin: 35 },
  { region: "Africa", revenue: 1800000, margin: 31 },
];

const seasonality = [
  { month: "Jan", current: 2800, previous: 2400 },
  { month: "Fev", current: 3100, previous: 2600 },
  { month: "Mar", current: 3500, previous: 2900 },
  { month: "Abr", current: 3200, previous: 3100 },
  { month: "Mai", current: 3800, previous: 3300 },
  { month: "Jun", current: 4200, previous: 3500 },
  { month: "Jul", current: 4500, previous: 3800 },
  { month: "Ago", current: 4100, previous: 3600 },
  { month: "Set", current: 3900, previous: 3400 },
  { month: "Out", current: 4300, previous: 3700 },
  { month: "Nov", current: 5100, previous: 4200 },
  { month: "Dez", current: 5800, previous: 4800 },
];

const ticketMedio = [
  { month: "Jan", ticket: 245 }, { month: "Fev", ticket: 252 },
  { month: "Mar", ticket: 261 }, { month: "Abr", ticket: 258 },
  { month: "Mai", ticket: 270 }, { month: "Jun", ticket: 278 },
  { month: "Jul", ticket: 285 }, { month: "Ago", ticket: 280 },
  { month: "Set", ticket: 290 }, { month: "Out", ticket: 295 },
  { month: "Nov", ticket: 310 }, { month: "Dez", ticket: 325 },
];

const TICK = { fontSize: 10, fill: "#6B6560" };
const GRID = "rgba(0,0,0,0.05)";
const fmt = (v: number) => `R$ ${(v / 1000000).toFixed(1)}M`;

const TabExecutive = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <KPICard title="Receita Líquida" value="R$ 31,9M" trend="+12.4% YoY" trendPositive />
        <KPICard title="Lucro Bruto" value="R$ 12,5M" trend="+8.2% YoY" trendPositive />
        <KPICard title="Margem Bruta" value="39,2%" trend="+1.3pp" trendPositive />
        <KPICard title="Crescimento YoY" value="+12,4%" trend="vs. 9.1% anterior" trendPositive />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ChartCard title="Receita por Região × Margem (%)" legend={[{ color: "#2D1B14", label: "Receita" }, { color: "#D97706", label: "Margem %" }]}>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={revenueByRegion}>
              <CartesianGrid stroke={GRID} vertical={false} />
              <XAxis dataKey="region" tick={TICK} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={TICK} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
              <YAxis yAxisId="right" orientation="right" tick={TICK} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(value: number, name: string) => [name === "revenue" ? fmt(value) : `${value}%`, name === "revenue" ? "Receita" : "Margem"]} />
              <Bar yAxisId="left" dataKey="revenue" fill="#2D1B14" radius={[3, 3, 0, 0]} barSize={32} />
              <Line yAxisId="right" dataKey="margin" stroke="#D97706" strokeWidth={2} dot={{ fill: "#D97706", r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Receita: Ano Atual vs Anterior (R$ mil)" legend={[{ color: "#2D1B14", label: "2024" }, { color: "#2D1B14", label: "2023 (dash)" }]}>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={seasonality}>
              <CartesianGrid stroke={GRID} vertical={false} />
              <XAxis dataKey="month" tick={TICK} axisLine={false} tickLine={false} />
              <YAxis tick={TICK} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line dataKey="current" name="2024" stroke="#2D1B14" strokeWidth={1.5} dot={false} />
              <Line dataKey="previous" name="2023" stroke="#2D1B14" strokeWidth={1.5} strokeDasharray="5 5" dot={false} opacity={0.35} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ChartCard title="Ticket Médio Mensal (R$) com Trendline" legend={[{ color: "#166534", label: "Ticket Médio" }]}>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={ticketMedio}>
              <CartesianGrid stroke={GRID} vertical={false} />
              <XAxis dataKey="month" tick={TICK} axisLine={false} tickLine={false} />
              <YAxis tick={TICK} axisLine={false} tickLine={false} domain={[200, 350]} />
              <Tooltip />
              <Area dataKey="ticket" fill="#166534" fillOpacity={0.05} stroke="none" />
              <Line dataKey="ticket" stroke="#166534" strokeWidth={1.5} dot={{ fill: "#166534", r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Ranking de Rentabilidade por Região">
          <div className="px-1">
            <table className="w-full text-[12px]">
              <thead>
                <tr style={{ borderBottom: "1px solid #E2E0DC" }}>
                  <th className="text-left py-2 label-upper">Região</th>
                  <th className="text-right py-2 label-upper">Margem</th>
                  <th className="text-right py-2 label-upper">Status</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                <RankRow region="Pacific" margin="45.2%" positive />
                <RankRow region="N. America" margin="42.1%" positive />
                <RankRow region="Europe" margin="38.4%" positive />
                <tr><td colSpan={3} className="py-2" style={{ borderBottom: "1px solid #E2E0DC" }} /></tr>
                <RankRow region="S. America" margin="35.0%" positive={false} />
                <RankRow region="Africa" margin="31.2%" positive={false} />
                <RankRow region="M. East" margin="28.7%" positive={false} />
              </tbody>
            </table>
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

const RankRow = ({ region, margin, positive }: { region: string; margin: string; positive: boolean }) => (
  <tr style={{ borderBottom: "1px solid #E2E0DC" }} className="hover:bg-background transition-colors">
    <td className="py-2.5 text-foreground font-sans text-[12px]">{region}</td>
    <td className="py-2.5 text-right text-[12px]">{margin}</td>
    <td className="py-2.5 text-right">
      <span className="flex items-center justify-end gap-1.5" style={{ color: positive ? "#166534" : "hsl(0 84.2% 60.2%)" }}>
        <span className="w-[6px] h-[6px] rounded-full inline-block" style={{ background: positive ? "#166534" : "hsl(0,84.2%,60.2%)" }} />
        <span className="text-[11px] font-medium">{positive ? "Top" : "Low"}</span>
      </span>
    </td>
  </tr>
);

export default TabExecutive;
