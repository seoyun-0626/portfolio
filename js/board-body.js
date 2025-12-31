/* ===============================
   Firebase Firestore 모듈 import
   =============================== */
import {
    collection,
    query,
    orderBy,
    limit,
    startAfter,
    getDocs
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

import { db } from "./firebase.js";


/* ===============================
   DOM 요소 참조
   =============================== */
const tbody = document.getElementById("board-body");     // 게시글 tbody
const pagination = document.getElementById("pagination"); // 페이지 버튼 영역


/* ===============================
   페이지 관련 전역 변수
   =============================== */
const PAGE_SIZE = 10;     // 한 페이지당 게시글 수 (고정 10개)
let totalPages = 1;       // 전체 페이지 수
let currentPage = 1;      // 현재 페이지
let lastDocs = [];        // 페이지별 마지막 문서 (Firestore 페이징용)


/* ===============================
   전체 게시글 수 기반으로
   페이지 개수 계산
   =============================== */
async function loadTotalPages() {
    const snapshot = await getDocs(collection(db, "boards"));
    totalPages = Math.ceil(snapshot.size / PAGE_SIZE);
}


/* ===============================
   특정 페이지 로드
   =============================== */
async function loadPage(page) {
    let q;

    // ▶ 1페이지
    if (page === 1) {
        q = query(
            collection(db, "boards"),
            orderBy("createdAt", "desc"),
            limit(PAGE_SIZE)
        );
    }
    // ▶ 2페이지 이상
    else {
        const lastDoc = lastDocs[page - 2]; // 이전 페이지의 마지막 문서
        if (!lastDoc) return;

        q = query(
            collection(db, "boards"),
            orderBy("createdAt", "desc"),
            startAfter(lastDoc),
            limit(PAGE_SIZE)
        );
    }

    const snapshot = await getDocs(q);

    // 테이블 렌더링
    renderTable(snapshot, page);

    // 현재 페이지 마지막 문서 저장
    lastDocs[page - 1] = snapshot.docs[snapshot.docs.length - 1];
    currentPage = page;
}


/* ===============================
   게시글 테이블 렌더링
   =============================== */
function renderTable(snapshot, page) {
    page = Number(page); // ✅ 추가한 유일한 한 줄

    tbody.innerHTML = "";

    let rowNumber = (page - 1) * PAGE_SIZE + 1;

    snapshot.forEach(doc => {
        const data = doc.data();

        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${rowNumber}</td>
      <td class="board-title" data-id="${doc.id}">
        ${data.title}
      </td>
      <td>${data.writer}</td>
      <td>
        ${data.createdAt
                ? data.createdAt.toDate().toLocaleString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit"
                })
                : ""
            }
      </td>
    `;
        tbody.appendChild(tr);

        rowNumber++;
    });


    // ▶ 게시글이 10개 미만이어도 항상 10칸 확보
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

    // 페이지 버튼 갱신
    renderPagination(page);
}


/* ===============================
   페이지네이션 버튼 렌더링
   =============================== */
function renderPagination(activePage) {
    pagination.innerHTML = "";

    // ▶ 전체 페이지 수만큼 버튼 생성
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;

        if (i === activePage) {
            btn.classList.add("active");
        }

        btn.onclick = () => loadPage(i);
        pagination.appendChild(btn);
    }
}


/* ===============================
   게시글 제목 클릭 → 상세 모달
   =============================== */
document.addEventListener("click", e => {
    if (e.target.classList.contains("board-title")) {
        window.dispatchEvent(
            new CustomEvent("board-view", {
                detail: { id: e.target.dataset.id }
            })
        );
    }
});


/* ===============================
   초기 실행
   =============================== */
async function init() {
    await loadTotalPages(); // 전체 페이지 계산
    loadPage(1);            // 1페이지 로드
}

init();

/* ===============================
   게시글 등록 후 목록 즉시 갱신
   =============================== */
window.addEventListener("board-updated", async () => {
  await loadTotalPages(); // 전체 페이지 다시 계산
  loadPage(1);            // 1페이지 다시 로드
});