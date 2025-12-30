const links = document.querySelectorAll(".sidebar nav a");
const views = document.querySelectorAll(".view");

links.forEach(link => {
  link.addEventListener("click", e => {
    const view = link.dataset.view;
    const href = link.getAttribute("href");

    /* =====================
       1. Board 전환
    ===================== */
    if (view === "board") {
      e.preventDefault();

      views.forEach(v => v.classList.remove("active"));
      document.getElementById("view-board").classList.add("active");
      window.scrollTo({ top: 0 });
      return;
    }

    /* =====================
       2. Home (hero로 이동)
    ===================== */
    if (view === "portfolio") {
      e.preventDefault();

      views.forEach(v => v.classList.remove("active"));
      document.getElementById("view-portfolio").classList.add("active");

      requestAnimationFrame(() => {
        const home = document.getElementById("home");
        if (home) {
          home.scrollIntoView({ behavior: "auto", block: "start" });
        }
      });
      return;
    }

    /* =====================
       3. Section 이동 (Skills 등)
    ===================== */
    if (href && href.startsWith("#")) {
      e.preventDefault();

      views.forEach(v => v.classList.remove("active"));
      document.getElementById("view-portfolio").classList.add("active");

      requestAnimationFrame(() => {
        const section = document.querySelector(href);
        if (section) {
          section.scrollIntoView({ behavior: "auto", block: "start" });
        }
      });
    }
  });
});
