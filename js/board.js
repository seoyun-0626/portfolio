import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

import { db } from "./firebase.js";

// 게시글 불러오기
async function loadPosts() {
    const postList = document.getElementById("postList");
    postList.innerHTML = "";

    const postsRef = collection(db, "posts");
    const snapshot = await getDocs(postsRef);

    snapshot.forEach(doc => {
        const data = doc.data();

        const item = document.createElement("div");
        item.innerHTML = `
            <a href="view.html?id=${doc.id}">${data.title}</a><br>
            조회수: ${data.views}
            <hr>
        `;

        postList.appendChild(item);
    });
}

loadPosts();
