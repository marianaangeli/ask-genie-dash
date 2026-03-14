import KPICard from "./KPICard";
import ChartCard from "./ChartCard";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
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

const TICK = { fontSize: 10, fill: "#6B6560" };
const GRID = "rgba(0,0,0,0.05)";

const TabDataOps = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-card rounded-[10px] p-[20px_22px]" style={{ border: "1px solid #E2E0DC" }}>
          <p className="label-upper mb-2">Última Execução</p>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full animate-pulse-dot" style={{ background: "#166534" }} />
            <span className="value-metric" style={{ fontSize: "18px" }}>Sucesso</span>
          </div>
          <p className="text-[11px] text-[#6B6560] font-mono mt-1.5">
            14/03/2026 — 06:45:22
          </p>
        </div>
        <KPICard title="Volume Total" value="638 GB" trend="+18% vs mês anterior" trendPositive />
        <KPICard title="Tempo Médio Pipeline" value="11,5 min" trend="-2.1 min vs anterior" trendPositive />
        <KPICard title="Taxa de Sucesso" value="97,3%" trend="21/22 ciclos ok" trendPositive />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ChartCard title="Volume de Dados por Camada (GB)" legend={[{ color: "#D3D1C7", label: "Bronze" }, { color: "#888780", label: "Silver" }, { color: "#D97706", label: "Gold" }]}>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={dataVolume}>
              <CartesianGrid stroke={GRID} vertical={false} />
              <XAxis dataKey="month" tick={TICK} axisLine={false} tickLine={false} />
              <YAxis tick={TICK} axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="bronze" name="Bronze" stackId="1" fill="#D3D1C7" stroke="#D3D1C7" strokeWidth={1} />
              <Area type="monotone" dataKey="silver" name="Silver" stackId="1" fill="#888780" stroke="#888780" strokeWidth={1} />
              <Area type="monotone" dataKey="gold" name="Gold" stackId="1" fill="#D97706" stroke="#D97706" strokeWidth={1.5} fillOpacity={0.9} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Tempo de Execução do Pipeline (min)" legend={[{ color: "#2D1B14", label: "Tempo (min)" }]}>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={pipelineExecution}>
              <CartesianGrid stroke={GRID} vertical={false} />
              <XAxis dataKey="day" tick={TICK} axisLine={false} tickLine={false} />
              <YAxis tick={TICK} axisLine={false} tickLine={false} domain={[6, 16]} />
              <Tooltip />
              <Line dataKey="time" name="Tempo (min)" stroke="#2D1B14" strokeWidth={1.5} dot={{ fill: "#2D1B14", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Monitor de Qualidade — Falhas por Ciclo" legend={[{ color: "#2D1B14", label: "Falhas" }]}>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={qualityFailures}>
            <CartesianGrid stroke={GRID} vertical={false} />
            <XAxis dataKey="cycle" tick={TICK} axisLine={false} tickLine={false} />
            <YAxis tick={TICK} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="failures" name="Falhas" fill="#2D1B14" radius={[3, 3, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
};

export default TabDataOps;
