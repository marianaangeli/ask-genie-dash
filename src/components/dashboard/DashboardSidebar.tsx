import { useState } from "react";
import { Filter, ChevronDown, HelpCircle } from "lucide-react";
import logo from "@/assets/logo-adventure-works.png";

const DashboardSidebar = () => {
  const [dateFrom, setDateFrom] = useState("2024-01-01");
  const [dateTo, setDateTo] = useState("2024-12-31");
  const [region, setRegion] = useState("All");
  const [category, setCategory] = useState("All");

  return (
    <aside className="w-[260px] min-h-screen bg-sidebar flex flex-col shrink-0">
      {/* Logo */}
      <div className="flex items-center justify-center" style={{ padding: "28px 0 24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <img src={logo} alt="Adventure Works" className="w-28 h-28 rounded-full opacity-90" />
      </div>

      {/* Filters Header */}
      <div className="px-5 pt-5 pb-3 flex items-center gap-2">
        <Filter className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.5)" }} />
        <span className="text-[11px] font-medium text-sidebar-foreground tracking-[0.07em] uppercase">
          Filtros Globais
        </span>
      </div>

      {/* Filter Fields */}
      <div className="px-5 space-y-4 flex-1">
        <FilterField label="Data Início">
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-full text-sidebar-foreground text-[12px] px-3 py-2 rounded-[6px] focus:outline-none focus:ring-1 focus:ring-accent"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          />
        </FilterField>

        <FilterField label="Data Fim">
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-full text-sidebar-foreground text-[12px] px-3 py-2 rounded-[6px] focus:outline-none focus:ring-1 focus:ring-accent"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          />
        </FilterField>

        <FilterField label="Região">
          <div className="relative">
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full appearance-none text-sidebar-foreground text-[12px] px-3 py-2 rounded-[6px] focus:outline-none focus:ring-1 focus:ring-accent"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <option>All</option>
              <option>North America</option>
              <option>Europe</option>
              <option>Pacific</option>
              <option>South America</option>
            </select>
            <ChevronDown className="absolute right-2 top-2.5 w-3.5 h-3.5 pointer-events-none" style={{ color: "rgba(255,255,255,0.4)" }} />
          </div>
        </FilterField>

        <FilterField label="Categoria">
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none text-sidebar-foreground text-[12px] px-3 py-2 rounded-[6px] focus:outline-none focus:ring-1 focus:ring-accent"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <option>All</option>
              <option>Bikes</option>
              <option>Components</option>
              <option>Clothing</option>
              <option>Accessories</option>
            </select>
            <ChevronDown className="absolute right-2 top-2.5 w-3.5 h-3.5 pointer-events-none" style={{ color: "rgba(255,255,255,0.4)" }} />
          </div>
        </FilterField>
      </div>

      {/* Ask Genie Button */}
      <div style={{ margin: "0 20px 28px" }}>
        <button
          className="w-full flex items-center justify-center gap-2 rounded-[6px] transition-colors hover:opacity-90"
          style={{ background: "#D97706", color: "#2D1B14", fontSize: "12px", fontWeight: 500, padding: "10px 0" }}
        >
          <HelpCircle className="w-4 h-4" />
          Ask Genie
        </button>
      </div>
    </aside>
  );
};

const FilterField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-[11px] font-normal mb-1.5 tracking-wide" style={{ color: "rgba(255,255,255,0.5)" }}>
      {label}
    </label>
    {children}
  </div>
);

export default DashboardSidebar;
