import { $ } from "../utils/dom.js";
import {
  createIcons,
  icons,
} from "https://cdn.jsdelivr.net/npm/lucide@latest/+esm";
import { buildUrl } from "../utils/buildUrl.js";

export function Header() {
  this.init = () => {
    return fetch(buildUrl("/common/ui/header.html"))
      .then((response) => response.text())
      .then((responseText) => {
        $(".container").insertAdjacentHTML("afterbegin", responseText);
        // 아이콘 로드
        createIcons({ icons });

        bindEvent();
      });
  };

  const bindEvent = () => {
    // 로고 클릭 이벤트 바인딩
    $(".logo a").addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = buildUrl("/lectures");
    });

    // 프로필 클릭 이벤트 바인딩
    $(".avatar-button").addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = buildUrl("/mypage");
    });
  };
}
