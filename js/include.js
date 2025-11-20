document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-include]").forEach(async (el) => {
        const file = el.getAttribute("data-include") + ".html";
        const response = await fetch(file);
        el.innerHTML = await response.text();

        //  레이아웃 재계산 (중앙정렬 안되던 문제 해결)
        document.body.offsetHeight;
    });
});
