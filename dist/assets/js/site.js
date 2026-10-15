(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector("#theme-toggle");
  const menuToggle = document.querySelector("#menu-toggle");
  const navLinks = document.querySelector("#nav-links");
  const cvDownload = document.querySelector(".cv-download");
  const sectionLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const sections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  let savedTheme = null;
  try { savedTheme = localStorage.getItem("tasneea-theme-v3"); } catch (_) {}
  if (savedTheme === "dark" || savedTheme === "light") root.dataset.theme = savedTheme;

  const updateThemeLabel = () => {
    const dark = root.dataset.theme === "dark";
    themeToggle?.setAttribute("aria-label", dark ? "Switch to lavender light theme" : "Switch to lavender dark theme");
    themeToggle?.setAttribute("title", dark ? "Switch to lavender light theme" : "Switch to lavender dark theme");
  };
  updateThemeLabel();

  themeToggle?.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("tasneea-theme-v3", next); } catch (_) {}
    updateThemeLabel();
  });

  menuToggle?.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!open));
    menuToggle.setAttribute("aria-label", open ? "Open navigation menu" : "Close navigation menu");
    navLinks?.classList.toggle("is-open", !open);
  });

  sectionLinks.forEach((link) => link.addEventListener("click", () => {
    navLinks?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation menu");
  }));

  cvDownload?.addEventListener("click", (event) => {
    const confirmed = window.confirm("Would you like to download Tasneea Zahra’s CV PDF?");
    if (!confirmed) event.preventDefault();
    navLinks?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation menu");
  });

  const setCurrentSection = () => {
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= 150) current = section;
    }
    sectionLinks.forEach((link) => {
      if (link.hash === `#${current?.id}`) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };
  window.addEventListener("scroll", setCurrentSection, { passive: true });
  window.addEventListener("hashchange", setCurrentSection);
  setCurrentSection();
})();
