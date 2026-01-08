"use client";

import { useEffect, useState } from "react";
import { Goal } from "@/types/goal";
import { getFromStorage, saveToStorage } from "@/utils/storage";

const STORAGE_KEY = "savings_goals";

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);

  // Load goals from storage on mount
  useEffect(() => {
    const storedGoals = getFromStorage<Goal[]>(STORAGE_KEY, []);
    setGoals(storedGoals);
  }, []);

  // Persist goals whenever they change
  useEffect(() => {
    saveToStorage(STORAGE_KEY, goals);
  }, [goals]);

  const addGoal = (goal: Goal) => {
    setGoals(prev => [...prev, goal]);
  };

  const addContribution = (
    goalId: string,
    amount: number,
    date: string
  ) => {
    setGoals(prev =>
      prev.map(goal =>
        goal.id === goalId
          ? {
              ...goal,
              contributions: [
                ...goal.contributions,
                { amount, date },
              ],
            }
          : goal
      )
    );
  };

  return {
    goals,
    addGoal,
    addContribution,
  };
}
