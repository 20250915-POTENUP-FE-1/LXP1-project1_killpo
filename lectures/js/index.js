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
import { SearchBar } from "./components/SearchBar.js";
import { searchCourseList } from "./utils/searchCourseList.js";

// 전역 상태
const courseList = store.getLocalStorage("courseList") || mockCourseList;
let filter = { category: [], level: [] }; // 필터 상태
let pageNumber = START_PAGE; // 현재 페이지 번호
let sortOption = "최신 등록 순"; // 현재 정렬 옵션
let searchKeyword = ""; // 검색 키워드

const updateView = ({ skipPaginationUpdate = false } = {}) => {
  // 1. 필터
  const filteredCourseList = filterCourseList(courseList, filter);

  // 2. 검색
  const searchedCourseList = searchCourseList(
    filteredCourseList,
    searchKeyword
  );

  // 3. 페이지네이션 상태 갱신
  if (!skipPaginationUpdate) {
    pagination.updateCourseList(searchedCourseList);
  }

  // 4. 정렬 + 렌더링
  renderCourseList(searchedCourseList, filter, pageNumber, sortOption);

  // 5. 결과 개수 업데이트
  $(".course-section__count-emphasis").textContent = searchedCourseList.length;
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

// SearchBar 초기화
const searchBar = new SearchBar({
  onSearchChange: (newKeyword) => {
    searchKeyword = newKeyword; // 전역 상태 갱신
    pageNumber = START_PAGE; // 키워드 변경 시 1페이지로 이동
    updateView(); // 페이지네이션도 갱신
  },
});

header.init().then(() => {
  searchBar.init();
});
