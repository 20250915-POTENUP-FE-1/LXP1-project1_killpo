import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBSCgS58w4tEz0t1pkMhaZt0Yyj6-WQK_w",
  authDomain: "killpo-845f4.firebaseapp.com",
  databaseURL: "https://killpo-845f4-default-rtdb.firebaseio.com",
  projectId: "killpo-845f4",
  storageBucket: "killpo-845f4.firebasestorage.app",
  messagingSenderId: "155753076341",
  appId: "1:155753076341:web:9b909e18d6dacbf3f7ca3c",
  measurementId: "G-7PYF04GVN8",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
