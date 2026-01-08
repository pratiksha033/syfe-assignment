export function saveToStorage<T>(key: string, value: T) {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  export function getFromStorage<T>(key: string, fallback: T): T {
    if (typeof window === "undefined") return fallback;
  
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  }
  
  export function removeFromStorage(key: string) {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  }
  