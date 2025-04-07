import Image from "next/image";
import HeartIcon from "./icons/heart";
import { cn } from "../lib/utils";

export type PokemonDataType = {
  name: string;
  img: string;
  id: number;
  height?: number;
  weight?: number;
  stats?: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
};
export default function Pokemon({
  name,
  img,
  id,
  isFav,
  toggleFav,
  onClick,
  className,
  imgSize,
  fontSize,
  favIconClass,
}: PokemonDataType & {
  isFav: boolean;
  toggleFav?: () => void;
  onClick?: () => void;
  className?: string;
  imgSize?: string;
  fontSize?: string;
  favIconClass?: string;
}) {
  return (
    <div
      className={cn(
        "p-4 rounded bg-white flex items-center flex-col relative",
        className
      )}
      onClick={onClick}
    >
      <HeartIcon
        className={`${favIconClass} ${isFav ? "fill-[#ef4444]" : ""}`}
        onClick={toggleFav}
      />

      <img src={img} className={imgSize} />
      <h5 className={cn("mt-2 font-bold text-[#0F172A]", fontSize)}>
        {name[0].toUpperCase() + name.slice(1)}
      </h5>
      <p className={cn("text-[#94a3b8]", fontSize)}>
        {id.toString().padStart(4, "0")}
      </p>
    </div>
  );
}
