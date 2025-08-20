// src/hooks/useExpenses.js
import { useMemo } from "react";

export function useExpenses(expenses) {
  return useMemo(() => {
    const total = (expenses || []).reduce(
      (acc, exp) => acc + (parseFloat(exp.amount) || 0),
      0
    );
    return {
      total,
      displayAmount: total.toFixed(2),
    };
  }, [expenses]);
}
