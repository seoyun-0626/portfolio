// firebase.js

// Firebase 모듈 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDS-2afSvJbtJtIwdo6ulpe61Ko6hQiTac",
  authDomain: "portfolio-7f933.firebaseapp.com",
  projectId: "portfolio-7f933",
  storageBucket: "portfolio-7f933.appspot.com",
  messagingSenderId: "87644402170",
  appId: "1:87644402170:web:d1c651844809cff4d327443",
  measurementId: "G-2S6VV16MJH"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// 준비 완료 신호
window.firebaseReady = true;

