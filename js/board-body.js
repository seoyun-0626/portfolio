import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

import { db } from "./firebase.js";

const tbody = document.getElementById("board-body");
const PAGE_SIZE = 10;

loadList();

async function loadList() {
    tbody.innerHTML = "";

    const snapshot = await getDocs(collection(db, "boards"));

    let index = 1;

    snapshot.forEach(doc => {
        const data = doc.data();

        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${index++}</td>
      <td class="board-title" data-id="${doc.id}">${data.title}</td>
      <td>${data.writer}</td>
      <td>${data.createdAt?.toDate().toLocaleDateString() ?? ""}</td>
    `;
        tbody.appendChild(tr);
    });

    // 🔥 10칸 고정 확보
    const emptyCount = PAGE_SIZE - snapshot.size;
    for (let i = 0; i < emptyCount; i++) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>&nbsp;</td>
      <td></td>
      <td></td>
      <td></td>
    `;
        tbody.appendChild(tr);
    }
}

window.addEventListener("board-updated", () => {
    loadList();
});