// 저장소 객체
export const store = {
  setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getLocalStorage(key) {
    const data = localStorage.getItem(key);
    // data가 null이거나 undefined면 null 반환
    if (data === null || data === undefined) {
      return null;
    }
    return JSON.parse(data);
  },
};
