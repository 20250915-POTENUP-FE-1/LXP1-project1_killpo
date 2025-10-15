import { $ } from "../../common/js/utils/dom.js";
import { CATEGORY } from "./constants.js";
import {
  createIcons,
  icons,
} from "https://cdn.jsdelivr.net/npm/lucide@latest/+esm";

function FilterSidebar() {
  this.currentCategory = [];
  this.levelOptionList = [];

  this.init = () => {
    fetch("/lectures/ui/filterSidebar.html")
      .then((res) => res.text())
      .then((resText) => {
        document
          .querySelector(".course-dashboard")
          .insertAdjacentHTML("afterbegin", resText);

        // 아이콘 불러오기
        createIcons({ icons });

        // 필터 초기화
        resetFiltering();

        // 카테고리 클릭 이벤트 등록
        $(".filter-sidebar__category-list").addEventListener("click", (e) => {
          if (!e.target.classList.contains("filter-sidebar__category")) return;

          const selected = e.target.innerText;

          // 현재 카테고리 경로 갱신
          if (this.currentCategory.length < 3) {
            this.currentCategory.push(selected);
          } else {
            this.currentCategory[this.currentCategory.length - 1] = selected;
          }

          if (selected === "전체") this.currentCategory.pop();

          // 하위 카테고리 가져오기
          const subCategoryList = getSubCategoryList(this.currentCategory);
          renderCategoryList(subCategoryList);

          // 경로 표시 업데이트
          renderPath();

          console.log("카테고리:", this.currentCategory);
        });

        // 경로 클릭 이벤트 등록
        $(".course-section__title").addEventListener("click", (e) => {
          if (!e.target.classList.contains("filter-sidebar__category-path"))
            return;

          if (e.target.dataset.index) {
            const clickedIndex = parseInt(e.target.dataset.index, 10);
            // 해당 depth까지만 유지 (ex. index 0 클릭 → ['테크'])
            this.currentCategory = this.currentCategory.slice(
              0,
              clickedIndex + 1
            );
          } else {
            this.currentCategory = [];
          }

          // 해당 depth의 하위 카테고리 다시 렌더링
          const subCategoryList = e.target.dataset.index
            ? getSubCategoryList(this.currentCategory)
            : Object.keys(CATEGORY);
          renderCategoryList(subCategoryList);

          // 경로도 다시 렌더링
          renderPath();

          console.log("카테고리:", this.currentCategory);
        });

        // 난이도 클릭 이벤트 등록
        $(".filter-sidebar__option-list").addEventListener("click", (e) => {
          const option = e.target.closest(".filter-sidebar__option");
          if (!option) return;

          const input = option.querySelector(".filter-sidebar__option-input");
          const label = option.querySelector(
            ".filter-sidebar__option-label"
          ).innerText;

          // 체크 상태 반전
          input.checked = !input.checked;

          // 체크 상태 반영
          if (input.checked) {
            if (!this.levelOptionList.includes(label)) {
              this.levelOptionList.push(label);
            }
          } else {
            this.levelOptionList = this.levelOptionList.filter(
              (level) => level !== label
            );
          }

          console.log("난이도:", this.levelOptionList);
        });

        // 필터 초기화 클릭 이벤트 등록
        $(".filter-sidebar__reset").addEventListener("click", (e) => {
          resetFiltering();

          console.log("카테고리:", this.currentCategory);
          console.log("난이도:", this.levelOptionList);
        });
      });
  };

  // 카테고리 렌더링 함수
  const renderCategoryList = (list) => {
    const container = $(".filter-sidebar__category-list");
    if (list.length) container.innerHTML = ""; // 하위 카테고리가 존재하는 경우에 초기화

    list.forEach((item) => {
      const li = document.createElement("li");
      li.className = "filter-sidebar__category";
      li.innerText = item;
      container.appendChild(li);
    });

    // active 상태 표시
    document.querySelectorAll(".filter-sidebar__category").forEach((btn) => {
      const isCurrent =
        btn.innerText === this.currentCategory[this.currentCategory.length - 1];

      // 전체는 currentCategory가 비었을 때만 active
      const isDefaultAll = btn.innerText === "전체";

      btn.classList.toggle(
        "filter-sidebar__category--active",
        isCurrent || isDefaultAll
      );
    });
  };

  // 현재 경로 렌더링
  const renderPath = () => {
    const container = $(".course-section__title");
    container.innerHTML = ""; // 초기화

    // "All" 버튼 생성
    if (this.currentCategory.length) {
      const allSpan = document.createElement("span");
      allSpan.className = "filter-sidebar__category-path";
      allSpan.innerText = "All";
      container.appendChild(allSpan);
    }

    this.currentCategory.forEach((category, index) => {
      // 카테고리
      const span = document.createElement("span");
      span.className = "filter-sidebar__category-path";
      span.dataset.index = index;
      span.innerText = category;

      // 중간 구분자(>)
      const divider = document.createElement("span");
      divider.className = "filter-sidebar__category-path-divider";
      divider.innerText = " > ";

      container.appendChild(divider);
      container.appendChild(span);
    });
  };

  // 필터링 초기화
  const resetFiltering = () => {
    this.currentCategory = [];
    this.levelOptionList = [];

    // 카테고리 초기화
    renderCategoryList(Object.keys(CATEGORY));
    renderPath();

    // 난이도 초기화
    document
      .querySelectorAll(".filter-sidebar__option-input")
      .forEach((input) => (input.checked = false));
  };

  // 하위 카테고리 탐색 로직
  const getSubCategoryList = (path) => {
    if (path.length === 1) {
      return Object.keys(CATEGORY[path[0]]);
    }
    if (path.length === 2) {
      return CATEGORY[path[0]][path[1]];
    }
    return [];
  };
}

const filterSidebar = new FilterSidebar();
filterSidebar.init();
