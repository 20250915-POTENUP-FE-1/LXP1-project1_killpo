import { store } from "../../common/js/store/localStorage.js";
import { FilterSidebar } from "./components/FilterSidebar.js";
import { renderCourseList } from "./containers/renderCourseList.js";
import { courseList as mockCourseList } from "./mockData.js";
import { Header } from "../../common/js/components/Header.js";
import { CourseModal } from "../../common/js/components/CourseModal.js";

// 초기 상태 (강좌 리스트, 필터링, 페이지 정보)
const courseList = store.getLocalStorage("courseList") || mockCourseList; // []
const filter = { category: [], level: [] };

// FilterSidebar 초기화
const filterSidebar = new FilterSidebar({
  onFilterChange: (filter) => {
    renderCourseList(courseList, filter);
  },
});
filterSidebar.init();

// Pagination 초기화

// 최초 강의 리스트 렌더링
renderCourseList(courseList, filter);

// CourseModal 초기화
const courseModal = new CourseModal();
courseModal.init();

// Header 초기화

const header = new Header();
header.init();
