// collects all the buttons and forms so we can attach actions later

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const nextButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn");
const gallery = document.getElementById("gallery");
const browseButton = document.getElementById("browse-button");
const closeDirectoryButton = document.getElementById("close-directory");
const directoryContent = document.getElementById("directory-content");

export function bindEvents(handlers) {
  if (!handlers) {
    return;
  }

  if (searchForm && searchInput && typeof handlers.onSearch === "function") {
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      handlers.onSearch(searchInput.value || "");
    });
  }

  if (nextButton && typeof handlers.onNext === "function") {
    nextButton.addEventListener("click", function () {
      handlers.onNext();
    });
  }

  if (prevButton && typeof handlers.onPrev === "function") {
    prevButton.addEventListener("click", function () {
      handlers.onPrev();
    });
  }

  if (browseButton && typeof handlers.onOpenDirectory === "function") {
    // toggle hero directory panel
    browseButton.addEventListener("click", function () {
      handlers.onOpenDirectory();
    });
  }

  if (closeDirectoryButton && typeof handlers.onCloseDirectory === "function") {
    // close button inside the directory panel
    closeDirectoryButton.addEventListener("click", function () {
      handlers.onCloseDirectory();
    });
  }

  if (gallery) {
    gallery.addEventListener("click", function (event) {
      const card = event.target.closest("[data-hero-id]");
      if (!card) {
        return;
      }

      const heroId = card.getAttribute("data-hero-id");
      if (
        handlers.onSelectHero &&
        typeof handlers.onSelectHero === "function"
      ) {
        handlers.onSelectHero(heroId);
      } else if (handlers.onSearch && typeof handlers.onSearch === "function") {
        handlers.onSearch(heroId);
      }
    });
  }

  if (directoryContent && typeof handlers.onSelectHero === "function") {
    directoryContent.addEventListener("click", function (event) {
      const button = event.target.closest("[data-hero-id]");
      if (!button) {
        return;
      }

      handlers.onSelectHero(button.getAttribute("data-hero-id"));
    });
  }
}
