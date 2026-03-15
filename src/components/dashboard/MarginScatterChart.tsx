import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip as ChartTooltip,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, LineElement, ChartTooltip);

const scatterData = [
  { x: 5, y: 52, category: "bom" },
  { x: 8, y: 48, category: "bom" },
  { x: 10, y: 45, category: "bom" },
  { x: 12, y: 43, category: "bom" },
  { x: 15, y: 41, category: "bom" },
  { x: 18, y: 38, category: "medio" },
  { x: 20, y: 36, category: "medio" },
  { x: 22, y: 34, category: "medio" },
  { x: 25, y: 32, category: "medio" },
  { x: 28, y: 29, category: "critico" },
  { x: 30, y: 27, category: "critico" },
  { x: 33, y: 24, category: "critico" },
  { x: 35, y: 21, category: "critico" },
];

const COLORS: Record<string, string> = {
  bom: "#166534",
  medio: "#D97706",
  critico: "#92400E",
};

const MarginScatterChart = () => {
  const data: any = {
    datasets: [
      {
        label: "Produtos",
        data: scatterData.map((d) => ({ x: d.x, y: d.y })),
        pointRadius: 7,
        pointBackgroundColor: scatterData.map((d) => COLORS[d.category]),
        pointBorderColor: "rgba(255,255,255,0.8)",
        pointBorderWidth: 2,
        pointHoverRadius: 9,
        pointHoverBorderColor: "#FAF5F0",
        pointHoverBorderWidth: 3,
      },
      {
        label: "Tendência",
        type: "line",
        data: [
          { x: 0, y: 55 },
          { x: 35, y: 18 },
        ],
        borderColor: "#6B6560",
        borderWidth: 1.5,
        borderDash: [6, 4],
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { top: 20, right: 20, bottom: 10, left: 10 },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#FFFFFF",
        titleColor: "#2D1B14",
        bodyColor: "#6B6560",
        borderColor: "#E2E0DC",
        borderWidth: 1,
        titleFont: { family: "DM Sans, sans-serif", size: 12, weight: "500" },
        bodyFont: { family: "DM Mono, monospace", size: 11 },
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: (items: any[]) => {
            if (!items.length) return "";
            const d = items[0].raw;
            const cat = d.category === "bom" ? "Bom" : d.category === "medio" ? "Médio" : "Crítico";
            return cat;
          },
          label: (item: any) => {
            const d = item.raw;
            return [`Desconto: ${d.x}%`, `Margem: ${d.y}%`];
          },
        },
      },
    },
    scales: {
      x: {
        type: "linear",
        min: -1,
        max: 37,
        ticks: {
          stepSize: 5,
          callback: (v: number) => `${v}%`,
          font: { family: "DM Sans, sans-serif", size: 10 },
          color: "#6B6560",
        },
        title: {
          display: true,
          text: "Desconto (%)",
          font: { family: "DM Sans, sans-serif", size: 10 },
          color: "#6B6560",
        },
        grid: { color: "rgba(0,0,0,0.06)" },
        border: { display: false },
      },
      y: {
        type: "linear",
        min: 15,
        max: 65,
        ticks: {
          stepSize: 15,
          callback: (v: number) => `${v}%`,
          font: { family: "DM Sans, sans-serif", size: 10 },
          color: "#6B6560",
        },
        title: {
          display: true,
          text: "Margem (%)",
          font: { family: "DM Sans, sans-serif", size: 10 },
          color: "#6B6560",
        },
        grid: { color: "rgba(0,0,0,0.06)" },
        border: { display: false },
      },
    },
  };

  return (
    <div
      className="bg-card rounded-[10px]"
      style={{ border: "1px solid #E2E0DC", padding: 22 }}
    >
      <h3 className="text-[13px] font-medium text-foreground tracking-[-0.01em] mb-1">
        Desempenho de Margem vs. Desconto
      </h3>

      {/* Custom Legend */}
      <div className="flex items-center gap-4 mb-4 flex-wrap">
        {[
          { color: "#166534", label: "Bom (≥40%)" },
          { color: "#D97706", label: "Médio (30–39%)" },
          { color: "#92400E", label: "Crítico (<30%)" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span
              className="inline-block w-[9px] h-[9px] rounded-[2px]"
              style={{ background: item.color }}
            />
            <span className="text-[11px]" style={{ color: "#6B6560" }}>
              {item.label}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-4"
            style={{ borderTop: "2px dashed #6B6560", height: 0 }}
          />
          <span className="text-[11px]" style={{ color: "#6B6560" }}>
            Tendência
          </span>
        </div>
      </div>

      <div style={{ width: "100%", height: 280 }}>
        <Scatter data={data} options={options} />
      </div>
    </div>
  );
};

export default MarginScatterChart;
