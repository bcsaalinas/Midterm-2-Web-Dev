//js file to grab stuff from the api
import fetch from "node-fetch";
const BASE_URL = process.env.HERO_API_BASE;

export async function fetchHeroById(id) {
  const url = `${BASE_URL}/id/${id}.json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("could load hero list");
  }
}
