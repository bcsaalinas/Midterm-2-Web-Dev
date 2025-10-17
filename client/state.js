export const appState = {
  curentId: 1,
  featured: [],
  cache: new Map(),
  status: "idle",
  message: "",
};

export function setCurrentId(id) {
  appState.curentId = id;
}

export function setStatus(status, message = "") {
  appState.status = status;
  appState.message = message;
}
