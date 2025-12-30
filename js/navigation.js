document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a");
  const views = document.querySelectorAll(".view");

  links.forEach(link => {
    link.addEventListener("click", e => {
      const view = link.dataset.view;
      const href = link.getAttribute("href");

      // Board
      if (view === "board") {
        e.preventDefault();

        views.forEach(v => v.classList.remove("active"));
        document.getElementById("view-board")?.classList.add("active");
        window.scrollTo(0, 0);
        return;
      }

      // Home
      if (view === "portfolio") {
        e.preventDefault();

        views.forEach(v => v.classList.remove("active"));
        document.getElementById("view-portfolio")?.classList.add("active");

        requestAnimationFrame(() => {
          document.getElementById("home")?.scrollIntoView({ block: "start" });
        });
        return;
      }

      // Section 이동
      if (href && href.startsWith("#")) {
        e.preventDefault();

        views.forEach(v => v.classList.remove("active"));
        document.getElementById("view-portfolio")?.classList.add("active");

        requestAnimationFrame(() => {
          document.querySelector(href)?.scrollIntoView({ block: "start" });
        });
      }
    });
  });
});
