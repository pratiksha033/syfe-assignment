"use client";

import { useState } from "react";
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
import { Button } from "@/components/ui/button";

interface AddContributionModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (amount: number, date: string) => void;
}

export default function AddContributionModal({
  open,
  onClose,
  onAdd,
}: AddContributionModalProps) {
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    if (!amount || Number(amount) <= 0) return;
    onAdd(Number(amount), new Date().toISOString());
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/60 backdrop-blur-sm z-40" />
      <DialogContent
        className="sm:max-w-md z-50
    bg-emerald-500/10
    backdrop-blur-xl
    border border-emerald-500/20
    text-foreground"
      >
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-emerald-400/10 to-transparent pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative space-y-6"
        >
          <DialogHeader>
            <DialogTitle>Add Contribution</DialogTitle>
          </DialogHeader>

          <div>
            <label className="text-sm font-medium text-foreground">
              Amount
            </label>
            <Input
              type="number"
              placeholder="e.g. 5000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="
    bg-emerald-500/90 hover:bg-emerald-500
    text-white
    font-semibold
    shadow-md hover:shadow-lg
    transition-all
  "
            >
              Add Contribution
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
