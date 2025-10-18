import { $ } from "../../../common/js/utils/dom.js";
import {
  START_PAGE,
  COURSE_PAGE_SIZE,
  PAGINATION_LIMIT,
} from "../constants/pagination.js";

export function Pagination({ onPageChange } = {}) {
  this.courses = [];
  this.pageNumber = START_PAGE;
  this.lastPage = START_PAGE;

  this.init = () => {
    fetch("/lectures/ui/pagination.html")
      .then((res) => res.text())
      .then((resText) => {
        $(".course-section").insertAdjacentHTML("beforeend", resText);

        bindEvents();
        renderPagination();
      });
  };

  /**
   * @description 외부에서 필터링된 강좌 리스트를 전달받아 Pagination 내부 상태 갱신
   */
  this.updateCourseList = (courseList) => {
    this.courses = courseList;
    this.lastPage = Math.max(
      1,
      Math.ceil(this.courses.length / COURSE_PAGE_SIZE)
    );
    this.pageNumber = START_PAGE;
    renderPagination();
  };

  const bindEvents = () => {
    $(".pagination").addEventListener("click", (e) => {
      // 다음 버튼 클릭
      if (
        e.target.classList.contains("pagination__next") &&
        this.pageNumber < this.lastPage
      ) {
        this.pageNumber++;
      }

      // 이전 버튼 클릭
      if (
        e.target.classList.contains("pagination__prev") &&
        this.pageNumber > START_PAGE
      ) {
        this.pageNumber--;
      }

      // 숫자 버튼 클릭
      if (e.target.classList.contains("pagination__page")) {
        this.pageNumber = Number(e.target.textContent);
      }

      renderPagination();
    });
  };

  const notifyPageChange = () => {
    if (typeof onPageChange === "function") {
      onPageChange(this.pageNumber);
    }
  };

  const renderPagination = () => {
    const paginationList = $(".pagination__list");
    if (!paginationList) return;

    paginationList.innerHTML = "";

    const groupStart =
      (Math.ceil(this.pageNumber / PAGINATION_LIMIT) - 1) * PAGINATION_LIMIT +
      1;
    const groupEnd = Math.min(groupStart + PAGINATION_LIMIT - 1, this.lastPage);

    for (let page = groupStart; page <= groupEnd; page++) {
      const button = document.createElement("button");
      button.textContent = page;

      // active 적용
      button.classList.add("pagination__page");
      button.classList.toggle(
        "pagination__page--active",
        page === Number(this.pageNumber)
      );

      paginationList.appendChild(button);
    }

    // 이전/다음 비활성화
    $(".pagination__prev").disabled = this.pageNumber === START_PAGE;
    $(".pagination__next").disabled = this.pageNumber === this.lastPage;

    notifyPageChange();
  };
}
