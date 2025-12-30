import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

import { db } from "./firebase.js";

const btn = document.getElementById("write-btn");

btn.addEventListener("click", async () => {
  const writer = document.getElementById("write-writer").value.trim();
  const title = document.getElementById("write-title").value.trim();
  const content = document.getElementById("write-content").value.trim();

  if (!writer || !title || !content) {
    alert("작성자 / 제목 / 내용을 모두 입력하세요");
    return;
  }

  try {
    await addDoc(collection(db, "boards"), {
      writer,
      title,
      content,
      createdAt: serverTimestamp(),
      views: 0
    });

    // 입력 초기화
    document.getElementById("write-writer").value = "";
    document.getElementById("write-title").value = "";
    document.getElementById("write-content").value = "";

    // ✅ 보드 목록 갱신 신호
    window.dispatchEvent(new Event("board-updated"));

    alert("등록 완료");
  } catch (e) {
    console.error("등록 실패:", e);
    alert("등록 실패 (콘솔 확인)");
  }
});
