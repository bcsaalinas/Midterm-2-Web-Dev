import { bindEvents } from "./events.js";
import { fetchHeroById, fetchHeroDirectory, searchHeroesByName } from "./api.js";
import {
  appState,
  getCachedHero,
  getSearchIndex,
  getSearchResults,
  setCurrentId,
  setHero,
  setSearchIndex,
  setSearchResults,
  setStatus,
  clearSearchResults,
  setFeaturedHeroes,
  getFeaturedHeroes,
  setHeroDirectory,
  getHeroDirectory,
  isDirectoryLoaded,
} from "./state.js";
import {
  markSelectedHero,
  renderHero,
  renderDirectory,
  renderSearchResults,
  renderStatus,
  toggleDirectory,
  isDirectoryVisible,
  scrollToHeroDetails,
} from "./ui.js";

// small, hand-picked set so the home screen is never empty
const FEATURED_IDS = [1, 2, 4, 7, 10, 70];
// last valid ID from the public API (used for wrap-around nav)
const MAX_HERO_ID = 731;
// we avoid auto-scrolling on first render until the user does something
let hasUserInteracted = false;

function updateStatus(status, message) {
  setStatus(status, message);
  renderStatus(status, message);
}

function showFeaturedGallery(selectedId) {
  // fallback gallery when no search results are active
  const featured = getFeaturedHeroes();
  if (featured && featured.length) {
    renderSearchResults(featured, selectedId);
  } else {
    renderSearchResults(null, selectedId);
  }
}

function loadFeaturedHeroes() {
  // load the featured list one hero at a time to keep it simple
  const heroes = [];

  function loadNext(index) {
    if (index >= FEATURED_IDS.length) {
      setFeaturedHeroes(heroes);
      if (!getSearchResults() || !getSearchResults().length) {
        showFeaturedGallery(appState.currentId);
        markSelectedHero(appState.currentId);
      }
      return;
    }

    const id = FEATURED_IDS[index];
    fetchHeroById(id)
      .then(function (hero) {
        if (hero) {
          heroes.push(hero);
        }
      })
      .catch(function () {
        // leave a gap if the hero fails to load
      })
      .then(function () {
        loadNext(index + 1);
      });
  }

  loadNext(0);
}

function loadDirectoryIfNeeded() {
  if (isDirectoryLoaded()) {
    if (isDirectoryVisible()) {
      closeDirectory();
      return;
    }

    renderDirectory(getHeroDirectory(), appState.currentId);
    toggleDirectory(true);
    markSelectedHero(appState.currentId);
    updateStatus("idle", "");
    return;
  }

  updateStatus("loading", "Loading hero directory…");

  fetchHeroDirectory()
    .then(function (list) {
      setHeroDirectory(list);
      renderDirectory(list, appState.currentId);
      toggleDirectory(true);
      updateStatus("info", "Browse the hero directory by picking a name.");
      markSelectedHero(appState.currentId);
    })
    .catch(function (error) {
      updateStatus(
        "error",
        error.message || "Could not load the hero directory."
      );
    });
}

function closeDirectory() {
  toggleDirectory(false);
  updateStatus("idle", "");
}

function loadHero(id) {
  const parsedId = Number(id);

  if (Number.isNaN(parsedId)) {
    updateStatus("error", "Please enter a hero ID greater than zero.");
    return;
  }

  let targetId = parsedId;

  if (targetId < 1) {
    targetId = MAX_HERO_ID;
  } else if (targetId > MAX_HERO_ID) {
    targetId = 1;
  }

  setCurrentId(targetId);

  // reuse any hero we already fetched to keep things fast
  const cachedHero = getCachedHero(targetId);
  if (cachedHero) {
    setHero(cachedHero);
    renderHero(cachedHero);
    updateStatus("idle", "");
    if (!getSearchResults() || !getSearchResults().length) {
      showFeaturedGallery(appState.currentId);
      markSelectedHero(appState.currentId);
    }
    if (hasUserInteracted) {
      scrollToHeroDetails();
    }
    return;
  }

  updateStatus("loading", "Loading hero…");

  fetchHeroById(targetId)
    .then(function (hero) {
      setHero(hero);
      renderHero(hero);
      updateStatus("idle", "");
      if (!getSearchResults() || !getSearchResults().length) {
        showFeaturedGallery(appState.currentId);
        markSelectedHero(appState.currentId);
      }
      if (hasUserInteracted) {
        scrollToHeroDetails();
      }
    })
    .catch(function (error) {
      updateStatus("error", error.message || "Hero not ready yet.");
    });
}

