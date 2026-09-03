import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { safeAsyncStorage } from "@/lib/persistStorage";

interface ProgressState {
  completedActivityIds: string[];
  xpToday: number;
  dailyGoalXp: number;
  streak: number;
  lastGoalDate: string | null;
  hasHydrated: boolean;
  toggleActivity: (activityId: string, xp: number) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedActivityIds: [],
      xpToday: 0,
      dailyGoalXp: 20,
      streak: 1,
      lastGoalDate: null,
      hasHydrated: false,
      toggleActivity: (activityId, xp) => {
        const { completedActivityIds, xpToday, dailyGoalXp, streak, lastGoalDate } = get();
        const isCompleted = completedActivityIds.includes(activityId);
        const nextCompleted = isCompleted
          ? completedActivityIds.filter((id) => id !== activityId)
          : [...completedActivityIds, activityId];
        const nextXp = Math.max(0, xpToday + (isCompleted ? -xp : xp));

        const today = new Date().toDateString();
        const justReachedGoal = nextXp >= dailyGoalXp && lastGoalDate !== today;

        set({
          completedActivityIds: nextCompleted,
          xpToday: nextXp,
          streak: justReachedGoal ? streak + 1 : streak,
          lastGoalDate: justReachedGoal ? today : lastGoalDate,
        });
      },
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: "progress-storage",
      storage: createJSONStorage(() => safeAsyncStorage),
      partialize: (state) => ({
        completedActivityIds: state.completedActivityIds,
        xpToday: state.xpToday,
        dailyGoalXp: state.dailyGoalXp,
        streak: state.streak,
        lastGoalDate: state.lastGoalDate,
      }),
      onRehydrateStorage: (initialState) => (_state, error) => {
        if (error) {
          safeAsyncStorage.removeItem("progress-storage");
        }
        initialState.setHasHydrated(true);
      },
    }
  )
);
