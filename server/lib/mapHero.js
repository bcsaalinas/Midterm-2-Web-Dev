// turns raw superhero data into the shape client expects

export function mapHero(raw) {
  if (!raw) {
    return null;
  }

  const powerstats = raw.powerstats || {};
  const appearance = raw.appearance || {};
  const biography = raw.biography || {};
  const work = raw.work || {};
  const connections = raw.connections || {};
  const images = raw.images || {};

  return {
    id: raw.id,
    name: raw.name || "Unknown hero",
    slug: raw.slug || "",
    powerstats: {
      intelligence: powerstats.intelligence || "—",
      strength: powerstats.strength || "—",
      speed: powerstats.speed || "—",
      durability: powerstats.durability || "—",
      power: powerstats.power || "—",
      combat: powerstats.combat || "—",
    },
    appearance: {
      gender: appearance.gender || "—",
      race: appearance.race || "—",
      height: appearance.height || [],
      weight: appearance.weight || [],
      eyeColor: appearance.eyeColor || "—",
      hairColor: appearance.hairColor || "—",
    },
    biography: {
      fullName: biography.fullName || "—",
      alterEgos: biography.alterEgos || "—",
      aliases: biography.aliases || [],
      placeOfBirth: biography.placeOfBirth || "—",
      firstAppearance: biography.firstAppearance || "—",
      publisher: biography.publisher || "—",
      alignment: biography.alignment || "—",
    },
    work: {
      occupation: work.occupation || "—",
      base: work.base || "—",
    },
    connections: {
      groupAffiliation: connections.groupAffiliation || "—",
      relatives: connections.relatives || "—",
    },
    images,
  };
}

export function mapHeroSummary(raw) {
  if (!raw) {
    return null;
  }

  return {
    id: raw.id,
    name: raw.name || "Unknown hero",
    slug: raw.slug || "",
    fullName:
      raw.biography && raw.biography.fullName
        ? raw.biography.fullName
        : "—",
    image:
      raw.images && (raw.images.sm || raw.images.md || raw.images.lg)
        ? raw.images.sm || raw.images.md || raw.images.lg
        : null,
  };
}
