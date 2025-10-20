import {
  ref,
  set,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { db } from "./firebase.js";

/**
 * Firebase에서 배열이 객체 형태로 저장되는 경우("0", "1", "2"...)가 있음
 * 이때 자동으로 Object.values()로 변환
 */
function normalizeValue(value) {
  if (value === null || value === undefined) return value;

  // 이미 배열인 경우 그대로 반환
  if (Array.isArray(value)) return value;

  // 객체인 경우 숫자 키만 있는지 검사
  if (typeof value === "object") {
    const keys = Object.keys(value);
    if (keys.length > 0 && keys.every((k) => /^\d+$/.test(k))) {
      // 숫자 키 순서대로 정렬 후 값 배열로 변환
      return keys.sort((a, b) => Number(a) - Number(b)).map((k) => value[k]);
    }
  }

  return value;
}

export const store = {
  async setLocalStorage(key, value) {
    try {
      // localStorage에 저장
      localStorage.setItem(key, JSON.stringify(value));

      // Firebase에도 저장
      await set(ref(db, `shared/${key}`), value);

      return true;
    } catch (error) {
      console.error("[store.setLocalStorage] Error:", error);
      return false;
    }
  },

  async getLocalStorage(key) {
    try {
      // 1. localStorage에서 먼저 시도
      const data = localStorage.getItem(key);
      if (data !== null) {
        return normalizeValue(JSON.parse(data));
      }

      // 2. 없으면 Firebase에서 가져와 localStorage에 저장
      const snapshot = await get(child(ref(db), `shared/${key}`));
      if (snapshot.exists()) {
        const serverData = snapshot.val();
        const normalized = normalizeValue(serverData);
        localStorage.setItem(key, JSON.stringify(normalized));
        return normalized;
      }

      return null;
    } catch (error) {
      console.error("[store.getLocalStorage] Error:", error);
      return null;
    }
  },
};
