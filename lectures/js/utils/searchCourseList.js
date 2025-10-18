export const searchCourseList = (courseList, keyword) => {
  if (!keyword.trim()) return courseList;

  const lowerKeyword = keyword.toLowerCase();
  return courseList.filter((course) =>
    [course.title, course.instructor] // 검색 요소 추가 가능
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(lowerKeyword))
  );
};
