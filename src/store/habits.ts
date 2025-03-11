import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Habit {
  id: string;
  name: string;
  icon: string;
  color: string;
  frequency: 'daily' | 'weekly';
  completedDates: string[];
}

interface HabitStore {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'completedDates'>) => void;
  toggleHabit: (habitId: string, date: string) => void;
  deleteHabit: (habitId: string) => void;
}

export const useHabitStore = create<HabitStore>()(
  persist(
    (set) => ({
      habits: [],
      addHabit: (habit) =>
        set((state) => ({
          habits: [
            ...state.habits,
            {
              ...habit,
              id: crypto.randomUUID(),
              completedDates: [],
            },
          ],
        })),
      toggleHabit: (habitId, date) =>
        set((state) => ({
          habits: state.habits.map((habit) => {
            if (habit.id === habitId) {
              const isCompleted = habit.completedDates.includes(date);
              return {
                ...habit,
                completedDates: isCompleted
                  ? habit.completedDates.filter((d) => d !== date)
                  : [...habit.completedDates, date],
              };
            }
            return habit;
          }),
        })),
      deleteHabit: (habitId) =>
        set((state) => ({
          habits: state.habits.filter((habit) => habit.id !== habitId),
        })),
    }),
    {
      name: 'habits-storage',
    }
  )
);