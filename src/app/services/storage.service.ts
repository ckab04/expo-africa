import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor() {}

  /**
   * Get data from localStorage
   * @param key Storage key
   * @param defaultValue Default value if key doesn't exist
   */
  getData<T>(key: string, defaultValue: T | null = null): T | null {
    try {
      const data = localStorage.getItem(key);
      return data ? (JSON.parse(data) as T) : defaultValue;
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return defaultValue;
    }
  }

  /**
   * Save data to localStorage
   * @param key Storage key
   * @param data Data to store
   */
  saveData(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  }

  /**
   * Remove item from storage
   * @param key Storage key to remove
   */
  removeData(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Clear all stored data
   */
  clearAll(): void {
    localStorage.clear();
  }
}

interface Reservation {
  id: string;
  client: string;
  telephone: string;
  email?: string;
  type: string;
  quantity: number;
  prix: number;
  date: string;
  status: "pending" | "confirmed" | "cancelled";
}
