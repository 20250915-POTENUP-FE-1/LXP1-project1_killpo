import { $ } from "../../common/js/utils/dom.js";
import { CATEGORY } from "./constants.js";
import {
  createIcons,
  icons,
} from "https://cdn.jsdelivr.net/npm/lucide@latest/+esm";

function FilterSidebar() {
  this.currentCategory = [];
  this.levelOptionList = [];

  // 초기화
  this.init = () => {
    fetch("/lectures/ui/filterSidebar.html")
      .then((res) => res.text())
      .then((resText) => {
        document
          .querySelector(".course-dashboard")
          .insertAdjacentHTML("afterbegin", resText);

        // 아이콘 초기화
        createIcons({ icons });

        // 필터 초기화
        resetFiltering();

        // 이벤트 등록
        bindEvents();
      });
  };

  // 이벤트 바인딩 (모든 이벤트 일괄 등록)
  const bindEvents = () => {
    $(".filter-sidebar__category-list").addEventListener(
      "click",
      handleCategoryClick
    );
    $(".course-section__title").addEventListener("click", handlePathClick);
    $(".filter-sidebar__option-list").addEventListener(
      "click",
      handleLevelClick
    );
    $(".filter-sidebar__reset").addEventListener("click", resetFiltering);
  };

  // 카테고리 클릭 핸들러
  const handleCategoryClick = (e) => {
    if (!e.target.classList.contains("filter-sidebar__category")) return;

    const selected = e.target.innerText;

    if (this.currentCategory.length < 3) this.currentCategory.push(selected);
    else this.currentCategory[this.currentCategory.length - 1] = selected;

    if (selected === "전체") this.currentCategory.pop();

    renderCategoryList(getSubCategoryList(this.currentCategory));
    renderPath();

    console.log(
      "카테고리:",
      this.currentCategory,
      "난이도:",
      this.levelOptionList
    );
  };

  // 경로 클릭 핸들러
  const handlePathClick = (e) => {
    if (!e.target.classList.contains("filter-sidebar__category-path")) return;

    if (e.target.dataset.index) {
      const clickedIndex = parseInt(e.target.dataset.index, 10);
      this.currentCategory = this.currentCategory.slice(0, clickedIndex + 1);
    } else {
      this.currentCategory = [];
    }

    const subCategoryList = e.target.dataset.index
      ? getSubCategoryList(this.currentCategory)
      : Object.keys(CATEGORY);

    renderCategoryList(subCategoryList);
    renderPath();

    console.log(
      "카테고리:",
      this.currentCategory,
      "난이도:",
      this.levelOptionList
    );
  };

  // 난이도 클릭 핸들러
  const handleLevelClick = (e) => {
    const option = e.target.closest(".filter-sidebar__option");
    if (!option) return;

    const input = option.querySelector(".filter-sidebar__option-input");
    const label = option.querySelector(
      ".filter-sidebar__option-label"
    ).innerText;

    // 체크 상태 반전
    input.checked = !input.checked;

    // 상태 반영
    if (input.checked) {
      if (!this.levelOptionList.includes(label)) {
        this.levelOptionList.push(label);
      }
    } else {
      this.levelOptionList = this.levelOptionList.filter(
        (level) => level !== label
      );
    }

    console.log(
      "카테고리:",
      this.currentCategory,
      "난이도:",
      this.levelOptionList
    );
  };

  // 초기화 버튼 핸들러
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

    console.log(
      "카테고리:",
      this.currentCategory,
      "난이도:",
      this.levelOptionList
    );
  };

  // 카테고리 렌더링
  const renderCategoryList = (list) => {
    const container = $(".filter-sidebar__category-list");
    if (list.length) container.innerHTML = "";

    list.forEach((item) => {
      const li = document.createElement("li");
      li.className = "filter-sidebar__category";
      li.innerText = item;
      container.appendChild(li);
    });

    // active 상태 적용
    document.querySelectorAll(".filter-sidebar__category").forEach((btn) => {
      const isCurrent =
        btn.innerText === this.currentCategory[this.currentCategory.length - 1];
      const isDefaultAll = btn.innerText === "전체";
      btn.classList.toggle(
        "filter-sidebar__category--active",
        isCurrent || isDefaultAll
      );
    });
  };

  // 카테고리 경로 렌더링
  const renderPath = () => {
    const container = $(".course-section__title");
    container.innerHTML = "";

    // All 버튼 추가
    if (this.currentCategory.length) {
      const allSpan = document.createElement("span");
      allSpan.className = "filter-sidebar__category-path";
      allSpan.innerText = "All";
      container.appendChild(allSpan);
    }

    this.currentCategory.forEach((category, index) => {
      const divider = document.createElement("span");
      divider.className = "filter-sidebar__category-path-divider";
      divider.innerText = " > ";

      const span = document.createElement("span");
      span.className = "filter-sidebar__category-path";
      span.dataset.index = index;
      span.innerText = category;

      container.appendChild(divider);
      container.appendChild(span);
    });
  };

  // 하위 카테고리 탐색
  const getSubCategoryList = (path) => {
    if (path.length === 1) return Object.keys(CATEGORY[path[0]]);
    if (path.length === 2) return CATEGORY[path[0]][path[1]];
    return [];
  };
}

// 인스턴스 실행
const filterSidebar = new FilterSidebar();
filterSidebar.init();
