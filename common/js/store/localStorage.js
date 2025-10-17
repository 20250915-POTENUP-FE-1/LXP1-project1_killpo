export const store = {
  setLocalStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (_) {
      return false;
    }
  },

  getLocalStorage(key) {
    try {
      const data = localStorage.getItem(key);
      if (data === null) return null;
      return JSON.parse(data);
    } catch (_) {
      return null;
    }
  },
};
