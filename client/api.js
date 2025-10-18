const LOCAL_HOSTS = ["localhost", "127.0.0.1"];
const DEFAULT_LOCAL_API = "http://localhost:3000/api";

const isLocalHost = LOCAL_HOSTS.includes(window.location.hostname);
const isSameOrigin = isLocalHost && window.location.port === "3000";

function resolveApiBase() {
  if (window.__SUPERHERO_API_URL) {
    return window.__SUPERHERO_API_URL;
  }

  if (isLocalHost) {
    return isSameOrigin ? "/api" : DEFAULT_LOCAL_API;
  }

  return `${window.location.origin}/api`;
}

const API_BASE_URL = resolveApiBase();

export function fetchHeroById(id) {
  const url = API_BASE_URL + "/heroes/" + id;

  return fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Hero not found.");
      }
      return response.json();
    })
    .catch(function (error) {
      throw error;
    });
}

export function searchHeroesByName(query) {
  const url =
    API_BASE_URL + "/heroes/search?q=" + encodeURIComponent(query || "");

  return fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Search failed.");
      }
      return response.json();
    })
    .then(function (heroes) {
      return heroes;
    })
    .catch(function (error) {
      throw error;
    });
}

export function fetchHeroDirectory() {
  const url = API_BASE_URL + "/heroes";

  return fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Could not load hero directory.");
      }
      return response.json();
    })
    .catch(function (error) {
      throw error;
    });
}
