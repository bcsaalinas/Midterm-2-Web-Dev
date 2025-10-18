// helper file that knows how to paint hero info on the page

// quick lookup for DOM nodes we reuse across the UI
const elements = {
  feedback: document.getElementById("feedback"),
  heroImage: document.getElementById("hero-image"),
  heroId: document.getElementById("hero-id"),
  heroName: document.getElementById("hero-name"),
  heroFullName: document.getElementById("hero-full-name"),
  statIntelligence: document.getElementById("stat-intelligence"),
  statStrength: document.getElementById("stat-strength"),
  statSpeed: document.getElementById("stat-speed"),
  statDurability: document.getElementById("stat-durability"),
  statPower: document.getElementById("stat-power"),
  statCombat: document.getElementById("stat-combat"),
  bioFullName: document.getElementById("biography-full-name"),
  bioPlace: document.getElementById("biography-place"),
  bioAlignment: document.getElementById("biography-alignment"),
  bioAliases: document.getElementById("biography-aliases"),
  appearanceGender: document.getElementById("appearance-gender"),
  appearanceRace: document.getElementById("appearance-race"),
  appearanceHeight: document.getElementById("appearance-height"),
  appearanceWeight: document.getElementById("appearance-weight"),
  appearanceEyes: document.getElementById("appearance-eyes"),
  appearanceHair: document.getElementById("appearance-hair"),
  workOccupation: document.getElementById("work-occupation"),
  workBase: document.getElementById("work-base"),
  connectionsGroup: document.getElementById("connections-group"),
  connectionsRelatives: document.getElementById("connections-relatives"),
  gallery: document.getElementById("gallery"),
  directory: document.getElementById("hero-directory"),
  directoryContent: document.getElementById("directory-content"),
};

// save the starter gallery so we can restore it later
const defaultGalleryMarkup = elements.gallery ? elements.gallery.innerHTML : "";

function setText(element, value) {
  // fall back to an em dash when data is missing
  if (!element) {
    return;
  }

  if (value === undefined || value === null || value === "") {
    element.textContent = "—";
  } else {
    element.textContent = value;
  }
}

function joinValues(values) {
  if (!values) {
    return "—";
  }

  if (Array.isArray(values)) {
    const pieces = [];
    for (let index = 0; index < values.length; index += 1) {
      const item = values[index];
      if (item && item !== "-") {
        pieces.push(item);
      }
    }

    if (pieces.length === 0) {
      return "—";
    }

    return pieces.join(", ");
  }

  return values;
}

export function renderHero(hero) {
  // stop if nothing was passed in (safety guard)
  if (!hero) {
    return;
  }

  setText(elements.heroId, hero.id);
  setText(elements.heroName, hero.name);

  const biography = hero.biography || {};
  setText(elements.heroFullName, biography.fullName);
  setText(elements.bioFullName, biography.fullName);
  setText(elements.bioPlace, biography.placeOfBirth);
  setText(elements.bioAlignment, biography.alignment);
  setText(elements.bioAliases, joinValues(biography.aliases));

  const powerstats = hero.powerstats || {};
  setText(elements.statIntelligence, powerstats.intelligence);
  setText(elements.statStrength, powerstats.strength);
  setText(elements.statSpeed, powerstats.speed);
  setText(elements.statDurability, powerstats.durability);
  setText(elements.statPower, powerstats.power);
  setText(elements.statCombat, powerstats.combat);

  const appearance = hero.appearance || {};
  setText(elements.appearanceGender, appearance.gender);
  setText(elements.appearanceRace, appearance.race);
  setText(elements.appearanceHeight, joinValues(appearance.height));
  setText(elements.appearanceWeight, joinValues(appearance.weight));
  setText(elements.appearanceEyes, appearance.eyeColor);
  setText(elements.appearanceHair, appearance.hairColor);

  const work = hero.work || {};
  setText(elements.workOccupation, work.occupation);
  setText(elements.workBase, work.base);

  const connections = hero.connections || {};
  setText(elements.connectionsGroup, connections.groupAffiliation);
  setText(elements.connectionsRelatives, connections.relatives);

  if (elements.heroImage) {
    if (hero.images) {
      const source =
        hero.images.lg ||
        hero.images.md ||
        hero.images.sm ||
        "https://via.placeholder.com/320x480?text=Hero";
      elements.heroImage.src = source;
      elements.heroImage.alt = "Portrait of " + hero.name;
    } else {
      elements.heroImage.src =
        "https://via.placeholder.com/320x480?text=Hero+portrait";
      elements.heroImage.alt = "Portrait not available";
    }
  }
}

