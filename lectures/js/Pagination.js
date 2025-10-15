import { $ } from "../../common/js/utils/dom.js";
import { courseList } from "./paginationMockData.js";

export const START_PAGE = 1;
export const COURSE_PAGE_SIZE = 20;
export const PAGINATION_LIMIT = 9;

function Pagination() {
  this.courses = [];
  this.pageNumber;
  this.lastPage;

  this.init = () => {
    fetch("/lectures/ui/pagination.html")
      .then((res) => res.text())
      .then((resText) => {
        document
          .querySelector(".course-section")
          .insertAdjacentHTML("beforeend", resText);
      });

    this.courses = courseList;
    this.pageNumber = START_PAGE;
    this.lastPage = Math.ceil(this.courses.length / COURSE_PAGE_SIZE);

    renderCourseItem();
    renderPagination();
    bindEvents();
  };

  // courseCard 함수의 단순화 버전
  // 강의 순서를 알 수 있도록 course 객체의 id값을 표시
  const renderCourseItem = () => {
    const startIndex = (this.pageNumber - 1) * COURSE_PAGE_SIZE;
    const endIndex = this.pageNumber * COURSE_PAGE_SIZE;

    const slicedItems = this.courses.slice(startIndex, endIndex);

    const courseItems = slicedItems
      .map((item) => {
        return `<article class="course-card">${item.id}</article>`;
      })
      .join("");
    $(".course-grid").innerHTML = courseItems;
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
  };

  const bindEvents = () => {
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
          this.pageNumber = Number(target.textContent);
        }

        $(".pagination__prev").disabled = this.pageNumber === START_PAGE;
        $(".pagination__next").disabled = this.pageNumber === this.lastPage;

        renderCourseItem();
        renderPagination();
      });
    };
  };
}

const pagenation = new Pagination();
pagenation.init();
