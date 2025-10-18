//js file to stash important stuff about our app

export const appState = {
  currentId: 1,
  currentHero: null,
  cache: {},
  status: "idle",
  message: "",
};

export function setCurrentId(id) {
  const parsedId = Number(id);
  if (!Number.isNaN(parsedId)) {
    appState.currentId = parsedId;
  }
}

export function setHero(hero) {
  if (!hero || hero.id === undefined) return;
  appState.currentHero = hero;
  appState.cache[hero.id] = hero;
}

export function setStatus(status, message = "") {
  appState.status = status;
  appState.message = message;
}
