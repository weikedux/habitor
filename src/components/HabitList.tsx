import React from 'react';
import { format, startOfToday, eachDayOfInterval, subDays } from 'date-fns';
import { useHabitStore } from '../store/habits';
import { Progress } from './ui/progress';
import { Trash2 } from 'lucide-react';

export function HabitList() {
  const habits = useHabitStore((state) => state.habits);
  const toggleHabit = useHabitStore((state) => state.toggleHabit);
  const deleteHabit = useHabitStore((state) => state.deleteHabit);

  const today = startOfToday();
  const dates = eachDayOfInterval({
    start: subDays(today, 6),
    end: today,
  });

  return (
    <div className="space-y-6">
      {habits.map((habit) => {
        const completedToday = habit.completedDates.includes(format(today, 'yyyy-MM-dd'));
        const completedCount = dates.filter((date) =>
          habit.completedDates.includes(format(date, 'yyyy-MM-dd'))
        ).length;
        const progress = (completedCount / dates.length) * 100;

        return (
          <div
            key={habit.id}
            className="bg-white rounded-lg shadow-md p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{habit.icon}</span>
                <h3 className="font-medium">{habit.name}</h3>
              </div>
              <button
                onClick={() => deleteHabit(habit.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="grid grid-cols-7 gap-2">
              {dates.map((date) => {
                const dateStr = format(date, 'yyyy-MM-dd');
                const isCompleted = habit.completedDates.includes(dateStr);

                return (
                  <button
                    key={dateStr}
                    onClick={() => toggleHabit(habit.id, dateStr)}
                    className="flex flex-col items-center"
                  >
                    <div className="text-xs text-gray-500">
                      {format(date, 'EEE')}
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
                        isCompleted ? habit.color + ' text-white' : 'bg-gray-100'
                      }`}
                    >
                      {format(date, 'd')}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}