/**
 * @description 강의 목록을 카테고리 및 난이도 조건에 따라 필터링한다.
 * @param {Array<Object>} courseList 전체 강의 목록
 * @param {Object} filter 필터 조건 { category: string[], level: string[] }
 * @returns {Array<Object>} 필터링된 강의 목록
 */
export const filterCourseList = (courseList, filter) => {
  const { category = [], level = [] } = filter;

  return courseList.filter((course) => {
    const filteredCategory =
      category.length === 0 ||
      category.every((item) => course.category.includes(item));

    const filteredLevel = level.length === 0 || level.includes(course.level);

    return filteredCategory && filteredLevel;
  });
};
