import { getAverageRating } from "./getAverageRating.js";

export const sortCourseList = (courseList, sortOption) => {
  const sortedCourseList = [...courseList];

  switch (sortOption) {
    case "최신 등록 순":
      sortedCourseList.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      break;

    case "수강 인원 순":
      sortedCourseList.sort(
        (a, b) => Number(b.studentCount) - Number(a.studentCount)
      );
      break;

    case "수강평 높은 순":
      sortedCourseList.sort((a, b) => {
        const avgA = getAverageRating(a.reviews);
        const avgB = getAverageRating(b.reviews);

        // 1차 정렬: 평점 높은 순
        // 2차 정렬: 최신 등록 순 (tie-break)
        return avgB - avgA || new Date(b.createdAt) - new Date(a.createdAt);
      });
      break;

    default:
      break;
  }

  return sortedCourseList;
};
