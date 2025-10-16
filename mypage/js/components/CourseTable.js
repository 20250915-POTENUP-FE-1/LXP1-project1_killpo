export function courseTable() {
  return `
        <table>
            <caption class="visually-hidden">
              썸네일, 제목, 노출 여부, 카테고리, 강의 관리 버튼
            </caption>
            <thead>
              <tr>
                <th scope="col">썸네일</th>
                <th scope="col">제목</th>
                <!-- <th scope="col">노출 여부</th> -->
                <th scope="col">카테고리</th>
                <th scope="col" class="visually-hidden">관리</th>
              </tr>
            </thead>
            <tbody class="course-table__body"></tbody>
        </table>
          `;
}
