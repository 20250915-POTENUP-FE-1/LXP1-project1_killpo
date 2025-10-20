import { $ } from "./dom.js";

// Convert a file input into a Base64 data URL
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
}

export async function setThumbnailPreview() {
  $("#create-thumbnail-file").addEventListener("change", async (e) => {
    // 썸네일 미리보기 display 초기화
    $("#current-thumbnail-img").style.display = "block";

    const thumbnailFile = $("#create-thumbnail-file")?.files?.[0];

    // 썸네일 주소 초기화
    let thumbnailUrl = "";
    try {
      thumbnailUrl = await readFileAsDataURL(thumbnailFile);
    } catch (err) {
      console.error(err);
      thumbnailUrl = "";
    }

    // 썸네일 미리보기
    $("#current-thumbnail-img").src = thumbnailUrl;
  });
}
