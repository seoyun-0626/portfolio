import {
  doc,
  getDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

import { db } from "./firebase.js";

const params = new URLSearchParams(location.search);
const id = params.get("id");

loadPost();

async function loadPost() {
  const ref = doc(db, "boards", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return;

  const data = snap.data();

  document.getElementById("title").innerText = data.title;
  document.getElementById("content").innerText = data.content;
  document.getElementById("meta").innerText =
    `${data.writer} | ${data.createdAt.toDate().toLocaleString()}`;

  await updateDoc(ref, { views: increment(1) });
}
