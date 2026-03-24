import KPICard from "./KPICard";
import ChartCard from "./ChartCard";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, ComposedChart, Line
} from "recharts";

const GRID = "rgba(0,0,0,0.05)";
const TICK = { fontSize: 10, fill: "#6B6560" };

/* ── Dados: Pedidos × Ticket ── */
const pedidosTicketRegiao = [
  { region: "N. America", orders: 4500, ticketMedio: 285 },
  { region: "Europe", orders: 3200, ticketMedio: 310 },
  { region: "Pacific", orders: 2100, ticketMedio: 270 },
  { region: "S. America", orders: 1800, ticketMedio: 245 },
  { region: "Africa", orders: 900, ticketMedio: 220 },
];

/* ── Dados: Clientes ── */
const clienteSegmentacao = [
  { cliente: "Jon Yang", territory: "Australia", receita: "$13.490", ultimaCompra: "12/2003", status: "Alto Valor" },
  { cliente: "Eugene Huang", territory: "Australia", receita: "$12.977", ultimaCompra: "11/2003", status: "Alto Valor" },
  { cliente: "Ruben Torres", territory: "Australia", receita: "$12.716", ultimaCompra: "10/2003", status: "Alto Valor" },
  { cliente: "Christy Zhu", territory: "Australia", receita: "$12.435", ultimaCompra: "12/2003", status: "Alto Valor" },
  { cliente: "Elizabeth Johnson", territory: "Australia", receita: "$11.892", ultimaCompra: "09/2003", status: "Alto Valor" },
  { cliente: "Julio Ruiz", territory: "Canada", receita: "$2.100", ultimaCompra: "03/2003", status: "Inativo" },
  { cliente: "Janet Alvarez", territory: "Canada", receita: "$1.890", ultimaCompra: "02/2003", status: "Inativo" },
  { cliente: "Marco Mehta", territory: "France", receita: "$1.650", ultimaCompra: "01/2003", status: "Inativo" },
];

/* ── Dados: Pedidos ── */
const metodoPagamento = [
  { name: "Cartão de Crédito", value: 48, color: "#2D1B14" },
  { name: "Cheque", value: 30, color: "#D97706" },
  { name: "Transferência", value: 15, color: "#166534" },
  { name: "Outros", value: 7, color: "#D3D1C7" },
];

const motivoCompra = [
  { name: "Preço", value: 35, color: "#2D1B14" },
  { name: "Qualidade", value: 28, color: "#166534" },
  { name: "Promoção", value: 22, color: "#D97706" },
  { name: "Marca", value: 15, color: "#888780" },
];

const itensPorCategoria = [
  { name: "Bikes", qty: 5.2 },
  { name: "Components", qty: 4.8 },
  { name: "Clothing", qty: 3.6 },
  { name: "Accessories", qty: 2.9 },
];

/* ── Dados: Market Share ── */
const marketShare = [
  { territory: "Southwest", share: 16.2 },
  { territory: "Canada", share: 13.1 },
  { territory: "Northwest", share: 12.0 },
  { territory: "Australia", share: 10.7 },
  { territory: "France", share: 10.1 },
  { territory: "Central", share: 9.4 },
  { territory: "Germany", share: 8.9 },
  { territory: "Northeast", share: 7.4 },
  { territory: "UK", share: 7.3 },
  { territory: "Southeast", share: 4.9 },
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

const DonutLegend = ({ data }: { data: { name: string; value: number; color: string }[] }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 8 }}>
    {data.map((p) => (
      <div key={p.name} className="flex items-center gap-1.5">
        <span className="inline-block w-[9px] h-[9px] rounded-[2px]" style={{ background: p.color }} />
        <span className="text-[11px] text-[#6B6560]">{p.name} {p.value}%</span>
      </div>
    ))}
  </div>
);

