const API_BASE_URL =
  window.location.port === "3000" ? "/api" : "http://localhost:3000/api";

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
