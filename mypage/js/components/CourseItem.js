export function CourseItem(courseItem) {
  return `
          <tr class="course-row" data-course-id=${courseItem.id}>
            <td>
              <div class="table-thumb">
                <img
                  src="${courseItem.thumbnailUrl}"
                />
              </div>
            </td>
            <td>
              <div class="table-title">
                <strong>${courseItem.title}</strong>
              </div>
            </td>
            <td>${courseItem.tags[0]}</td>
            <td class="table-actions">
              <button
                type="button"
                class="button button--secondary modal-toggle-btn"
                data-modal-target="course-edit"
                data-modal-mode="edit"
              >
                수정하기
              </button>
              <button
                type="button"
                class="button button--ghost button--danger delete-course-btn"
              >
                삭제하기
              </button>
            </td>
          </tr>
          `;
}
