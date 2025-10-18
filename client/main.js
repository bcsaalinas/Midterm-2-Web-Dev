import { bindEvents } from "./events.js";
import { fetchHeroById } from "./api.js";
import {
  appState,
  getCachedHero,
  setCurrentId,
  setHero,
  setStatus,
} from "./state.js";
import { renderHero, renderStatus } from "./ui.js";

function updateStatus(status, message) {
  setStatus(status, message);
  renderStatus(status, message);
}

function loadHero(id) {
  const parsedId = parseInt(id, 10);

  if (Number.isNaN(parsedId) || parsedId < 1) {
    updateStatus("error", "Please enter a hero ID greater than zero.");
    return;
  }

  setCurrentId(parsedId);

  const cachedHero = getCachedHero(parsedId);
  if (cachedHero) {
    setHero(cachedHero);
    renderHero(cachedHero);
    updateStatus("idle", "");
    return;
  }

  updateStatus("loading", "Loading hero…");

  fetchHeroById(parsedId)
    .then(function (hero) {
      setHero(hero);
      renderHero(hero);
      updateStatus("idle", "");
    })
    .catch(function (error) {
      updateStatus("error", error.message || "Hero not ready yet.");
    });
}

function handleSearch(query) {
  const trimmed = query.trim();

  if (!trimmed) {
    updateStatus("error", "Type a hero name or ID to search.");
    return;
  }

  const numericId = parseInt(trimmed, 10);
  if (!Number.isNaN(numericId)) {
    loadHero(numericId);
  } else {
    updateStatus("info", "Name search is coming soon. Try an ID like 1 or 2.");
  }
}

function handleNext() {
  const nextId = appState.currentId + 1;
  loadHero(nextId);
}

function handlePrev() {
  let previousId = appState.currentId - 1;
  if (previousId < 1) {
    previousId = 1;
  }
  loadHero(previousId);
}

function startApp() {
  bindEvents({
    onSearch: handleSearch,
    onNext: handleNext,
    onPrev: handlePrev,
  });

  loadHero(appState.currentId);
}

document.addEventListener("DOMContentLoaded", startApp);
