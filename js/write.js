import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const saveBtn = document.getElementById("saveBtn");
const postList = document.getElementById("postList");

/* =========================
   글 목록 불러오기
========================= */
async function loadPosts() {
  postList.innerHTML = "";

  const q = query(
    collection(db, "posts"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  snapshot.forEach(doc => {
    const post = doc.data();

    const item = document.createElement("div");
    item.className = "board-item";
    item.innerHTML = `
      <h4>${post.title}</h4>
      <p>${post.content}</p>
      <span class="date">
        ${post.createdAt?.toDate().toLocaleString()}
      </span>
    `;

    postList.appendChild(item);
  });
}

/* =========================
   글 저장
========================= */
saveBtn.addEventListener("click", async () => {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !content) {
    alert("제목과 내용을 입력하세요.");
    return;
  }

  await addDoc(collection(db, "posts"), {
    title,
    content,
    views: 0,
    createdAt: new Date()
  });

  titleInput.value = "";
  contentInput.value = "";

  loadPosts(); // 🔥 페이지 이동 대신 목록 갱신
});

/* 초기 로드 */
loadPosts();
