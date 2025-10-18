import { $ } from "./dom.js";
import { store } from "../store/localStorage.js";
import { CourseItem } from "../../../mypage/js/components/CourseItem.js";
import { courseList as mockCourseList } from "../../../lectures/js/mockData.js";

// Convert a file input into a Base64 data URL
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
}

export async function submitEditCourseForm() {
  // 1. 현재 목록에서 선택된 강의 정보 찾기
  const courseList = store.getLocalStorage("courseList") || mockCourseList;

  // course 객체의 id를 변수 선언
  const selectedId = $("#course-create-form").dataset.courseId;

  // 배열 업데이트를 위한 인덱스를 찾기
  const selectedIndex = courseList.findIndex(
    (course) => course.id === selectedId
  );
  const selectedCourse = courseList[selectedIndex];

  if (
    !selectedCourse ||
    !Array.isArray(courseList) ||
    typeof selectedIndex !== "number" ||
    selectedIndex < 0
  ) {
    console.error("Invalid arguments passed to submitEditCourseForm");
    return false;
  }

  const courseTitle = ($("#create-course-title")?.value || "").trim();
  const courseSummary = ($("#create-course-summary")?.value || "").trim();
  const courseLevel = $("#create-course-difficulty")?.value || "";
  const courseDescription = (
    $("#create-course-description")?.value || ""
  ).trim();
  const thumbnailFile = $("#create-thumbnail-file")?.files?.[0];
  const categoryFirst = $("#create-course-category-primary")?.value || "";
  const categorySecond = $("#create-course-category-secondary")?.value || "";
  const categoryThird = $("#create-course-category-tertiary")?.value || "";
  const categoryPath = [categoryFirst, categorySecond, categoryThird].filter(
    (c) => c
  );

  let newThumbnailUrl = selectedCourse.thumbnailUrl;

  if (thumbnailFile) {
    try {
      newThumbnailUrl = await readFileAsDataURL(thumbnailFile);
    } catch (err) {
      console.error("Failed to transform thumbnail file:", err);
      alert("파일 처리 중 오류가 발생했습니다.");
      return false;
    }
  }

  const updatedCourse = {
    ...selectedCourse,
    title: courseTitle,
    description: courseSummary,
    content: courseDescription,
    level: courseLevel,
    category: categoryPath,
    tags: [categoryPath[categoryPath.length - 1], courseLevel].filter(
      (tag) => tag
    ),
    thumbnailUrl: newThumbnailUrl,
    updatedAt: new Date().toISOString(),
  };

  courseList[selectedIndex] = updatedCourse;
  const updatedList = courseList;
  store.setLocalStorage("courseList", updatedList);

  $(".mypage-content__total").innerHTML = updatedList.length;
  $(".course-table__body").innerHTML = updatedList
    .map((courseItem) => CourseItem(courseItem))
    .join("");

  alert("강의 수정이 완료되었습니다.");

  const modal = $(".modal");
  if (modal) modal.style.display = "none";

  return true;
}
