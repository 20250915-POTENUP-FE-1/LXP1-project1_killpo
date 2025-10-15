import { $ } from "../../../common/js/utils/dom.js";
import {
  CATEGORY,
  MAX_CATEGORY_DEPTH,
  CATEGORY_DEPTH,
} from "../constants/category.js";
import {
  createIcons,
  icons,
} from "https://cdn.jsdelivr.net/npm/lucide@latest/+esm";

/**
 * @class FilterSidebar
 * @description 강의 목록 페이지의 필터 사이드바를 관리하는 클래스.
 * 카테고리 선택, 난이도 선택, 초기화 등 필터링 관련 인터랙션을 처리한다.
 */
export function FilterSidebar({ onFilterChange } = {}) {
  /** @type {string[]} 현재 선택된 카테고리 경로 */
  this.currentCategory = [];

  /** @type {string[]} 현재 선택된 난이도 목록 */
  this.levelOptionList = [];

  /**
   * @description 초기화 함수 — HTML 템플릿 로드, 아이콘 생성, 이벤트 바인딩 및 기본 상태 설정
   */
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

  /**
   * @description 필터 사이드바의 모든 이벤트를 일괄 등록한다.
   */
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

  const notifyFilterChange = () => {
    if (typeof onFilterChange === "function") {
      onFilterChange({
        category: this.currentCategory,
        level: this.levelOptionList,
      });

      // 테스트용
      console.log(
        "카테고리:",
        this.currentCategory,
        "난이도:",
        this.levelOptionList
      );
    }
  };

  /**
   * @description 카테고리 클릭 시 경로 및 하위 카테고리를 갱신한다.
   */
  const handleCategoryClick = (e) => {
    if (!e.target.classList.contains("filter-sidebar__category")) return;

    const selected = e.target.innerText;

    // 경로 갱신
    if (this.currentCategory.length < MAX_CATEGORY_DEPTH)
      this.currentCategory.push(selected);
    else this.currentCategory[this.currentCategory.length - 1] = selected;

    // 전체 클릭 시 상위 단계로 이동
    if (selected === "전체") this.currentCategory.pop();

    // 렌더링 갱신
    renderCategoryList(getSubCategoryList(this.currentCategory));
    renderPath();

    notifyFilterChange();
  };

  /**
   * @description 상단 경로 클릭 시, 클릭한 depth까지만 유지하며 카테고리를 재렌더링한다.
   */
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

    notifyFilterChange();
  };

  /**
   * @description 난이도 필터 클릭 시 체크 상태를 반전시키고 내부 상태를 갱신한다.
   */
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

    notifyFilterChange();
  };

  /**
   * @description 모든 필터(카테고리, 난이도)를 초기 상태로 되돌린다.
   */
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

    notifyFilterChange();
  };

  /**
   * @description 전달된 카테고리 리스트를 기반으로 사이드바 카테고리를 렌더링한다.
   * @param {string[]} list 렌더링할 카테고리 리스트
   */
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

  /**
   * @description 상단에 현재 선택된 카테고리 경로를 렌더링한다.
   */
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

  /**
   * @description 주어진 경로 배열에 따라 하위 카테고리 목록을 반환한다.
   * @param {string[]} path 현재 카테고리 경로
   * @returns {string[]} 하위 카테고리 목록
   */
  const getSubCategoryList = (path) => {
    if (path.length === CATEGORY_DEPTH.first)
      return Object.keys(CATEGORY[path[0]]);
    if (path.length === CATEGORY_DEPTH.second)
      return CATEGORY[path[0]][path[1]];
    return [];
  };
}
