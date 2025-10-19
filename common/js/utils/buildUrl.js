import { BASE } from "../constants/config.js";

/**
 * @description 환경에 따라 BASE 경로를 자동으로 붙여줍니다.
 * @param {string} path - BASE 뒤에 붙일 절대 경로 (반드시 "/"로 시작해야 함)
 * @returns {string} 완성된 URL 경로
 */
export const buildUrl = (path) => {
  if (!path.startsWith("/")) {
    console.warn(`[buildUrl] 경로는 "/"로 시작해야 합니다. 입력값: ${path}`);
  }

  return `${BASE}${path}`;
};
