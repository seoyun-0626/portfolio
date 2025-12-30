document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("project-modal");
  const bodies = document.querySelectorAll(".modal-body");
  const buttons = document.querySelectorAll(".view-btn");
  const closeBtn = document.querySelector(".modal-close");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const project = btn.dataset.project;

      modal.style.display = "flex";

      bodies.forEach(body => {
        body.style.display = "none";
      });

      const target = document.getElementById("modal-" + project);
      if (target) {
        target.style.display = "block";
      }
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
});
