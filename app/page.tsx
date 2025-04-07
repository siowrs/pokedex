"use client";

import Image from "next/image";
import { fetchPokemonData, fetchPokemons } from "./lib/actions";
import Pokemon, { PokemonDataType } from "./components/pokemon";
import { useEffect, useRef, useState } from "react";
import PokemonModal from "./components/pokemon-modal";

export default function Home() {
  const [pokemonDatas, setPokemonDatas] = useState<PokemonDataType[]>([]);

  const listURLRef = useRef("https://pokeapi.co/api/v2/pokemon/?limit=10");

  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState("");
  const [fav, setFav] = useState<number[]>([]);
  const [selected, setSelected] = useState<PokemonDataType | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const filteredPokemon = pokemonDatas.filter(
    (p) =>
      p.name.includes(value) || p.id.toString().padStart(4, "0").includes(value)
  );

  const populatePokemon = async () => {
    try {
      setIsLoading(true);
      const pokemons = await fetchPokemons(listURLRef.current);
      const { results, next } = pokemons;
      const details = await Promise.all(
        results.map((r: { url: string }) => fetchPokemonData(r.url))
      );
      setIsLoading(false);
      listURLRef.current = next;
      setPokemonDatas([
        ...pokemonDatas,
        ...details.map((d) => ({
          name: d.name,
          id: d.id,
          img: d.sprites.front_default,
          stats: d.stats,
          weight: d.weight,
          height: d.height,
        })),
      ]);
    } catch (error) {
      console.error("Failed to fetch pokemons:", error);
    }
  };

  const toggleFav = (id: number) => {
    let newFav = [];
    if (fav.includes(id)) {
      newFav = fav.filter((favId) => favId !== id);
    } else {
      newFav = [...fav, id];
    }

    setFav(newFav);
    localStorage.setItem("favoritePokemons", JSON.stringify(newFav));
  };

  const showDetails = (id: number) => {
    setSelected(filteredPokemon.find((p) => p.id === id) ?? null);
  };

  // useEffect(() => {
  //   console.log(selected);
  // }, [selected]);

  useEffect(() => {
    //initial fetch
    populatePokemon();

    //get fav-ed pokemon
    const storedFav = localStorage.getItem("favoritePokemons");
    if (storedFav) {
      setFav(JSON.parse(storedFav));
    }
  }, []);

  return (
    <div className="bg-[#fde68a] min-h-dvh">
      {selected && (
        <PokemonModal
          setSelected={setSelected}
          toggleFav={() => toggleFav(selected.id)}
          pokemon={selected}
          isFav={fav.includes(selected.id)}
        />
      )}

      <div className="p-16 space-y-4">
        <h1 className="font-bold text-3xl text-[#0F172A]">Pokédex</h1>
        <p className="font-bold text-[#0F172A]">
          Search for a pokemon by name or id number.
        </p>
        <div className="relative w-64">
          <input
            placeholder="Name or id number"
            className="bg-white text-[#0F172A] text-sm pl-4 pr-8 py-2 w-full rounded"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <img
            src="/magnifying-glass-solid.svg"
            className="absolute size-4 right-2 top-1/2 -translate-y-1/2 fill-[#0F172A]"
          />
        </div>
        <div className="grid grid-cols-6 gap-4">
          {filteredPokemon.map((p) => (
            <Pokemon
              key={`${p.name}-${p.id}`}
              name={p.name}
              img={p.img}
              id={p.id}
              isFav={fav.includes(p.id)}
              toggleFav={() => toggleFav(p.id)}
              onClick={() => showDetails(p.id)}
            />
          ))}
          <div className="flex items-center">
            <button
              disabled={isLoading}
              onClick={() => populatePokemon()}
              className="h-12 w-full rounded disabled:bg-gray-300 disabled:text-gray-400 font-bold text-[#0F172A] bg-[#FBBF24] hover:bg-[#d97706] px-3 py-2"
            >
              {isLoading ? "Loading..." : "Load more"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
