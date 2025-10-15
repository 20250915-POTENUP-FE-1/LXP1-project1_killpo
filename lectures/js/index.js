import { store } from "../../common/js/store/localStorage.js";
import { FilterSidebar } from "./components/FilterSidebar.js";
import { renderCourseList } from "./containers/renderCourseList.js";

// 초기 상태 (강좌 리스트, 필터링, 페이지 정보)
const courseList = store.getLocalStorage("courseList") || [];
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
