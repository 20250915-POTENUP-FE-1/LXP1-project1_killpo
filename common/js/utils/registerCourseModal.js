import { $ } from "./dom.js";
import { store } from "../store/localStorage.js";

// 썸네일 파일을 dataURL(Base64)로 읽는 헬퍼
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
}

// 제출 버튼 클릭 호출
export async function RegisterCourseModal() {
  // 1) 현재 입력값 읽기
  const $form = $("#course-create-form");
  const $title = $("#create-course-title");
  const $summary = $("#create-course-summary");
  const $level = $("#create-course-difficulty");
  const $desc = $("#create-course-description");
  const $thumb = $("#create-thumbnail-file");

  const courseTitle = ($title?.value || "").trim();
  const courseSummary = ($summary?.value || "").trim();
  const courseLevel = $level?.value || "";
  const courseDescription = ($desc?.value || "").trim();
  const thumbnailFile = $thumb?.files?.[0];

  // 카테고리(1/2/3차) 선택

  // 3) 썸네일 Base64 변환 (비동기)
  let thumbnailUrl = "";
  try {
    thumbnailUrl = await readFileAsDataURL(thumbnailFile);
  } catch (err) {
    console.error(err);
    alert("오류가 발생했습니다. 입력 정보를 확인해주세요.");
    return false;
  }

  // 4) 로컬스토리지에서 ID 검토 후 마지막 id +1 후
  const courseList = store.getLocalStorage("courseList") || [];
  const newId =
    courseList.length > 0
      ? String(Math.max(...courseList.map((c) => Number(c.id) || 0)) + 1)
      : "1";

  // 5) 새 객체 생성
  const newCourse = {
    id: newId,
    title: courseTitle,
    description: courseSummary,
    content: courseDescription,
    level: courseLevel,
    thumbnailUrl, // Base64

    //category, //
    createdAt: new Date().toISOString(),
  };

  // 6) 로컬스토리지에 저장
  courseList.push(newCourse);
  const courseSaved = store.setLocalStorage("courseList", courseList);

  // 7) 저장 메세지
  if (courseSaved) {
    alert("강의가 저장되었습니다.");
    $form?.reset();

    const modal = $("#course-create");
    if (modal) modal.style.display = "none";

    // 확인용 로그
    console.log("저장된 강의:", newCourse);
    console.log("전체 강의 목록:", courseList);
    return true;
  } else {
    alert("강의 저장에 실패했습니다. 다시 시도해주세요.");
    return false;
  }
}

/*
//  검증
  if (!courseTitle) {
    alert("강의 제목을 입력해주세요.");
    $title?.focus();
    return false;
  }
  if (!courseSummary) {
    alert("한 줄 요약을 입력해주세요.");
    $summary?.focus();
    return false;
  }

  if (!courseLevel) {
    alert("난이도를 선택해주세요.");
    $level?.focus();
    return false;
  }
  if (!courseDescription) {
    alert("상세 설명을 입력해주세요.");
    $desc?.focus();
    return false;
  }
  if (!thumbnailFile) {
    alert("썸네일 이미지를 선택해주세요.");
    $thumb?.focus();
    return false;
  }
*/
