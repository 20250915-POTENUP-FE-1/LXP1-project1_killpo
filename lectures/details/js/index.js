import { store } from "../../../common/js/store/localStorage.js";
import { renderDetailsPage } from "./containers/renderDetailsPage.js";
import { courseList as mockCourseList } from "../../js/mockData.js";

// 초기 상태
const courseList = store.getLocalStorage("courseList") || mockCourseList; // []

// URL에서 강의 ID 가져오기
const path = window.location.search;
const COURSE_ID = path.split("=")[1];

// 강의 리스트에서 강의 ID로 찾기
const selectedCourse = courseList.find((course) => course.id === COURSE_ID);

// 강의 상세 렌더링
renderDetailsPage(selectedCourse);
