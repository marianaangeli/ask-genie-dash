interface ChartCardProps {
  title: string;
  legend?: { color: string; label: string }[];
  extra?: React.ReactNode;
  children: React.ReactNode;
}

const ChartCard = ({ title, legend, extra, children }: ChartCardProps) => (
  <div className="bg-card rounded-[10px] p-[20px_22px]" style={{ border: "1px solid #E2E0DC" }}>
    <div className="flex items-center justify-between mb-1">
      <h3 className="text-[13px] font-medium text-foreground tracking-[-0.01em]">{title}</h3>
      {legend && legend.length > 0 && (
        <div className="flex items-center gap-4">
          {legend.map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span
                className="inline-block w-[9px] h-[9px] rounded-[2px]"
                style={{ background: item.color }}
              />
              <span className="text-[11px] text-[#6B6560]">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
    {extra && <div className="mb-3">{extra}</div>}
    {children}
  </div>
);

export default ChartCard;
