export function courseItem(item) {
  return `
          <tr class="course-row" data-course-id=${item.id}>
            <td>
              <div class="table-thumb">
                <img
                  src="${item.thumbnailUrl}"
                />
              </div>
            </td>
            <td>
              <div class="table-title">
                <strong>${item.title}</strong>
              </div>
            </td>
            <td>${item.tags[0]}</td>
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
