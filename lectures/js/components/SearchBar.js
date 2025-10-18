import { $ } from "../../../common/js/utils/dom.js";
import {
  createIcons,
  icons,
} from "https://cdn.jsdelivr.net/npm/lucide@latest/+esm";

export function SearchBar({ onSearchChange }) {
  this.keyword = "";

  this.init = () => {
    fetch("/lectures/ui/searchBar.html")
      .then((res) => res.text())
      .then((resText) => {
        $(".header-controls").insertAdjacentHTML("beforeend", resText);

        // 아이콘 로드
        createIcons({ icons });

        $(".search-clear").style.display = "none";

        bindEvents();
      });
  };

  const bindEvents = () => {
    // 검색 버튼 클릭 시
    $(".search-submit").addEventListener("click", (e) => {
      this.keyword = $(".search-input").value.trim();

      notifySearchChange();
    });

    // Clear 버튼 클릭 시
    $(".search-clear").addEventListener("click", () => {
      this.keyword = "";
      $(".search-input").value = "";
      $(".search-clear").style.display = "none";

      notifySearchChange();
    });

    // 입력값이 있을 때만 clear 버튼 표시
    $(".search-input").addEventListener("input", () => {
      $(".search-clear").style.display = $(".search-input").value
        ? "block"
        : "none";
    });

    // 엔터 키로도 검색 가능하게
    $(".search-input").addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // 폼 기본 submit 막기
        this.keyword = $(".search-input").value.trim();

        notifySearchChange();
      }
    });

    // 실시간 검색
    // $(".search-input").addEventListener("input", (e) => {
    //   this.keyword = e.target.value;

    //   notifySearchChange();
    // });
  };

  const notifySearchChange = () => {
    if (typeof onSearchChange === "function") {
      onSearchChange(this.keyword);
    }
  };
}
