import { Goal } from "@/types/goal";
import { convertCurrency } from "@/utils/currency";
import ProgressBar from "./ProgressBar";
import { motion } from "framer-motion";

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

  const contributionsCount = goal.contributions.length;

  const remaining = Math.max(goal.targetAmount - totalSaved, 0);

  const convertedTarget = convertCurrency(
    goal.targetAmount,
    goal.currency,
    exchangeRate
  ).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="
        relative overflow-hidden
        rounded-2xl p-5
        bg-white/5 backdrop-blur-xl
        border border-white/10
        shadow-lg hover:shadow-xl
        transition-all
        text-foreground
      "
    >
      {/* Soft glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 space-y-3">
        {/* Title */}
        <h3 className="text-lg font-semibold">{goal.name}</h3>

        {/* Target */}
        <p className="text-sm text-muted-foreground">
          Target{" "}
          <span className="font-medium text-foreground">
            {goal.currency} {goal.targetAmount}
          </span>
        </p>

        {/* Converted */}
        <p className="text-xs text-muted-foreground">
          Converted → {goal.currency === "USD" ? "INR" : "USD"}{" "}
          {convertedTarget}
        </p>

        {/* Progress */}
        <div className="pt-2 space-y-1">
          <ProgressBar percentage={progress} />

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{progress.toFixed(1)}% complete</span>
            <span>
              Saved {goal.currency} {totalSaved}
            </span>
          </div>

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{contributionsCount} contributions</span>
            <span>
              {goal.currency} {remaining} remaining
            </span>
          </div>
        </div>

        {/* Action */}
        <button
          onClick={() => onAddContribution(goal.id)}
          className="
    mt-3 w-full py-2 text-sm font-semibold rounded-lg
    bg-emerald-500/90 hover:bg-emerald-500
    text-white
    shadow-md hover:shadow-lg
    transition-all
  "
        >
          + Add Contribution
        </button>
      </div>
    </motion.div>
  );
}
