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
import {
  ref,
  get,
  child,
  onValue,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";
import { db } from "../../common/js/store/firebase.js";

const LOCAL_KEY = "courseList";
const DB_KEY = "shared/courseList";

const dbRef = ref(db);

get(child(dbRef, DB_KEY)).then((snapshot) => {
  if (snapshot.exists()) {
    let data = snapshot.val();
    if (!Array.isArray(data)) data = Object.values(data);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
    console.log("✅ 서버에서 courseList 불러옴:", data);
  } else {
    console.log("⚠️ 서버에 courseList 없음");
  }
});

onValue(ref(db, DB_KEY), (snapshot) => {
  let data = snapshot.val();
  if (data) {
    if (!Array.isArray(data)) data = Object.values(data);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
    console.log("🌐 실시간 반영됨:", data);
    updateView();
  }
});

(async () => {
  // ✅ Promise를 벗기기 위해 await 추가
  const courseList =
    (await store.getLocalStorage("courseList")) || mockCourseList;
  let filter = { category: [], level: [] };
  let pageNumber = START_PAGE;
  let sortOption = "최신 등록 순";
  let searchKeyword = "";

  const updateView = ({ skipPaginationUpdate = false } = {}) => {
    const filteredCourseList = filterCourseList(courseList, filter);
    const searchedCourseList = searchCourseList(
      filteredCourseList,
      searchKeyword
    );

    if (!skipPaginationUpdate) pagination.updateCourseList(searchedCourseList);

    renderCourseList(searchedCourseList, filter, pageNumber, sortOption);
    $(".course-section__count-emphasis").textContent =
      searchedCourseList.length;
  };

  // Pagination 초기화
  const pagination = new Pagination({
    onPageChange: (newPageNumber) => {
      pageNumber = newPageNumber;
      updateView({ skipPaginationUpdate: true });
    },
  });
  pagination.init();

  // SortSelect 초기화
  const sortSelect = new SortSelect({
    onSortChange: (newSortOption) => {
      sortOption = newSortOption;
      pageNumber = START_PAGE;
      updateView();
    },
  });
  sortSelect.init();

  // FilterSidebar 초기화
  const filterSidebar = new FilterSidebar({
    onFilterChange: (newFilter) => {
      filter = newFilter;
      pageNumber = START_PAGE;
      updateView();
    },
  });
  filterSidebar.init();

  // 최초 렌더링
  updateView();

  // 공통 컴포넌트 초기화
  const courseModal = new CourseModal();
  courseModal.init();

  const header = new Header();

  const searchBar = new SearchBar({
    onSearchChange: (newKeyword) => {
      searchKeyword = newKeyword;
      pageNumber = START_PAGE;
      updateView();
    },
  });

  header.init().then(() => {
    searchBar.init();
  });
})();
