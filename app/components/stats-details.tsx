import { cn } from "../lib/utils";

export default function StatsDetail({
  statName,
  value,
  className,
  rowColor,
}: {
  statName: string;
  value: number;
  className?: string;
  rowColor?: string;
}) {
  return (
    <div className={cn("grid grid-cols-5 gap-4", className)}>
      <div className={cn("col-span-3 px-4 py-3 rounded", rowColor)}>
        <p className="font-bold text-[#0F172A]">
          {statName[0].toUpperCase() + statName.slice(1)}
        </p>
      </div>
      <div className={cn("col-span-2 px-4 py-3 rounded", rowColor)}>
        <p className="font-bold text-[#0F172A] text-right">{value}</p>
      </div>
    </div>

    // <div className="grid grid-cols-5 gap-4">
    //   <div className="col-span-3 bg-red-200">bg</div>
    //   <div className="col-span-2 bg-red-200">asdas</div>
    // </div>
  );
}
