export function detailsPage(courseItem) {
  return `
        <!-- 강의 소개 히어로 섹션 -->
        <section class="lecture-hero">
          <div class="lecture-hero__content">
            <div class="lecture-hero__badges">
            ${courseItem.tags
              .map((tag) => `<div class="lecture-hero__badge">${tag}</div>`)
              .join("")}
            </div>
            <h1 class="lecture-hero__title">${courseItem.title}</h1>
            <p class="lecture-hero__subtitle">
              ${courseItem.description}
            </p>

            <div class="lecture-meta">
              <div class="lecture-meta__expert">
                <p class="lecture-meta__name">${courseItem.instructor}</p>
              </div>
              <div class="lecture-meta__stats">
                <span class="lecture-meta__rating">★ ${courseItem.rating}</span>
                <span class="lecture-meta__divider">·</span>
                <span class="lecture-meta__count">수강평 ${
                  courseItem.reviews.length
                }개</span>
                <span class="lecture-meta__divider">·</span>
                <span class="lecture-meta__students">수강생 ${
                  courseItem.studentCount
                }명</span>
              </div>
            </div>
          </div>

          <div class="lecture-hero__media">
            <img
              src="${courseItem.thumbnailUrl}"
            />
          </div>
        </section>

        <!-- 커리큘럼과 상세 설명 -->
        <div class="lecture-body">
          <div class="lecture-body__content">
            <!-- 강의 상세 설명 -->
            <section class="lecture-description" id="description">
              <header class="section-header">
                <h2>강의 상세 설명</h2>
              </header>
              <div class="description-body">
                <p>
                ${courseItem.contents}
                </p>
              </div>
            </section>
          </div>
          <!-- 수강 신청 정보 카드 -->
          <aside class="lecture-body__sidebar">
            <div class="purchase-card">
              <ul class="purchase-card__info">
                <li><span>난이도</span><strong>${
                  courseItem.tags[1]
                }</strong></li>
                <li>
                  <span>카테고리</span
                  ><strong>${courseItem.category.join(" / ")}</strong>
                </li>
              </ul>
              <button type="button" class="purchase-card__cta">
                수강 신청하기
              </button>
            </div>
          </aside>
        </div>
          `;
}
