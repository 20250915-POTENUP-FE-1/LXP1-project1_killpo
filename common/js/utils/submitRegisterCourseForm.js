import { $ } from "./dom.js";
import { store } from "../store/localStorage.js";
import { buildUrl } from "./buildUrl.js";
import { validateRegisterCourseForm } from "./validateRegisterCourseForm.js";

// 썸네일 파일을 dataURL(Base64)로 읽기
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
}

// 강좌 등록 모달
export async function submitRegisterCourseForm() {
  if (!validateRegisterCourseForm()) return false;

  // 1) html에서 요소를 찾고 value 가져오기 + 공백 제거, null값이면 "" 사용
  const courseTitle = ($("#create-course-title")?.value || "").trim();
  const courseSummary = ($("#create-course-summary")?.value || "").trim();
  const courseLevel = $("#create-course-difficulty")?.value || "";
  const courseDescription = (
    $("#create-course-description")?.value || ""
  ).trim();
  const thumbnailFile = $("#create-thumbnail-file")?.files?.[0];
  // ?.files 선택된 파일 목록 불러오기, ?.[0] 첫번째 이미지만 사용
  // ?. >> 값이 없었을때 오류 방지

  // 2) 사용자가 선택한 카테고리(1/2/3차)
  // 카테고리 값 가져오기
  const categoryFirst = $("#create-course-category-primary")?.value || "";
  const categorySecond = $("#create-course-category-secondary")?.value || "";
  const categoryThird = $("#create-course-category-tertiary")?.value || "";
  // 카테고리 값 문자열로
  const categoryPath = [categoryFirst, categorySecond, categoryThird];

  // 3) 썸네일 Base64 변환 (비동기)
  let thumbnailUrl = "";
  try {
    thumbnailUrl = await readFileAsDataURL(thumbnailFile);
  } catch (err) {
    console.error(err);
    thumbnailUrl = "";
  }

  // 4) 새 강좌 생성
  const courseList = store.getLocalStorage("courseList") || [];
  // 강좌 id를 생성일시를 추가해 유니크하게 만들기
  const createdAt = new Date().toISOString();
  const newId = `${Date.now()}-${createdAt.replace(/[:.]/g, "-")}`;
  // 로컬스토리지에서 등록된 id 검토 후 마지막 id +1
  // courseList.length > 0
  //   ? String(Math.max(...courseList.map((c) => Number(c.id) || 0)) + 1)
  //   : "1";

  // 5) 새 객체 생성
  const newCourse = {
    id: newId,
    title: courseTitle,
    description: courseSummary,
    content: courseDescription,
    thumbnailUrl, // Base64변환
    instructor: "김조이", // 강사명 고정값으로 설정
    category: categoryPath,
    level: courseLevel,
    tags: [categoryPath[categoryPath.length - 1], courseLevel],
    reviews: [],
    studentCount: 0,
    createdAt,
  };

  // 6) 로컬스토리지에 저장
  courseList.push(newCourse);
  const courseSaved = store.setLocalStorage("courseList", courseList);

  // 로컬스토리지에 저장 후 저장완료 반환값 불러오기
  // 7) 반환 값이 true 일때 저장 성공 메세지
  if (courseSaved) {
    alert("강좌가 등록되었습니다.");
    $("#course-create-form")?.reset();

    // 성공했다면 모달창 닫기
    const modal = $("#course-create");
    if (modal) modal.style.display = "none";
    // mypage 로 이동
    window.location.replace(buildUrl("/mypage"));
    return true;
    // 반환값이 false 일때 메세지
  } else {
    alert("강좌 등록에 실패했습니다. 다시 시도해주세요.");
    return false;
  }
}
