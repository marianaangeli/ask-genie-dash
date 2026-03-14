interface KPICardProps {
  title: string;
  value: string;
  trend?: string;
  trendPositive?: boolean;
  subtitle?: string;
}

const KPICard = ({ title, value, trend, trendPositive, subtitle }: KPICardProps) => {
  return (
    <div className="bg-card rounded-[10px] p-[20px_22px]" style={{ border: "1px solid #E2E0DC" }}>
      <p className="label-upper mb-1.5">{title}</p>
      <p className="value-metric">{value}</p>
      {trend && (
        <p className={trendPositive ? "delta-positive mt-1.5" : "delta-negative mt-1.5"}>
          {trendPositive ? "▲" : "▼"} {trend}
        </p>
      )}
      {subtitle && (
        <p className="text-[11px] text-[#6B6560] mt-1">{subtitle}</p>
      )}
    </div>
  );
};

export default KPICard;
