import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import TabExecutive from "@/components/dashboard/TabExecutive";
import TabCommercial from "@/components/dashboard/TabCommercial";
import TabCommercial2 from "@/components/dashboard/TabCommercial2";
import TabDataOps from "@/components/dashboard/TabDataOps";

const tabs = [
  { id: "executive", label: "Patrocínio Executivo" },
  { id: "commercial", label: "Diretoria Comercial" },
  { id: "commercial2", label: "Diretoria Comercial II" },
  { id: "dataops", label: "Data Ops" },
] as const;

type TabId = typeof tabs[number]["id"];

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>("executive");

  return (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation */}
        <header className="h-[52px] border-b border-border bg-card px-8 flex items-center justify-between shrink-0">
          <nav className="flex items-center gap-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 h-[52px] text-[12.5px] font-medium tracking-[0.04em] uppercase transition-colors relative ${
                  activeTab === tab.id
                    ? "text-foreground"
                    : "text-[#6B6560] hover:text-foreground"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-success" />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 text-[11px] text-[#6B6560] font-mono">
            <span className="w-[5px] h-[5px] rounded-full bg-success inline-block" />
            <span>Atualizado há 11 min</span>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-7 px-8 overflow-auto">
          <h1 className="sr-only">Adventure Works Heritage BI Dashboard</h1>
          {activeTab === "executive" && <TabExecutive />}
          {activeTab === "commercial" && <TabCommercial />}
          {activeTab === "commercial2" && <TabCommercial2 />}
          {activeTab === "dataops" && <TabDataOps />}
        </main>
      </div>
    </div>
  );
};

export default Index;
