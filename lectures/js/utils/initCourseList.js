import { courseList } from "../../js/mockData.js";

export const store = {
  // mockData를 localStorage에 초기화하는 함수
  initCourseList() {
    // localStorage에 courseList가 없으면 저장
    if (!store.getLocalStorage("courseList")) {
      store.setLocalStorage("courseList", courseList);
    }
  },
};
