import { useState } from "react";
import { Filter, ChevronDown, Sparkles } from "lucide-react";
import logo from "@/assets/logo-adventure-works.png";

const DashboardSidebar = () => {
  const [dateFrom, setDateFrom] = useState("2024-01-01");
  const [dateTo, setDateTo] = useState("2024-12-31");
  const [region, setRegion] = useState("All");
  const [category, setCategory] = useState("All");

  return (
    <aside className="w-[260px] min-h-screen bg-sidebar flex flex-col shrink-0">
      {/* Logo */}
      <div className="p-6 flex items-center justify-center border-b border-sidebar-border">
        <img src={logo} alt="Adventure Works" className="w-28 h-28 rounded-full opacity-90" />
      </div>

      {/* Filters Header */}
      <div className="px-5 pt-5 pb-3 flex items-center gap-2">
        <Filter className="w-4 h-4 text-sidebar-muted" />
        <span className="text-[0.8125rem] font-semibold text-sidebar-foreground tracking-wider uppercase">
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
            className="w-full bg-sidebar-accent text-sidebar-foreground text-[0.8125rem] px-3 py-2 rounded-md border border-sidebar-border focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </FilterField>

        <FilterField label="Data Fim">
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-full bg-sidebar-accent text-sidebar-foreground text-[0.8125rem] px-3 py-2 rounded-md border border-sidebar-border focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </FilterField>

        <FilterField label="Região">
          <div className="relative">
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full appearance-none bg-sidebar-accent text-sidebar-foreground text-[0.8125rem] px-3 py-2 rounded-md border border-sidebar-border focus:outline-none focus:ring-1 focus:ring-accent"
            >
              <option>All</option>
              <option>North America</option>
              <option>Europe</option>
              <option>Pacific</option>
              <option>South America</option>
            </select>
            <ChevronDown className="absolute right-2 top-2.5 w-3.5 h-3.5 text-sidebar-muted pointer-events-none" />
          </div>
        </FilterField>

        <FilterField label="Categoria">
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none bg-sidebar-accent text-sidebar-foreground text-[0.8125rem] px-3 py-2 rounded-md border border-sidebar-border focus:outline-none focus:ring-1 focus:ring-accent"
            >
              <option>All</option>
              <option>Bikes</option>
              <option>Components</option>
              <option>Clothing</option>
              <option>Accessories</option>
            </select>
            <ChevronDown className="absolute right-2 top-2.5 w-3.5 h-3.5 text-sidebar-muted pointer-events-none" />
          </div>
        </FilterField>
      </div>

      {/* Ask Genie Button */}
      <div className="p-5">
        <button className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground font-semibold text-[0.8125rem] py-2.5 rounded-md shadow-[0_0_15px_rgba(217,119,6,0.3)] hover:shadow-[0_0_20px_rgba(217,119,6,0.4)] transition-shadow">
          <Sparkles className="w-4 h-4" />
          Ask Genie
        </button>
      </div>
    </aside>
  );
};

const FilterField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-[0.75rem] text-sidebar-muted font-medium mb-1.5 tracking-wide">
      {label}
    </label>
    {children}
  </div>
);

export default DashboardSidebar;
