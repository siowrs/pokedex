import { SetStateAction } from "react";
import Pokemon, { PokemonDataType } from "./pokemon";
import StatsDetail from "./stats-details";

export default function PokemonModal({
  pokemon,
  isFav,
  toggleFav,
  setSelected,
}: {
  pokemon: PokemonDataType;
  isFav: boolean;
  toggleFav?: () => void;
  setSelected: React.Dispatch<React.SetStateAction<PokemonDataType | null>>;
}) {
  const { stats } = pokemon;

  return (
    <div className=" fixed inset-0 flex items-center justify-center bg-black/50 z-100 ">
      <div className="   w-4/5 relative z-100">
        <button
          onClick={() => setSelected(null)}
          className="absolute top-0 right-0 size-16 p-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#fbbf24] hover:bg-[#d97706]"
        >
          <img src="/xmark-solid.svg" className="size-full" />
        </button>

        <div className="grid grid-cols-3 rounded-xl w-full overflow-hidden">
          <div className="col-span-1">
            <Pokemon
              img={pokemon.img}
              name={pokemon.name}
              id={pokemon.id}
              isFav={isFav}
              className="rounded-none h-full p-8"
              imgSize="h-full"
              fontSize="text-xl"
              favIconClass="size-12 top-5 right-5"
              toggleFav={toggleFav}
            />
          </div>
          <div className="col-span-2 bg-[#f1f5f9] p-8">
            <h1 className="font-bold text-3xl text-[#0F172A] mb-4">Stats</h1>
            <div className="space-y-2">
              {stats?.map((s, i) => (
                <StatsDetail
                  key={`${pokemon.name}-${pokemon.id}-${i}`}
                  statName={s.stat.name}
                  value={s.base_stat}
                  rowColor={i % 2 === 0 ? "bg-white " : "bg-[#f5f9fb]"}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
