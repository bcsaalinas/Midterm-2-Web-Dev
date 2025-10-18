import { Router } from "express";
import {
  fetchAllHeroes,
  fetchHeroById,
  searchHeroesByName,
} from "./lib/data.js";
import { mapHero, mapHeroSummary } from "./lib/mapHero.js";

const router = Router();

router.get("/api/heroes", async (req, res, next) => {
  try {
    const rawHeroes = await fetchAllHeroes();
    const summaries = rawHeroes.map(function (hero) {
      return mapHeroSummary(hero);
    });
    res.json(summaries.filter(Boolean));
  } catch (error) {
    next(error);
  }
});

router.get("/api/heroes/search", async (req, res, next) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res
        .status(400)
        .json({ message: "Please provide a search term using ?q=" });
    }

    const results = await searchHeroesByName(query);
    const heroes = results.map(function (hero) {
      return mapHero(hero);
    });

    res.json(heroes);
  } catch (error) {
    next(error);
  }
});

router.get("/api/heroes/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const rawHero = await fetchHeroById(id);

    if (!rawHero) {
      return res.status(404).json({ message: "Hero not found." });
    }

    const hero = mapHero(rawHero);
    res.json(hero);
  } catch (error) {
    next(error);
  }
});

export default router;
