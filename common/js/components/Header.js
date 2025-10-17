import { $ } from "../utils/dom.js";
import {
  createIcons,
  icons,
} from "https://cdn.jsdelivr.net/npm/lucide@latest/+esm";

export function Header() {
  this.init = () => {
    fetch("../common/ui/header.html")
      .then((response) => response.text())
      .then((responseText) => {
        $(".container").insertAdjacentHTML("afterbegin", responseText);
        // 아이콘 로드
        createIcons({ icons });

        bindEvent();
      });
  };

  const bindEvent = () => {
    // 모달, 프로필 사진 클릭 시 헤더 내 인터랙션 처리
  };
}