const TabCommercial2 = () => {
  return (
    <div className="space-y-4">
      {/* ═══ 1. RESUMO DE PERFORMANCE (KPIs) ═══ */}
      <div className="grid grid-cols-5 gap-4">
        <KPICard title="Taxa de Retenção" value="47,7%" trend="+3.2pp vs anterior" trendPositive subtitle="Clientes recorrentes ÷ Total" />
        <KPICard title="Total de Clientes" value="19.119" />
        <KPICard title="Clientes Recorrentes" value="9.132" subtitle="mais de 1 compra" />
        <KPICard title="Ticket Médio por Cliente" value="R$ 1.637" trend="+8.2% YoY" trendPositive />
        <KPICard title="Periodicidade Média" value="94 dias" subtitle="entre compras recorrentes" />
      </div>

      {/* ═══ 2. PERFIL DO CONSUMIDOR (Quem?) ═══ */}
      <SectionDivider label="Perfil do Consumidor" />

      <ChartCard title="Segmentação de Clientes">
        <table className="w-full text-[12px]">
          <thead>
            <tr style={{ borderBottom: "1px solid #E2E0DC" }}>
              <th className="text-left py-2 label-upper">Cliente</th>
              <th className="text-left py-2 label-upper">Território</th>
              <th className="text-right py-2 label-upper">Receita</th>
              <th className="text-left py-2 pl-4 label-upper">Última Compra</th>
              <th className="text-left py-2 pl-4 label-upper">Status</th>
            </tr>
          </thead>
          <tbody className="font-mono">
            {clienteSegmentacao.map((c) => (
              <tr key={c.cliente} style={{ borderBottom: "1px solid #E2E0DC" }} className="hover:bg-background transition-colors">
                <td className="py-2.5 text-foreground font-sans">{c.cliente}</td>
                <td className="py-2.5 font-sans">{c.territory}</td>
                <td className="py-2.5 text-right">{c.receita}</td>
                <td className="py-2.5 pl-4">{c.ultimaCompra}</td>
                <td className="py-2.5 pl-4"><StatusBadge status={c.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </ChartCard>

      {/* ═══ 3. COMPORTAMENTO DE COMPRA (Como?) ═══ */}
      <SectionDivider label="Comportamento de Compra" />

      <div className="grid grid-cols-3 gap-4">
        <ChartCard title="Método de Pagamento">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={metodoPagamento} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={70} strokeWidth={0}>
                {metodoPagamento.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <DonutLegend data={metodoPagamento} />
        </ChartCard>

        <ChartCard title="Motivo de Compra">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={motivoCompra} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={70} strokeWidth={0}>
                {motivoCompra.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <DonutLegend data={motivoCompra} />
        </ChartCard>

        <ChartCard title="Média de Itens por Pedido">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={itensPorCategoria}>
              <CartesianGrid stroke={GRID} vertical={false} />
              <XAxis dataKey="name" tick={TICK} axisLine={false} tickLine={false} />
              <YAxis tick={TICK} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="qty" name="Itens/Pedido" fill="#2D1B14" radius={[3, 3, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* ═══ 4. CONTEXTO GEOGRÁFICO (Onde?) ═══ */}
      <SectionDivider label="Contexto Geográfico" />

      <ChartCard title="Market Share por Território">
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={marketShare} layout="vertical">
            <CartesianGrid stroke={GRID} horizontal={false} />
            <XAxis type="number" tick={TICK} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
            <YAxis type="category" dataKey="territory" tick={TICK} axisLine={false} tickLine={false} width={80} />
            <Tooltip formatter={(v: number) => `${v}%`} />
            <Bar dataKey="share" name="Market Share" fill="#166534" radius={[0, 3, 3, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Pedidos × Ticket Médio por Região" legend={[{ color: "#F3F4F1", label: "Pedidos" }, { color: "#2D1B14", label: "Ticket Médio" }]}>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={pedidosTicketRegiao}>
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

export default TabCommercial2;
