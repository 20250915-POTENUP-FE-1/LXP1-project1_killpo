export const store = {
  setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getLocalStorage(key) {
    const data = localStorage.getItem(key);
    if (data === null || data === undefined) {
      return null;
    }
    return JSON.parse(data);
  },
};
