import { store } from "../../common/js/store/localStorage.js";
import { FilterSidebar } from "./components/FilterSidebar.js";
import { START_PAGE } from "./constants/pagination.js";
import { renderCourseList } from "./containers/renderCourseList.js";
import { courseList as mockCourseList } from "./mockData.js";
import { filterCourseList } from "./utils/filterCourseList.js";
import { Header } from "../../common/js/components/Header.js";
import { CourseModal } from "../../common/js/components/CourseModal.js";
import { Pagination } from "./components/Pagination.js";
import { $ } from "../../common/js/utils/dom.js";

// 초기 상태 (강좌 리스트, 필터링, 페이지 정보)
const courseList = store.getLocalStorage("courseList") || mockCourseList; // []
const filter = { category: [], level: [] };
const pageNumber = START_PAGE;

// Pagination 초기화
const pagination = new Pagination({
  onPageChange: (pageNumber) => {
    renderCourseList(courseList, filter, pageNumber);
  },
});
pagination.init();

// FilterSidebar 초기화
const filterSidebar = new FilterSidebar({
  onFilterChange: (filter) => {
    // 페이지네이션 렌더링
    const filteredCourseList = filterCourseList(courseList, filter);
    pagination.updateCourseList(filteredCourseList);

    // 총 필터링된 강의 개수 렌더링
    $(".course-section__count-emphasis").textContent =
      filteredCourseList.length;

    renderCourseList(courseList, filter, pageNumber);
  },
});
filterSidebar.init();

// 최초 강의 리스트 렌더링
renderCourseList(courseList, filter, pageNumber);

// CourseModal 초기화
const courseModal = new CourseModal();
courseModal.init();

// Header 초기화
const header = new Header();
header.init();
