//js file to stash important stuff about our app

export const appState = {
  currentId: 1,
  currentHero: null,
  cache: {},
  status: "idle",
  message: "",
  searchResults: [],
  searchIndex: -1,
  featuredHeroes: [],
  heroDirectory: [],
  directoryLoaded: false,
};

export function setCurrentId(id) {
  const parsedId = Number(id);
  if (!Number.isNaN(parsedId)) {
    appState.currentId = parsedId;
  }
}

export function setHero(hero) {
  if (!hero || hero.id === undefined) {
    return;
  }
  appState.currentHero = hero;
  appState.cache[hero.id] = hero;
}

export function getCachedHero(id) {
  const parsedId = Number(id);
  if (Number.isNaN(parsedId)) {
    return undefined;
  }

  return appState.cache[parsedId];
}

export function setStatus(status, message = "") {
  appState.status = status;
  appState.message = message;
}

export function setSearchResults(results) {
  if (Array.isArray(results)) {
    appState.searchResults = results;
    appState.searchIndex = results.length ? 0 : -1;
  } else {
    appState.searchResults = [];
    appState.searchIndex = -1;
  }
}

export function clearSearchResults() {
  appState.searchResults = [];
  appState.searchIndex = -1;
}

export function setSearchIndex(index) {
  if (typeof index === "number") {
    appState.searchIndex = index;
  }
}

export function getSearchResults() {
  return appState.searchResults;
}

export function getSearchIndex() {
  return appState.searchIndex;
}

export function setFeaturedHeroes(heroes) {
  if (Array.isArray(heroes)) {
    appState.featuredHeroes = heroes;
  } else {
    appState.featuredHeroes = [];
  }
}

export function getFeaturedHeroes() {
  return appState.featuredHeroes;
}

export function setHeroDirectory(list) {
  if (Array.isArray(list)) {
    appState.heroDirectory = list;
    appState.directoryLoaded = true;
  } else {
    appState.heroDirectory = [];
    appState.directoryLoaded = false;
  }
}

export function getHeroDirectory() {
  return appState.heroDirectory;
}

export function isDirectoryLoaded() {
  return appState.directoryLoaded;
}
