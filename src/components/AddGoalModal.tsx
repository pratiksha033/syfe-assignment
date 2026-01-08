"use client";

import { useState } from "react";
import { Goal, Currency } from "@/types/goal";
import { motion } from "framer-motion";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogOverlay,
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
      <DialogOverlay className="bg-black/60 backdrop-blur-sm z-40" />
      <DialogContent className="sm:max-w-md bg-card text-card-foreground z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="space-y-6"
        >
          <DialogHeader>
            <DialogTitle>Add New Goal</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">
                Goal Name
              </label>
              <Input
                placeholder="e.g. Emergency Fund"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">
                Target Amount
              </label>
              <Input
                type="number"
                placeholder="e.g. 100000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">
                Currency
              </label>
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

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Add Goal</Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
