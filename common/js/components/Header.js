import { $ } from "../utils/dom.js";

export function Header() {
  this.init = () => {
    fetch("/common/ui/header.html")
      .then((response) => response.text())
      .then((responseText) => {
        $(".container").insertAdjacentHTML("afterbegin", responseText);
        bindEvent();
      });
  };

  const bindEvent = () => {
    // 모달, 프로필 사진 클릭 시 헤더 내 인터랙션 처리
  };
}

const header = new Header();
header.init();
