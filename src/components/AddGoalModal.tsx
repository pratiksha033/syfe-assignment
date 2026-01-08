"use client";

import { useState } from "react";
import { Goal, Currency } from "@/types/goal";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface AddGoalModalProps {
  open: boolean;
  onClose: () => void;
  onAddGoal: (goal: Goal) => void;
}

export default function AddGoalModal({
  open,
  onClose,
  onAddGoal,
}: AddGoalModalProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<Currency>("INR");

  const handleSubmit = () => {
    if (!name || !amount || Number(amount) <= 0) return;

    onAddGoal({
      id: crypto.randomUUID(),
      name,
      targetAmount: Number(amount),
      currency,
      contributions: [],
    });

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Goal</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Goal Name</label>
            <Input
              placeholder="e.g. Emergency Fund"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Target Amount</label>
            <Input
              type="number"
              placeholder="e.g. 100000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Currency</label>
            <Select
              value={currency}
              onValueChange={(val) => setCurrency(val as Currency)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INR">INR (₹)</SelectItem>
                <SelectItem value="USD">USD ($)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Goal</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
