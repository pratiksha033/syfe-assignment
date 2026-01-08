"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Contribution</DialogTitle>
        </DialogHeader>

        <div>
          <label className="text-sm font-medium">Amount</label>
          <Input
            type="number"
            placeholder="e.g. 5000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
