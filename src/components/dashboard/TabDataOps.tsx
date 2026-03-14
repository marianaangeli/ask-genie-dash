import KPICard from "./KPICard";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

const dataVolume = [
  { month: "Jan", bronze: 120, silver: 85, gold: 45 },
  { month: "Fev", bronze: 135, silver: 95, gold: 52 },
  { month: "Mar", bronze: 148, silver: 105, gold: 58 },
  { month: "Abr", bronze: 160, silver: 115, gold: 65 },
  { month: "Mai", bronze: 175, silver: 128, gold: 72 },
  { month: "Jun", bronze: 190, silver: 140, gold: 80 },
  { month: "Jul", bronze: 210, silver: 155, gold: 88 },
  { month: "Ago", bronze: 225, silver: 168, gold: 95 },
  { month: "Set", bronze: 240, silver: 180, gold: 102 },
  { month: "Out", bronze: 255, silver: 192, gold: 110 },
  { month: "Nov", bronze: 270, silver: 205, gold: 118 },
  { month: "Dez", bronze: 290, silver: 220, gold: 128 },
];

const pipelineExecution = [
  { day: "Seg", time: 12.5 }, { day: "Ter", time: 11.8 },
  { day: "Qua", time: 13.2 }, { day: "Qui", time: 10.9 },
  { day: "Sex", time: 14.1 }, { day: "Sáb", time: 9.5 },
  { day: "Dom", time: 8.8 },
];

const qualityFailures = [
  { cycle: "C1", failures: 3 }, { cycle: "C2", failures: 1 },
  { cycle: "C3", failures: 5 }, { cycle: "C4", failures: 2 },
  { cycle: "C5", failures: 0 }, { cycle: "C6", failures: 4 },
  { cycle: "C7", failures: 1 }, { cycle: "C8", failures: 2 },
  { cycle: "C9", failures: 0 }, { cycle: "C10", failures: 3 },
];

const TabDataOps = () => {
  return (
    <div className="space-y-6">
      {/* Status KPIs */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-md p-5 card-hover">
          <p className="text-[0.8125rem] font-medium text-muted-foreground tracking-wide uppercase mb-2">
            Última Execução
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse-dot" />
            <span className="text-[1.125rem] font-semibold text-foreground">Sucesso</span>
          </div>
          <p className="text-[0.75rem] text-muted-foreground font-mono mt-1.5">
            14/03/2026 — 06:45:22
          </p>
        </div>
        <KPICard title="Volume Total" value="638 GB" trend="+18% vs mês anterior" trendPositive />
        <KPICard title="Tempo Médio Pipeline" value="11,5 min" trend="-2.1 min vs anterior" trendPositive />
        <KPICard title="Taxa de Sucesso" value="97,3%" trend="21/22 ciclos ok" trendPositive />
      </div>

      {/* Area + Pipeline */}
      <div className="grid grid-cols-2 gap-6">
        <ChartCard title="Volume de Dados por Camada (GB)">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={dataVolume}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="bronze" name="Bronze" stackId="1" fill="rgba(45, 27, 20, 0.15)" stroke="rgba(45, 27, 20, 0.3)" strokeWidth={1} />
              <Area type="monotone" dataKey="silver" name="Silver" stackId="1" fill="rgba(45, 27, 20, 0.35)" stroke="rgba(45, 27, 20, 0.6)" strokeWidth={1} />
              <Area type="monotone" dataKey="gold" name="Gold" stackId="1" fill="#D97706" stroke="#D97706" strokeWidth={1.5} fillOpacity={0.8} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Tempo de Execução do Pipeline (min)">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={pipelineExecution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} domain={[6, 16]} />
              <Tooltip />
              <Line dataKey="time" name="Tempo (min)" stroke="#2D1B14" strokeWidth={2} dot={{ fill: "#2D1B14", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Quality Monitor */}
      <ChartCard title="Monitor de Qualidade — Falhas por Ciclo de Integridade">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={qualityFailures}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis dataKey="cycle" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="failures" name="Falhas" fill="#2D1B14" radius={[3, 3, 0, 0]} barSize={20} />
          </BarChart>
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

export default TabDataOps;
