import { store } from "../../../common/js/store/localStorage.js";
import { renderDetails } from "./containers/renderDetails.js";
import { courseList as mockCourseList } from "../../js/mockData.js";

// 초기 상태
const courseList = store.getLocalStorage("courseList") || mockCourseList; // []

// URL에서 강좌 ID 가져오기
const params = new URLSearchParams(window.location.search);
const courseId = params.get("id");

// 강좌 리스트에서 강좌 ID로 찾기
const selectedCourse = courseList.find((course) => course.id === courseId);

// 강좌 상세 렌더링
renderDetails(selectedCourse);
