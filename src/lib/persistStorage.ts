import AsyncStorage from "@react-native-async-storage/async-storage";
import type { StateStorage } from "zustand/middleware";

// Wraps AsyncStorage so a persistence failure (e.g. no `window` during
// Expo Router's web SSR render, or a corrupted/inaccessible storage backend)
// never throws — reads fall back to a cache miss and writes are dropped,
// instead of crashing the app.
export const safeAsyncStorage: StateStorage = {
  getItem: async (name) => {
    try {
      return await AsyncStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: async (name, value) => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch {
      // ignore — persistence is best-effort
    }
  },
  removeItem: async (name) => {
    try {
      await AsyncStorage.removeItem(name);
    } catch {
      // ignore — persistence is best-effort
    }
  },
};
