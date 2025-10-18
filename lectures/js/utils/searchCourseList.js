export const searchCourseList = (courseList, keyword) => {
  if (!keyword.trim()) return courseList;

  const lowerKeyword = keyword.toLowerCase();

  return courseList.filter((course) =>
    [course.title, course.instructor, course.level, course.category]
      .filter(Boolean)
      .some((field) => {
        const text = Array.isArray(field) ? field.join(" ") : field;
        return text.toLowerCase().includes(lowerKeyword);
      })
  );
};
