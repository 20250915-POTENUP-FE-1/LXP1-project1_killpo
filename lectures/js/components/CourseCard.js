import { buildUrl } from "../../../common/js/utils/buildUrl.js";
import { getAverageRating } from "../utils/getAverageRating.js";

export function CourseCard(courseItem) {
  const averageRating = getAverageRating(courseItem.reviews);

  return `
    <article class="course-card">
      <div class="course-card__media">
        <img class="course-card__media-image" src="${
          courseItem.thumbnailUrl
        }" alt="course-thumbnail" loading="lazy">
      </div>
      <div class="course-card__content">
        <p class="course-card__category">${courseItem.category}</p>
        <h2 class="course-card__title">${courseItem.title}</h2>
        <p class="course-card__instructor">${courseItem.instructor}</p>
        <div class="course-card__info-row">
          <div class="course-card__stats">
            <span class="course-card__rating">
              <span class="course-card__rating-icon">★</span>${averageRating}
              <span class="course-card__rating-count">(${
                courseItem.reviews.length
              })
              </span>
            </span>
            <span class="course-card__students"> 
            <i data-lucide="users" class="course-card__students-icon"></i> 
            <span class="course-card__students-count"> ${
              courseItem.studentCount
            }</span></span>
          </div>
        </div>
      </div>  
       <!-- 강좌 상세 오버레이 -->
      <div class="course-card__hover-panel">
        <div class="course-card-detail">
          <div class="course-card-detail__header">
            <h3 class="course-card-detail__title"> ${courseItem.title} </h3>
          </div>
          <p class="course-card-detail__description">
          ${courseItem.description}              
          </p>
          <div class="course-card-tags">
            <ul> ${courseItem.tags
              .map((tag) => `<li id="course-card-tag">${tag}</li>`)
              .join("")}
            </ul>
          </div>
          <div class="course-card-detail__actions">
             <a href="${buildUrl(
               `/lectures/details/?id=${courseItem.id}`
             )}" class="course-card-detail__cta">자세히 보기 </a>
          </div>
        </div>
      </div>
    </article>
  `;
}
