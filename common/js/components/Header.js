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
        createIcons({ icons });

        applyBaseUrl();
      });
  };

  const applyBaseUrl = () => {
    // 로고
    $(".logo a").href = buildUrl("/lectures");
    $(".logo img").src = buildUrl("/assets/svg/killpo.svg");

    // 프로필
    $(".avatar-button").href = buildUrl("/mypage");
  };
}
