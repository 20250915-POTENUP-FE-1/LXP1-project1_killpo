/**
 * @description 평점을 전부 더한 후 총 리뷰 수로 나누어 평점을 구한다.
 * @param {Array<Object>} reviews 강의의 리뷰 목록
 * @returns {Number | String} 계산된 평균 또는 "--"
 */

export const getAverageRating = (reviews) => {
  if (reviews.length === 0) {
    return "--";
  }

  const totalRatingSum = reviews.reduce(
    (accumulator, review) => accumulator + review.rating,
    0
  );

  const average = totalRatingSum / reviews.length;

  return parseFloat(average.toFixed(1));
};
