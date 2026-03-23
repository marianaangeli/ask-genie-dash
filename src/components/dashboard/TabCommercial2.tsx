import KPICard from "./KPICard";
import ChartCard from "./ChartCard";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell
} from "recharts";

const GRID = "rgba(0,0,0,0.05)";
const TICK = { fontSize: 10, fill: "#6B6560" };

/* ── Bloco 1 ── */
const pedidosMes = [
  { mes: "Jan", pedidos: 890 }, { mes: "Fev", pedidos: 920 }, { mes: "Mar", pedidos: 1050 },
  { mes: "Abr", pedidos: 980 }, { mes: "Mai", pedidos: 1100 }, { mes: "Jun", pedidos: 1080 },
  { mes: "Jul", pedidos: 1200 }, { mes: "Ago", pedidos: 1150 }, { mes: "Set", pedidos: 1020 },
  { mes: "Out", pedidos: 1180 }, { mes: "Nov", pedidos: 1300 }, { mes: "Dez", pedidos: 1450 },
];

const canalVendas = [
  { name: "Online", value: 27.6, color: "#166534" },
  { name: "Loja Física", value: 45.2, color: "#2D1B14" },
  { name: "Revendedor", value: 18.9, color: "#D97706" },
  { name: "Catálogo", value: 8.3, color: "#D3D1C7" },
];

const pagamento = [
  { name: "Cartão de Crédito", value: 48, color: "#2D1B14" },
  { name: "Boleto", value: 27, color: "#D97706" },
  { name: "Pix", value: 18, color: "#166534" },
  { name: "Outros", value: 7, color: "#D3D1C7" },
];

const motivoCompra = [
  { name: "Qualidade", pct: 38 },
  { name: "Preço", pct: 27 },
  { name: "Indicação", pct: 18 },
  { name: "Promoção", pct: 12 },
  { name: "Outros", pct: 5 },
];

/* ── Bloco 2 ── */
const marketShare = [
  { territory: "Southwest", pct: 26 },
  { territory: "Canada", pct: 19 },
  { territory: "Australia", pct: 16 },
  { territory: "Northwest", pct: 15 },
  { territory: "France", pct: 12 },
  { territory: "Germany", pct: 11 },
  { territory: "Central", pct: 10 },
  { territory: "UK", pct: 9 },
  { territory: "Northeast", pct: 8 },
  { territory: "Southeast", pct: 6 },
];

const receitaTerritorio = [
  { territory: "Southwest", revenue: 18.1 },
  { territory: "Canada", revenue: 14.6 },
  { territory: "Australia", revenue: 11.9 },
  { territory: "Northwest", revenue: 13.4 },
  { territory: "France", revenue: 11.3 },
  { territory: "Germany", revenue: 9.9 },
  { territory: "Central", revenue: 10.5 },
  { territory: "UK", revenue: 8.1 },
  { territory: "Northeast", revenue: 8.3 },
  { territory: "Southeast", revenue: 5.2 },
];

/* ── Bloco 3 ── */
const topClientes = [
  { cliente: "Jon Yang", territory: "Australia", primeiro: "01/07/2001", total: "$13.490", status: "Alto Valor" },
  { cliente: "Eugene Huang", territory: "Australia", primeiro: "01/07/2001", total: "$12.977", status: "Alto Valor" },
  { cliente: "Ruben Torres", territory: "Australia", primeiro: "01/07/2001", total: "$12.716", status: "Alto Valor" },
  { cliente: "Christy Zhu", territory: "Australia", primeiro: "01/07/2001", total: "$12.435", status: "Alto Valor" },
  { cliente: "Elizabeth Johnson", territory: "Australia", primeiro: "01/07/2001", total: "$11.892", status: "Alto Valor" },
  { cliente: "Julio Ruiz", territory: "Canada", primeiro: "01/07/2001", total: "$2.100", status: "Inativo" },
  { cliente: "Janet Alvarez", territory: "Canada", primeiro: "01/07/2001", total: "$1.890", status: "Inativo" },
  { cliente: "Marco Mehta", territory: "France", primeiro: "01/07/2001", total: "$1.650", status: "Inativo" },
];

const SectionDivider = ({ label }: { label: string }) => (
  <div style={{ marginTop: 8, borderTop: "1px solid #E2E0DC", paddingTop: 16 }}>
    <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.07em", color: "#6B6560" }}>
      {label}
    </span>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const isAlto = status === "Alto Valor";
  return (
    <span
      style={{
        background: isAlto ? "rgba(22,101,52,0.1)" : "rgba(217,119,6,0.1)",
        color: isAlto ? "#166534" : "#D97706",
        padding: "2px 8px",
        borderRadius: 4,
        fontSize: 11,
        fontWeight: 500,
      }}
    >
      {status}
    </span>
  );
};

