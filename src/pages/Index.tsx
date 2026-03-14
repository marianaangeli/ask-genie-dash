import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import TabExecutive from "@/components/dashboard/TabExecutive";
import TabCommercial from "@/components/dashboard/TabCommercial";
import TabDataOps from "@/components/dashboard/TabDataOps";

const tabs = [
  { id: "executive", label: "Patrocínio Executivo", emoji: "📊" },
  { id: "commercial", label: "Diretoria Comercial", emoji: "🎯" },
  { id: "dataops", label: "Data Ops", emoji: "⚙️" },
] as const;

type TabId = typeof tabs[number]["id"];

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>("executive");

  return (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation */}
        <header className="h-[56px] border-b border-border bg-card px-6 flex items-center justify-between shrink-0">
          <nav className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-4 text-[13px] font-semibold tracking-wider uppercase transition-colors relative ${
                  activeTab === tab.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="mr-1.5">{tab.emoji}</span>
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-success" />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3 text-[0.75rem] text-muted-foreground font-mono">
            <span>↻ Atualizado há 11 min</span>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="sr-only">Adventure Works Heritage BI Dashboard</h1>
          {activeTab === "executive" && <TabExecutive />}
          {activeTab === "commercial" && <TabCommercial />}
          {activeTab === "dataops" && <TabDataOps />}
        </main>
      </div>
    </div>
  );
};

export default Index;
