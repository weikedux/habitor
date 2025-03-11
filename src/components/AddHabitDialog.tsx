import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { useHabitStore } from '../store/habits';

const HABIT_ICONS = ['🏃‍♂️', '💪', '📚', '🧘‍♂️', '💧', '🥗', '😴', '🎨'];
const HABIT_COLORS = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-red-500'];

export function AddHabitDialog() {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState(HABIT_ICONS[0]);
  const [color, setColor] = useState(HABIT_COLORS[0]);
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
  const addHabit = useHabitStore((state) => state.addHabit);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addHabit({
      name,
      icon,
      color,
      frequency,
    });

    setName('');
    setIcon(HABIT_ICONS[0]);
    setColor(HABIT_COLORS[0]);
    setFrequency('daily');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="fixed bottom-6 right-6 rounded-full w-12 h-12 p-0">
          <Plus className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Habit</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Habit Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md"
              placeholder="Enter habit name"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Icon</label>
            <div className="grid grid-cols-4 gap-2 mt-1">
              {HABIT_ICONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIcon(emoji)}
                  className={`p-2 text-2xl rounded-md ${
                    icon === emoji ? 'bg-gray-200' : ''
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Color</label>
            <div className="grid grid-cols-5 gap-2 mt-1">
              {HABIT_COLORS.map((bgColor) => (
                <button
                  key={bgColor}
                  type="button"
                  onClick={() => setColor(bgColor)}
                  className={`w-8 h-8 rounded-full ${bgColor} ${
                    color === bgColor ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                  }`}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Frequency</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly')}
              className="w-full mt-1 px-3 py-2 border rounded-md"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
          <Button type="submit" className="w-full">
            Add Habit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}