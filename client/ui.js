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
};

function setText(element, value) {
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
    const filtered = values.filter(function (item) {
      return item && item !== "-";
    });

    if (filtered.length === 0) {
      return "—";
    }

    return filtered.join(", ");
  }

  return values;
}

export function renderHero(hero) {
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

  if (elements.heroImage && hero.images && hero.images.md) {
    elements.heroImage.src = hero.images.md;
    elements.heroImage.alt = "Portrait of " + hero.name;
  }
}

export function renderStatus(status, message) {
  if (!elements.feedback) {
    return;
  }

  if (!status || status === "idle") {
    if (!elements.feedback.classList.contains("d-none")) {
      elements.feedback.classList.add("d-none");
    }
    return;
  }

  elements.feedback.classList.remove("d-none");
  elements.feedback.classList.remove("alert-info");
  elements.feedback.classList.remove("alert-danger");
  elements.feedback.classList.remove("alert-warning");

  if (status === "error") {
    elements.feedback.classList.add("alert-danger");
  } else if (status === "loading") {
    elements.feedback.classList.add("alert-warning");
  } else {
    elements.feedback.classList.add("alert-info");
  }

  elements.feedback.textContent = message || "";
}
