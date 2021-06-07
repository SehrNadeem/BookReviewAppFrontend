
export const setLocalStorage = (dataKey, data) => {
  return localStorage.setItem(dataKey, data);
}

export const getLocalStorage = (dataKey) => {
  return localStorage.getItem(dataKey);
}

export const removeLocalStorage = (dataKey) => {
  return localStorage.removeItem(dataKey);
}
