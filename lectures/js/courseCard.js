import { store } from "./store.js";

function renderCourses() {
  // 강의 카드들이 들어갈 컨테이너 선택
  const courseCardGrid = document.querySelector(".course-card-grid");

  // localstorage 에서 데이터 가져오기
  const courses = getCourses();

  // 각 강의 데이터를 순회하며 카드 생성
  courses.forEach((courseItem) => {
    // 강의 카드 HTML 생성
    const courseCard = courseCardList(courseItem);

    // 생성된 카드 컨테이너 내부 요소로 추가
    courseCardGrid.insertAdjacentHTML("beforeend", courseCard);
  });
}

// store.js에 기록된 localStorage에서 강의 목록을 가져오는 함수
function getCourses() {
  let courses = store.getLocalStorage("courseList");
  return courses;
}

function courseCardList(courseItem) {
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
              <span class="course-card__rating-icon">★</span>${
                courseItem.rating
              }
              <span class="course-card__rating-count">(${
                courseItem.reviews.length
              })
              </span>
            </span>
            <span class="course-card__students">👥 ${
              courseItem.studentCount
            }</span>
          </div>
        </div>
      </div>  
       <!-- 강의 상세 오버레이 -->
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
             <a href="details/${
               courseItem.id
             }" class="course-card-detail__cta">자세히 보기 </a>
          </div>
        </div>
      </div>
    </article>
  `;
}

renderCourses();
