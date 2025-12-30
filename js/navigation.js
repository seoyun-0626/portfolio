const links = document.querySelectorAll(".sidebar nav a");
const views = document.querySelectorAll(".view");

links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const target = link.dataset.view;

    views.forEach(v => v.classList.remove("active"));

    const targetView = document.getElementById(`view-${target}`);
    if (targetView) {
      targetView.classList.add("active");
    }
  });
});
