import { $ } from "../../common/js/utils/dom.js";
import { store } from "../../common/js/store/localStorage.js";
import { FilterSidebar } from "./components/FilterSidebar.js";
import { START_PAGE } from "./constants/pagination.js";
import { renderCourseList } from "./containers/renderCourseList.js";
import { courseList as mockCourseList } from "./mockData.js";
import { filterCourseList } from "./utils/filterCourseList.js";
import { Header } from "../../common/js/components/Header.js";
import { CourseModal } from "../../common/js/components/CourseModal.js";
import { Pagination } from "./components/Pagination.js";
import { SortSelect } from "./components/SortSelect.js";

// 전역 상태
const courseList = store.getLocalStorage("courseList") || mockCourseList;
let filter = { category: [], level: [] }; // 필터 상태
let pageNumber = START_PAGE; // 현재 페이지 번호
let sortOption = "최신 등록 순"; // 현재 정렬 옵션

const updateView = ({ skipPaginationUpdate = false } = {}) => {
  const filteredCourseList = filterCourseList(courseList, filter);

  // 무한 루프 방지: 페이지네이션 상태는 필요할 때만 갱신
  if (!skipPaginationUpdate) {
    pagination.updateCourseList(filteredCourseList);
  }

  renderCourseList(courseList, filter, pageNumber, sortOption);

  // 필터링된 총 개수 갱신
  $(".course-section__count-emphasis").textContent = filteredCourseList.length;
};

// Pagination 초기화
const pagination = new Pagination({
  onPageChange: (newPageNumber) => {
    pageNumber = newPageNumber; // 전역 상태 갱신
    updateView({ skipPaginationUpdate: true });
  },
});
pagination.init();

// SortSelect 초기화
const sortSelect = new SortSelect({
  onSortChange: (newSortOption) => {
    sortOption = newSortOption; // 전역 상태 갱신
    pageNumber = START_PAGE; // 정렬 변경 시 1페이지로 이동
    updateView(); // 페이지네이션도 갱신
  },
});
sortSelect.init();

// FilterSidebar 초기화
const filterSidebar = new FilterSidebar({
  onFilterChange: (newFilter) => {
    filter = newFilter; // 전역 상태 갱신
    pageNumber = START_PAGE; // 필터 변경 시 1페이지로 이동
    updateView(); // 페이지네이션도 갱신
  },
});
filterSidebar.init();

// 최초 렌더링
updateView();

// 공통 컴포넌트 초기화
const courseModal = new CourseModal();
courseModal.init();

const header = new Header();
header.init();