function showHeroFromSearch(index, announce) {
  // handles wrap-around navigation for the current search results
  const results = getSearchResults();
  if (!results || !results.length) {
    return false;
  }

  const total = results.length;
  let nextIndex = index;

  if (nextIndex < 0) {
    nextIndex = total - 1;
  } else if (nextIndex >= total) {
    nextIndex = 0;
  }

  const hero = results[nextIndex];

  setSearchIndex(nextIndex);
  setCurrentId(hero.id);
  setHero(hero);
  renderHero(hero);
  markSelectedHero(hero.id);
  if (hasUserInteracted) {
    scrollToHeroDetails();
  }

  if (announce) {
    if (total === 1) {
      updateStatus("idle", "");
    } else {
      updateStatus(
        "info",
        "Showing result " + (nextIndex + 1) + " of " + total + "."
      );
    }
  }

  return true;
}

function handleSearch(query) {
  const trimmed = (query || "").trim();

  if (!trimmed) {
    updateStatus("error", "Type a hero name or ID to search.");
    return;
  }

  hasUserInteracted = true;

  const numericId = Number(trimmed);
  if (!Number.isNaN(numericId)) {
    let targetId = numericId;
    if (targetId < 1) {
      targetId = MAX_HERO_ID;
    } else if (targetId > MAX_HERO_ID) {
      targetId = 1;
    }

    clearSearchResults();
    showFeaturedGallery(targetId);
    loadHero(targetId);
  } else {
    updateStatus("loading", 'Searching for "' + trimmed + '"…');

    searchHeroesByName(trimmed)
      .then(function (heroes) {
        if (!heroes || heroes.length === 0) {
          clearSearchResults();
          showFeaturedGallery(appState.currentId);
          updateStatus(
            "error",
            'No heroes matched "' + trimmed + '". Try another name.'
          );
          return;
        }

        setSearchResults(heroes);
        renderSearchResults(heroes, heroes[0].id);

        showHeroFromSearch(0, false);

        if (heroes.length === 1) {
          updateStatus("idle", "");
        } else {
          updateStatus(
            "info",
            "Found " +
              heroes.length +
              ' heroes. Showing the first match. Use the gallery or Next/Prev to browse.'
          );
        }
      })
      .catch(function (error) {
        clearSearchResults();
        showFeaturedGallery(appState.currentId);
        updateStatus(
          "error",
          error.message || "Search failed. Please try again."
        );
      });
  }
}

function handleNext() {
  hasUserInteracted = true;

  const results = getSearchResults();
  if (results && results.length) {
    const currentIndex = getSearchIndex();
    const nextIndex = currentIndex < 0 ? 0 : currentIndex + 1;
    showHeroFromSearch(nextIndex, true);
    return;
  }

  const nextId = appState.currentId >= MAX_HERO_ID ? 1 : appState.currentId + 1;
  loadHero(nextId);
}

function handlePrev() {
  hasUserInteracted = true;

  const results = getSearchResults();
  if (results && results.length) {
    const currentIndex = getSearchIndex();
    const prevIndex = currentIndex < 0 ? results.length - 1 : currentIndex - 1;
    showHeroFromSearch(prevIndex, true);
    return;
  }

  const previousId =
    appState.currentId <= 1 ? MAX_HERO_ID : appState.currentId - 1;
  loadHero(previousId);
}

function handleSelectHero(heroId) {
  hasUserInteracted = true;

  if (isDirectoryVisible()) {
    closeDirectory();
  }

  const parsedId = Number(heroId);

  if (Number.isNaN(parsedId)) {
    handleSearch(heroId);
    return;
  }

  const results = getSearchResults();
  if (results && results.length) {
    const foundIndex = results.findIndex(function (hero) {
      return hero.id === parsedId;
    });

    if (foundIndex !== -1) {
      showHeroFromSearch(foundIndex, true);
      return;
    }
  }

  loadHero(parsedId);
}

function startApp() {
  loadFeaturedHeroes();

  bindEvents({
    onSearch: handleSearch,
    onNext: handleNext,
    onPrev: handlePrev,
    onSelectHero: handleSelectHero,
    onOpenDirectory: loadDirectoryIfNeeded,
    onCloseDirectory: closeDirectory,
  });

  loadHero(appState.currentId);
}

document.addEventListener("DOMContentLoaded", startApp);
