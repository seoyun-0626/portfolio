import { db } from "./firebase.js";
import { collection, addDoc }
    from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// 글 저장
document.getElementById("saveBtn").addEventListener("click", async () => {
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

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

    alert("저장 완료");
    window.location.href = "board.html";
});
