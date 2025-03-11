import React, { useEffect, useState } from 'react';
import { HabitList } from './components/HabitList';
import { AddHabitDialog } from './components/AddHabitDialog';
import { Auth } from './components/Auth';
import { supabase } from './lib/supabase';
import type { User } from '@supabase/supabase-js';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Habit Tracker</h1>
          <p className="text-gray-600 mt-2">Track your daily habits and build a better routine</p>
          <button
            onClick={() => supabase.auth.signOut()}
            className="mt-4 text-sm text-gray-500 hover:text-gray-700"
          >
            Sign Out
          </button>
        </header>
        <HabitList />
        <AddHabitDialog />
      </div>
    </div>
  );
}

export default App