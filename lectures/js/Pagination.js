import { courseList } from "./paginationMockData.js";

const $ = (selector) => document.querySelector(selector);

function Pagination() {
  this.courses = [];
  this.pageNumber;

  // 마지막 장을 알기 위한 변수 선언
  // 카테고리 선택 시 this.courses의 배열 길이가 달라지므로 상태 관리 변수 사용
  this.lastPage;

  // 한 페이지에 보여줄 강의 개수
  const maxCourse = 20;

  this.init = () => {
    // store.getLocalStorage 과정 생략
    this.courses = courseList;
    this.pageNumber = 1;

    // 총 페이지 계산하여 lastPage 변수 할당
    // Math.ceil 메소드 사용하여 반올림 처리
    this.lastPage = Math.ceil(this.courses.length / maxCourse);
    console.log(this.lastPage);

    renderCourseItem();
    renderPageNav();
    bindEvents();
  };

  // courseCard 함수의 단순화 버전
  // 강의 순서를 알 수 있도록 course 객체의 id값을 표시
  const renderCourseItem = () => {
    const startIndex = (this.pageNumber - 1) * maxCourse;
    const endIndex = this.pageNumber * maxCourse;

    const slicedItems = this.courses.slice(startIndex, endIndex);

    const courseItems = slicedItems
      .map((item) => {
        return `<article class="course-card">${item.id}</article>`;
      })
      .join("");
    $(".course-grid").innerHTML = courseItems;
  };

  const renderPageNav = () => {
    const paginationList = $(".pagination__list");
    if (!paginationList) return;

    paginationList.innerHTML = "";

    const groupButtonIndex = Math.ceil(this.pageNumber / 9);
    const groupStartIndex = (groupButtonIndex - 1) * 9 + 1;

    const groupEndIndex = Math.min(groupStartIndex + 8, this.lastPage);

    for (let i = groupStartIndex; i <= groupEndIndex; i++) {
      // 버튼 요소 생성
      const button = document.createElement("button");
      button.classList.add("pagination__page");
      button.textContent = i;

      // 현재 페이지일 경우 active 클래스 추가
      if (i == this.pageNumber) {
        button.classList.add("pagination__page--active");
      }
      paginationList.appendChild(button);
    }

    const prevButton = document.querySelector(
      ".pagination__control:first-child"
    );

    const nextButton = document.querySelector(
      ".pagination__control:last-of-type"
    );

    if (this.pageNumber == 1) {
      prevButton.disabled = true;
    } else {
      prevButton.disabled = false;
    }

    if (this.pageNumber == this.lastPage) {
      nextButton.disabled = true;
    } else {
      nextButton.disabled = false;
    }
  };

  const bindEvents = () => {
    $(".pagination").addEventListener("click", (e) => {
      if (e.target.textContent.includes("다음")) {
        this.pageNumber++;
        renderCourseItem();
        renderPageNav();
      }
      if (e.target.textContent.includes("이전")) {
        this.pageNumber--;
        renderCourseItem();
        renderPageNav();
      }

      if (e.target.classList.contains("pagination__page")) {
        this.pageNumber = e.target.textContent;
        renderCourseItem();
        renderPageNav();
      }
    });
  };
}

const pagenation = new Pagination();
pagenation.init();
