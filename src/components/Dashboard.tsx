"use client";

import { useState } from "react";
import { useGoals } from "@/hooks/useGoals";
import { useExchangeRate } from "@/hooks/useExchangeRate";

import GoalCard from "./GoalCard";
import AddGoalModal from "./AddGoalModal";
import AddContributionModal from "./AddContributionModal";
import Toast from "./Toast";
import ThemeToggle from "./ThemeToggle";

export default function Dashboard() {
  const { goals, addGoal, addContribution } = useGoals();
  const { rate, lastUpdated, loading, error, fetchRate } = useExchangeRate();

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [activeGoalId, setActiveGoalId] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalSaved = goals.reduce(
    (sum, g) => sum + g.contributions.reduce((s, c) => s + c.amount, 0),
    0
  );

  const overallProgress =
    goals.length === 0
      ? 0
      : goals.reduce((sum, g) => {
          const saved = g.contributions.reduce((s, c) => s + c.amount, 0);
          return sum + (saved / g.targetAmount) * 100;
        }, 0) / goals.length;

  return (
    <div className="space-y-8">
      {/* Dashboard */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm opacity-80">Total Target</p>
            <p className="text-3xl font-bold mt-1">{totalTarget}</p>
          </div>

          <div>
            <p className="text-sm opacity-80">Total Saved</p>
            <p className="text-3xl font-bold mt-1">{totalSaved}</p>
          </div>

          <div>
            <p className="text-sm opacity-80">Overall Progress</p>
            <p className="text-3xl font-bold mt-1">
              {overallProgress.toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between text-sm">
          <div>
            {loading && "Fetching exchange rate..."}
            {error && error}
            {!loading && !error && (
              <>
                1 USD = ₹{rate.toFixed(2)}
                <span className="block opacity-80">
                  Last updated: {lastUpdated}
                </span>
              </>
            )}
          </div>

          <button
            onClick={fetchRate}
            className="mt-3 md:mt-0 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition"
          >
            Refresh Rate
          </button>
        </div>
      </div>

      {/* Goals Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Your Goals</h2>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            onClick={() => setShowAddGoal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Add Goal
          </button>
        </div>
      </div>

      {/* Goals List / Empty State */}
      {goals.length === 0 ? (
        <div className="bg-card rounded-xl p-8 text-center text-muted-foreground border border-border">
          <p className="text-lg font-medium">No goals yet</p>
          <p className="text-sm mt-1">
            Start by adding your first savings goal
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              exchangeRate={rate}
              onAddContribution={(id) => setActiveGoalId(id)}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <AddGoalModal
        open={showAddGoal}
        onClose={() => setShowAddGoal(false)}
        onAddGoal={(goal) => {
          addGoal(goal);
          setToast("Goal added successfully");
          setTimeout(() => setToast(""), 2000);
        }}
      />

      <AddContributionModal
        open={!!activeGoalId}
        onClose={() => setActiveGoalId(null)}
        onAdd={(amount, date) => {
          if (!activeGoalId) return;
          addContribution(activeGoalId, amount, date);
          setToast("Contribution added");
          setTimeout(() => setToast(""), 2000);
        }}
      />

      {toast && <Toast message={toast} />}
    </div>
  );
}