export function renderStatus(status, message) {
  // hide the banner when we return to idle
  if (!elements.feedback) {
    return;
  }

  if (!status || status === "idle") {
    elements.feedback.classList.add("d-none");
    return;
  }

  elements.feedback.classList.remove("d-none");
  elements.feedback.classList.remove("alert-info");
  elements.feedback.classList.remove("alert-warning");
  elements.feedback.classList.remove("alert-danger");

  if (status === "error") {
    elements.feedback.classList.add("alert-danger");
  } else if (status === "loading") {
    elements.feedback.classList.add("alert-warning");
  } else {
    elements.feedback.classList.add("alert-info");
  }

  elements.feedback.textContent = message || "";
}

function buildHeroCard(hero) {
  const imageSrc =
    (hero &&
      hero.images &&
      (hero.images.sm || hero.images.md || hero.images.lg)) ||
    "https://via.placeholder.com/320x480?text=Hero";

  const heroName = hero && hero.name ? hero.name : "Unknown hero";
  const heroId = hero && hero.id ? hero.id : "?";

  const description =
    hero &&
    hero.biography &&
    hero.biography.fullName &&
    hero.biography.fullName !== "-"
      ? hero.biography.fullName
      : "Click to load details.";

  return (
    '<article class="col">' +
    '<div class="card gallery-card h-100 shadow-sm" data-hero-id="' +
    heroId +
    '">' +
    '<div class="ratio ratio-2x3 bg-light overflow-hidden">' +
    '<img src="' +
    imageSrc +
    '" alt="Portrait of ' +
    heroName +
    '" class="img-fluid object-fit-cover" />' +
    "</div>" +
    '<div class="card-body">' +
    '<p class="text-muted small mb-1">ID ' +
    heroId +
    "</p>" +
    '<h3 class="h5 mb-2">' +
    heroName +
    "</h3>" +
    '<p class="text-muted mb-0">' +
    description +
    "</p>" +
    "</div>" +
    "</div>" +
    "</article>"
  );
}

function highlightGallerySelection(heroId) {
  if (!elements.gallery) {
    return;
  }

  const cards = elements.gallery.querySelectorAll("[data-hero-id]");

  cards.forEach(function (card) {
    const matches =
      heroId !== undefined &&
      heroId !== null &&
      card.getAttribute("data-hero-id") === String(heroId);

    if (matches) {
      card.classList.add("active");
      card.setAttribute("aria-current", "true");
    } else {
      card.classList.remove("active");
      card.removeAttribute("aria-current");
    }
  });
}

export function renderSearchResults(heroes, selectedId) {
  if (!elements.gallery) {
    return;
  }

  if (!heroes || !heroes.length) {
    elements.gallery.innerHTML = defaultGalleryMarkup;
    highlightGallerySelection(null);
    return;
  }

  const cards = heroes.map(function (hero) {
    return buildHeroCard(hero);
  });

  elements.gallery.innerHTML = cards.join("");
  highlightGallerySelection(selectedId !== undefined ? selectedId : null);
}

export function markSelectedHero(heroId) {
  highlightGallerySelection(heroId);
  highlightDirectoryHero(heroId);
}

export function scrollToHeroDetails() {
  const details = document.getElementById("hero-details");
  if (!details) {
    return;
  }

  const top =
    Math.max(
      0,
      details.getBoundingClientRect().top + window.scrollY - 80
    );

  window.scrollTo({ top, behavior: "smooth" });

  const focusTarget = elements.heroName || details;
  if (focusTarget && typeof focusTarget.focus === "function") {
    focusTarget.focus({ preventScroll: true });
  }
}

function highlightDirectoryHero(heroId) {
  if (!elements.directoryContent) {
    return;
  }

  const buttons = elements.directoryContent.querySelectorAll("[data-hero-id]");
  buttons.forEach(function (button) {
    const matches =
      heroId !== undefined &&
      heroId !== null &&
      button.getAttribute("data-hero-id") === String(heroId);

    if (matches) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

export function renderDirectory(list, activeId) {
  if (!elements.directoryContent) {
    return;
  }

  if (!Array.isArray(list) || !list.length) {
    elements.directoryContent.innerHTML =
      '<p class="text-white-50 mb-0">No heroes available yet.</p>';
    return;
  }

  const items = list
    .map(function (hero) {
      return (
        '<button class="directory-button" type="button" data-hero-id="' +
        hero.id +
        '">' +
        hero.name +
        (hero.fullName && hero.fullName !== "—"
          ? ' <span class="text-white-50 d-block small">' + hero.fullName + "</span>"
          : "") +
        "</button>"
      );
    })
    .join("");

  elements.directoryContent.innerHTML = items;
  highlightDirectoryHero(activeId);
}

export function toggleDirectory(show) {
  if (!elements.directory) {
    return;
  }

  if (show) {
    elements.directory.classList.remove("d-none");
  } else {
    elements.directory.classList.add("d-none");
  }
}

export function isDirectoryVisible() {
  if (!elements.directory) {
    return false;
  }

  return !elements.directory.classList.contains("d-none");
}
