import { buildUrl } from "./buildUrl";

document.addEventListener("DOMContentLoaded", () => {
  fetch(buildUrl("/common/ui/head.html"))
    .then((res) => {
      if (!res.ok) throw new Error("head.html을 불러올 수 없습니다.");
      return res.text();
    })
    .then((html) => {
      document.head.insertAdjacentHTML("beforeend", html);
    })
    .catch((err) => console.error(err));
});
