import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  trend?: string;
  trendPositive?: boolean;
  subtitle?: string;
}

const KPICard = ({ title, value, trend, trendPositive, subtitle }: KPICardProps) => {
  return (
    <div className="bg-card border border-border rounded-md p-5 card-hover">
      <p className="text-[0.8125rem] font-medium text-muted-foreground tracking-wide uppercase mb-1">
        {title}
      </p>
      <p className="text-[2.25rem] font-semibold font-mono tracking-tight text-foreground leading-tight">
        {value}
      </p>
      {trend && (
        <p className={cn(
          "text-[0.8125rem] font-mono mt-1",
          trendPositive ? "text-success" : "text-destructive"
        )}>
          {trendPositive ? "▲" : "▼"} {trend}
        </p>
      )}
      {subtitle && (
        <p className="text-[0.75rem] text-muted-foreground mt-1">{subtitle}</p>
      )}
    </div>
  );
};

export default KPICard;
