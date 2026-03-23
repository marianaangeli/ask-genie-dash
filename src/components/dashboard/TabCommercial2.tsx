import KPICard from "./KPICard";
import ChartCard from "./ChartCard";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, ComposedChart, Line
} from "recharts";

const GRID = "rgba(0,0,0,0.05)";
const TICK = { fontSize: 10, fill: "#6B6560" };

/* ── Bloco 1 ── */
const pedidosPorAno = [
  { ano: "2001", pedidos: 1379 },
  { ano: "2002", pedidos: 3806 },
  { ano: "2003", pedidos: 14182 },
  { ano: "2004", pedidos: 12098 },
];

const pagamento = [
  { name: "Cartão de Crédito", value: 48, color: "#2D1B14" },
  { name: "Cheque", value: 30, color: "#D97706" },
  { name: "Transferência", value: 15, color: "#166534" },
  { name: "Outros", value: 7, color: "#D3D1C7" },
];

const categorias = [
  { name: "Bikes", pct: 63 },
  { name: "Components", pct: 20 },
  { name: "Clothing", pct: 9 },
  { name: "Accessories", pct: 8 },
];

/* ── Bloco 2 ── */
const receitaTerritorio = [
  { territory: "Southwest", revenue: 18.1 },
  { territory: "Northwest", revenue: 13.4 },
  { territory: "Canada", revenue: 14.6 },
  { territory: "Australia", revenue: 11.9 },
  { territory: "France", revenue: 11.3 },
  { territory: "Central", revenue: 10.5 },
  { territory: "Germany", revenue: 9.9 },
  { territory: "Northeast", revenue: 8.3 },
  { territory: "UK", revenue: 8.1 },
  { territory: "Southeast", revenue: 5.2 },
];

const pedidosTicketTerritorio = [
  { territory: "Southwest", pedidos: 9840, ticket: 1841 },
  { territory: "Northwest", pedidos: 8110, ticket: 1652 },
  { territory: "Central", pedidos: 4230, ticket: 2484 },
  { territory: "Northeast", pedidos: 3720, ticket: 2231 },
  { territory: "Southeast", pedidos: 2140, ticket: 2430 },
  { territory: "Canada", pedidos: 6890, ticket: 2120 },
  { territory: "France", pedidos: 5650, ticket: 2001 },
  { territory: "Germany", pedidos: 4110, ticket: 2409 },
  { territory: "Australia", pedidos: 5920, ticket: 2011 },
  { territory: "UK", pedidos: 3850, ticket: 2104 },
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
  <div style={{ marginTop: 32, borderTop: "1px solid #E2E0DC", paddingTop: 12 }}>
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

const TabCommercial2 = () => {
  return (
    <div className="space-y-4">
      {/* ═══ BLOCO 1 — Análise por Pedido ═══ */}
      <SectionDivider label="Análise por Pedido" />

      <div className="grid grid-cols-4 gap-4">
        <KPICard title="Total de Pedidos" value="31.465" />
        <KPICard title="Ticket Médio" value="R$ 1.637" />
        <KPICard title="Itens por Pedido" value="4,6" />
        <KPICard title="Pedidos Online" value="27,6%" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Pedidos por Ano */}
        <ChartCard title="Pedidos por Ano">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={pedidosPorAno}>
              <CartesianGrid stroke={GRID} vertical={false} />
              <XAxis dataKey="ano" tick={TICK} axisLine={false} tickLine={false} />
              <YAxis tick={TICK} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="pedidos" name="Pedidos" fill="#2D1B14" radius={[3, 3, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Distribuição por Método de Pagamento */}
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

        {/* Top 5 Categorias */}
        <ChartCard title="Top Categorias por Pedidos">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={categorias} layout="vertical">
              <CartesianGrid stroke={GRID} horizontal={false} />
              <XAxis type="number" tick={TICK} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <YAxis type="category" dataKey="name" tick={TICK} axisLine={false} tickLine={false} width={90} />
              <Tooltip formatter={(v: number) => `${v}%`} />
              <Bar dataKey="pct" name="Pedidos %" fill="#D97706" radius={[0, 3, 3, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* ═══ BLOCO 2 — Análise por Região ═══ */}
      <SectionDivider label="Análise por Região" />

      <div className="grid grid-cols-2 gap-4">
        {/* Receita por Território */}
        <ChartCard title="Receita por Território">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={receitaTerritorio} layout="vertical">
              <CartesianGrid stroke={GRID} horizontal={false} />
              <XAxis type="number" tick={TICK} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} />
              <YAxis type="category" dataKey="territory" tick={TICK} axisLine={false} tickLine={false} width={80} />
              <Tooltip formatter={(v: number) => `$${v}M`} />
              <Bar dataKey="revenue" name="Receita" fill="#166534" radius={[0, 3, 3, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Pedidos × Ticket Médio por Território */}
        <ChartCard
          title="Pedidos × Ticket Médio por Território"
          legend={[
            { color: "#D3D1C7", label: "Pedidos" },
            { color: "#2D1B14", label: "Ticket Médio" },
          ]}
        >
          <ResponsiveContainer width="100%" height={320}>
            <ComposedChart data={pedidosTicketTerritorio}>
              <CartesianGrid stroke={GRID} vertical={false} />
              <XAxis dataKey="territory" tick={TICK} axisLine={false} tickLine={false} angle={-30} textAnchor="end" height={50} />
              <YAxis yAxisId="left" tick={TICK} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={TICK} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip />
              <Bar yAxisId="left" dataKey="pedidos" name="Pedidos" fill="#D3D1C7" stroke="#2D1B14" strokeWidth={1} radius={[3, 3, 0, 0]} barSize={28} />
              <Line yAxisId="right" dataKey="ticket" name="Ticket Médio" stroke="#2D1B14" strokeWidth={1.5} dot={{ fill: "#2D1B14", r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* ═══ BLOCO 3 — Análise por Clientes ═══ */}
      <SectionDivider label="Análise por Clientes" />

      <div className="grid grid-cols-2 gap-4">
        <KPICard title="Total de Clientes" value="19.119" />
        <KPICard title="Clientes com mais de 1 compra" value="9.132" />
      </div>

      <ChartCard title="Top Clientes por Receita Total">
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
};

export default TabCommercial2;
