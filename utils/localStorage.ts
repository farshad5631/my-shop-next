export const getLocalStorageItem = (key: string) => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item);
      } catch (error) {
        console.error("Failed to parse local storage item:", error);
        localStorage.removeItem(key); 
      }
    }
  }
  return null;
};

export const setLocalStorageItem = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Failed to set local storage item:", error);
    }
  }
};
