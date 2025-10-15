import { store } from "../../../common/js/store/localStorage.js";
import { renderDetailsPage } from "./containers/renderDetailsPage.js";
import { courseList as mockCourseList } from "../../js/mockData.js";

// 초기 상태
const courseList = store.getLocalStorage("courseList") || mockCourseList; // []
// url에서 강의 id 추출하기
// id로 course 데이터 찾기

const selectedCourse = courseList.find((course) => course.id == 2);
console.log(selectedCourse);

// 강의 상세 렌더링
renderDetailsPage(selectedCourse);