const TabCommercial2 = () => (
  <div className="space-y-4">
    {/* ═══ BLOCO 1 — Análise por Pedido ═══ */}
    <SectionDivider label="Análise por Pedido" />

    <div className="grid grid-cols-2 gap-4">
      <ChartCard title="Pedidos por Mês">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={pedidosMes}>
            <CartesianGrid stroke={GRID} vertical={false} />
            <XAxis dataKey="mes" tick={TICK} axisLine={false} tickLine={false} />
            <YAxis tick={TICK} axisLine={false} tickLine={false} />
            <Tooltip />
            <Bar dataKey="pedidos" name="Pedidos" fill="#2D1B14" radius={[3, 3, 0, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Canal de Vendas">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={canalVendas} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} strokeWidth={0}>
              {canalVendas.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(v: number) => `${v}%`} />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 8 }}>
          {canalVendas.map((p) => (
            <div key={p.name} className="flex items-center gap-1.5">
              <span className="inline-block w-[9px] h-[9px] rounded-[2px]" style={{ background: p.color }} />
              <span className="text-[11px] text-[#6B6560]">{p.name} {p.value}%</span>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <ChartCard title="Pedidos por Mês">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={pedidosMes}>
            <CartesianGrid stroke={GRID} vertical={false} />
            <XAxis dataKey="mes" tick={TICK} axisLine={false} tickLine={false} />
            <YAxis tick={TICK} axisLine={false} tickLine={false} />
            <Tooltip />
            <Bar dataKey="pedidos" name="Pedidos" fill="#2D1B14" radius={[3, 3, 0, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Distribuição por Método de Pagamento">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={pagamento} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} strokeWidth={0}>
              {pagamento.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(v: number) => `${v}%`} />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 8 }}>
          {pagamento.map((p) => (
            <div key={p.name} className="flex items-center gap-1.5">
              <span className="inline-block w-[9px] h-[9px] rounded-[2px]" style={{ background: p.color }} />
              <span className="text-[11px] text-[#6B6560]">{p.name} {p.value}%</span>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>

    <ChartCard title="Motivo de Compra">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={motivoCompra} layout="vertical">
          <CartesianGrid stroke={GRID} horizontal={false} />
          <XAxis type="number" tick={TICK} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
          <YAxis type="category" dataKey="name" tick={TICK} axisLine={false} tickLine={false} width={80} />
          <Tooltip formatter={(v: number) => `${v}%`} />
          <Bar dataKey="pct" name="%" fill="#D97706" radius={[0, 3, 3, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>

    {/* ═══ BLOCO 2 — Análise por Região ═══ */}
    <SectionDivider label="Análise por Região" />

    <div className="grid grid-cols-2 gap-4">
      <ChartCard title="Participação de Mercado por Território">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={marketShare} layout="vertical">
            <CartesianGrid stroke={GRID} horizontal={false} />
            <XAxis type="number" tick={TICK} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
            <YAxis type="category" dataKey="territory" tick={TICK} axisLine={false} tickLine={false} width={80} />
            <Tooltip formatter={(v: number) => `${v}%`} />
            <Bar dataKey="pct" name="Market Share" fill="#166534" radius={[0, 3, 3, 0]} barSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Receita por Território (USD)">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={receitaTerritorio} layout="vertical">
            <CartesianGrid stroke={GRID} horizontal={false} />
            <XAxis type="number" tick={TICK} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} />
            <YAxis type="category" dataKey="territory" tick={TICK} axisLine={false} tickLine={false} width={80} />
            <Tooltip formatter={(v: number) => `$${v}M`} />
            <Bar dataKey="revenue" name="Receita" fill="#2D1B14" radius={[0, 3, 3, 0]} barSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>

    {/* ═══ BLOCO 3 — Análise por Clientes ═══ */}
    <SectionDivider label="Análise por Clientes" />

    <div className="grid grid-cols-2 gap-4">
      <KPICard title="Clientes de Alto Valor" value="487" subtitle="receita > $5.000" />
      <KPICard title="Clientes Inativos" value="523" subtitle="sem compra há +180 dias" />
    </div>

    <ChartCard title="Segmentação de Clientes">
      <table className="w-full text-[12px]">
        <thead>
          <tr style={{ borderBottom: "1px solid #E2E0DC" }}>
            <th className="text-left py-2 label-upper">Cliente</th>
            <th className="text-left py-2 label-upper">Território</th>
            <th className="text-left py-2 label-upper">Primeiro Pedido</th>
            <th className="text-right py-2 label-upper">Total Gasto</th>
            <th className="text-left py-2 pl-4 label-upper">Status</th>
          </tr>
        </thead>
        <tbody className="font-mono">
          {topClientes.map((c) => (
            <tr key={c.cliente} style={{ borderBottom: "1px solid #E2E0DC" }} className="hover:bg-background transition-colors">
              <td className="py-2.5 text-foreground font-sans">{c.cliente}</td>
              <td className="py-2.5 font-sans">{c.territory}</td>
              <td className="py-2.5">{c.primeiro}</td>
              <td className="py-2.5 text-right">{c.total}</td>
              <td className="py-2.5 pl-4"><StatusBadge status={c.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </ChartCard>
  </div>
);

export default TabCommercial2;
