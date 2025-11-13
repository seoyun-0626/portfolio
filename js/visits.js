import {
    doc,
    updateDoc,
    increment,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

import { db } from "./firebase.js";

// firebase.js가 로드될 때까지 대기
async function waitFirebaseReady() {
    while (!window.firebaseReady) {
        await new Promise(res => setTimeout(res, 10));
    }
}
await waitFirebaseReady();

// 오늘 날짜 키 생성
function getTodayKey() {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

// 전체 방문자 증가
async function increaseVisitCount() {
    const ref = doc(db, "visits", "counter");
    await updateDoc(ref, { count: increment(1) });
}

// 오늘 방문자 증가
async function increaseTodayVisit() {
    const todayKey = getTodayKey();
    const todayRef = doc(db, "visits_today", todayKey);
    const todaySnap = await getDoc(todayRef);

    if (todaySnap.exists()) {
        await updateDoc(todayRef, { count: increment(1) });
    } else {
        await setDoc(todayRef, { count: 1 });
    }
}

// 화면 표시
async function displayCounts() {
    const totalRef = doc(db, "visits", "counter");
    const totalSnap = await getDoc(totalRef);

    if (totalSnap.exists()) {
        document.getElementById("totalVisits").innerText =
            "전체 방문자수: " + totalSnap.data().count;
    }

    const todayKey = getTodayKey();
    const todayRef = doc(db, "visits_today", todayKey);
    const todaySnap = await getDoc(todayRef);

    if (todaySnap.exists()) {
        document.getElementById("todayVisits").innerText =
            "오늘 방문자수: " + todaySnap.data().count;
    } else {
        document.getElementById("todayVisits").innerText =
            "오늘 방문자수: 0";
    }
}

// 실행
async function main() {
    await increaseVisitCount();
    await increaseTodayVisit();
    await displayCounts();
}

main();
