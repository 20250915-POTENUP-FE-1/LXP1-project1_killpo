export const store = {
  setLocalStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true; // 저장 성공 여부 반환
    } catch (error) {
      console.error(`저장 실패 [${key}]:`, error);
      return false;
    }
  },

  getLocalStorage(key) {
    try {
      const data = localStorage.getItem(key);
      if (data === null) return null;
      return JSON.parse(data);
    } catch (error) {
      console.error(`불러오기 실패 [${key}]:`, error);
      return null;
    }
  },

  removeLocalStorage(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`삭제 실패 [${key}]:`, error);
      return false;
    }
  },

  clearLocalStorage() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("전체 초기화 실패:", error);
      return false;
    }
  },
};
