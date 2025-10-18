//js file to grab stuff from the api
//the public API doesnt provide a direct search endpoint, we download the list and filter it ourselves
import fetch from "node-fetch";
const BASE_URL = process.env.HERO_API_BASE;

export async function fetchHeroById(id) {
  const url = `${BASE_URL}/id/${id}.json`;
  const response = await fetch(url);
  if (!response.ok) {
    return null;
  }
  return response.json();
}

export async function searchHeroesByName(query) {
  if (!query) {
    return [];
  }

  const url = `${BASE_URL}/all.json`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Could not load hero list.");
  }

  const heroes = await response.json();
  const lowered = query.toLowerCase();

  return heroes.filter(function (hero) {
    return hero.name.toLowerCase().includes(lowered);
  });
}

export async function fetchAllHeroes() {
  const url = `${BASE_URL}/all.json`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Could not load hero list.");
  }

  return response.json();
}
