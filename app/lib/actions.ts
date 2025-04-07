"use server";

export async function fetchPokemons(url: string) {
  try {
    const pokemons = (await fetch(url)).json();

    return pokemons;
  } catch (error) {
    throw new Error("Failed to fetch all pokemons.");
  }
}

export async function fetchPokemonData(url: string) {
  try {
    const data = (await fetch(url)).json();

    return data;
  } catch (error) {
    throw new Error("Failed to fetch pokemon data");
  }
}
