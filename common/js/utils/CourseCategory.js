import { CATEGORY } from "../../../lectures/js/constants/category.js";

// 1차 카테고리 목록 가져오기
export function getFirstCategories() {
  return Object.keys(CATEGORY).filter((key) => key !== "전체");
  // 전체는 카테고리가 아니여서 제외 처리
}

// 1차에서 선택한 카테고리 받아와 2차 카테고리 목록 가져오기 , 값이 없으면 반환
export function getSecondCategories(firstCategory) {
  if (!firstCategory || !CATEGORY[firstCategory]) {
    return [];
  }
  return Object.keys(CATEGORY[firstCategory]);
}

// 1차, 2차가 완료되면 3차 카테고리 목록 가져오기
export function getThirdCategories(firstCategory, secondCategory) {
  if (
    !firstCategory ||
    !secondCategory ||
    !CATEGORY[firstCategory]?.[secondCategory]
  ) {
    return [];
  }
  return CATEGORY[firstCategory][secondCategory];
}

// 카테고리 경로 생성
export function getCategoryPath(first, second, third) {
  let path = first;
  if (second) path += ` > ${second}`;
  if (third) path += ` > ${third}`;
  return path;
}
