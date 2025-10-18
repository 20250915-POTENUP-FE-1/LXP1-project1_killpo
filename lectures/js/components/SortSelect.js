import { $ } from "../../../common/js/utils/dom.js";

export function SortSelect({ onSortChange }) {
  this.sortOption = "최신 등록 순";

  this.init = () => {
    fetch("../../../lectures/ui/sortSelect.html")
      .then((res) => res.text())
      .then((resText) => {
        $(".course-section__actions").insertAdjacentHTML("beforeend", resText);

        bindEvents();
      });
  };

  const bindEvents = () => {
    $(".course-section__sort-select").addEventListener(
      "change",
      handleSortChange
    );
  };

  const notifySortChange = () => {
    if (typeof onSortChange === "function") {
      onSortChange(this.sortOption);
    }
  };

  const handleSortChange = (e) => {
    this.sortOption = e.target.value;

    notifySortChange();
  };
}
