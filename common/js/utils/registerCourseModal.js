import { $ } from "./dom.js";
import { store } from "../store/localStorage.js";

// 썸네일 파일을 dataURL(Base64)로 읽
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
}

// 강의 등록 모달
export async function RegisterCourseModal() {
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

  // 카테고리(1/2/3차) 선택

  // 3) 썸네일 Base64 변환 (비동기)
  let thumbnailUrl = "";
  try {
    thumbnailUrl = await readFileAsDataURL(thumbnailFile);
  } catch (error) {
    console.error(error);
    thumbnailUrl = "";
  }

  // 4) 새 강의 생성
  const courseList = store.getLocalStorage("courseList") || [];
  // 강의 id를 생성일시를 추가해 유니크하게 만들기
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
    instructor: ["김조이"], // 강사명 고정값으로 설정
    level: courseLevel,
    // category,
    //tags,
    thumbnailUrl, // Base64변환
    createdAt,
  };

  // 6) 로컬스토리지에 저장
  courseList.push(newCourse);
  const courseSaved = store.setLocalStorage("courseList", courseList);

  // 로컬스토리지에 저장 후 저장완료 반환값 불러오기
  // 7) 반환 값이 true 일때 저장 성공 메세지
  if (courseSaved) {
    alert("강의가 저장되었습니다.");
    $("#course-create-form")?.reset();

    // 성공했다면 모달창 닫기
    const modal = $("#course-create");
    if (modal) modal.style.display = "none";
    return true;
    // 반환값이 false 일때 메세지
  } else {
    alert("강의 저장에 실패했습니다. 다시 시도해주세요.");
    return false;
  }
}

/*
//  검증
  if (!courseTitle) {
    alert("강의 제목을 입력해주세요.");
    $("#create-course-title").focus();
    return false;
  }
  if (!courseSummary) {
    alert("한 줄 요약을 입력해주세요.");
    $("#create-course-summary").focus();
    return false;
  }

  if (!courseLevel) {
    alert("난이도를 선택해주세요.");
    $("#create-course-difficulty").focus();
    return false;
  }
  if (!courseDescription) {
    alert("상세 설명을 입력해주세요.");
    $("#create-course-description").focus();
    return false;
  }
  if (!thumbnailFile) {
    alert("썸네일 이미지를 선택해주세요.");
    $("#create-thumbnail-file").focus();
    return false;
  }
*/
