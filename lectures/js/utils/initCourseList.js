import { store } from "../../../common/js/store/localStorage.js";

export const initCourseList = () => {
  // localStorage에 courseList가 없으면 저장
  if (!store.getLocalStorage("courseList")) {
    store.setLocalStorage("courseList", courseList);
  }
};
