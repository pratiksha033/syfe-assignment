import { Goal } from "@/types/goal";
import { convertCurrency } from "@/utils/currency";
import ProgressBar from "./ProgressBar";

interface GoalCardProps {
  goal: Goal;
  exchangeRate: number;
  onAddContribution: (goalId: string) => void;
}

export default function GoalCard({
  goal,
  exchangeRate,
  onAddContribution,
}: GoalCardProps) {
  const totalSaved = goal.contributions.reduce((sum, c) => sum + c.amount, 0);

  const progress = Math.min((totalSaved / goal.targetAmount) * 100, 100);

  const convertedTarget = convertCurrency(
    goal.targetAmount,
    goal.currency,
    exchangeRate
  ).toFixed(2);

  return (
    <div className="bg-card text-card-foreground p-5 rounded-2xl border border-border shadow-sm hover:shadow-md transition">
      {/* Title */}
      <h3 className="text-xl font-semibold text-foreground">{goal.name}</h3>

      {/* Target */}
      <p className="text-sm text-muted-foreground mt-1">
        Target:{" "}
        <span className="font-medium text-foreground">
          {goal.currency} {goal.targetAmount}
        </span>
      </p>

      {/* Converted */}
      <p className="text-xs text-muted-foreground mb-4">
        Converted: {goal.currency === "USD" ? "INR" : "USD"} {convertedTarget}
      </p>

      {/* Progress */}
      <div className="mb-4">
        <ProgressBar percentage={progress} />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>{progress.toFixed(1)}% complete</span>
          <span>
            Saved: {goal.currency} {totalSaved}
          </span>
        </div>
      </div>

      {/* Action */}
      <button
        onClick={() => onAddContribution(goal.id)}
        className="mt-4 w-full py-2 text-sm font-medium rounded-lg border border-primary text-primary hover:bg-primary/10 transition"
      >
        + Add Contribution
      </button>
    </div>
  );
}
