import {
  doc,
  getDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

import { db } from "./firebase.js";

const modal = document.getElementById("project-modal");
const modalContent = modal.querySelector(".modal-content");

window.addEventListener("board-view", async (e) => {
  const id = e.detail.id;

  const ref = doc(db, "boards", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return;

  const data = snap.data();

  await updateDoc(ref, { views: increment(1) });

  modalContent.innerHTML = `
    <button class="modal-close" onclick="closeModal()">×</button>
    <h3>${data.title}</h3>
    <p style="color:#aaa; font-size:14px;">
      ${data.writer} · ${
        data.createdAt
          ? data.createdAt.toDate().toLocaleString("ko-KR")
          : ""
      }
    </p>
    <div style="margin-top:20px; line-height:1.7;">
      ${data.content.replace(/\n/g, "<br>")}
    </div>
  `;

  modal.style.display = "flex";
});
