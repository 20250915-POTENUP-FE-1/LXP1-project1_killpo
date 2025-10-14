import { courseList } from "./mockData.js";

// 저장소 객체
export const store = {
  setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getLocalStorage(key) {
    const data = localStorage.getItem(key);
    // data가 null이거나 undefined면 null 반환
    if (data === null || data === undefined) {
      return null;
    }
    return JSON.parse(data);
  },
  // mockData를 localStorage에 초기화하는 함수
  initCourseList() {
    // localStorage에 courseList가 없으면 저장
    if (!this.getLocalStorage("courseList")) {
      this.setLocalStorage("courseList", courseList);
    }
  },
};

// 페이지 로드 시 초기화
store.initCourseList();
