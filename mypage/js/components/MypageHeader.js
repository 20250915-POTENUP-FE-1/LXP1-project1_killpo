export function mypageHeader(courseTotalSum) {
  return `
          <div>
            <p class="mypage-content__count">총 ${courseTotalSum}개 강의</p>
            <h1 class="mypage-content__title">내가 등록한 강의</h1>
          </div>
        `;
}
