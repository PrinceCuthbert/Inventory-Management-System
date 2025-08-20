// src/hooks/useNetProfit.js
import { useMemo } from "react";
import { useProfit } from "./useProfit"; // your existing sales profit hook
import { useExpenses } from "./useExpenses"; // your expenses hook

export function useNetProfit(sales, products, expenses) {
  const { total: grossProfit } = useProfit(sales, products);
  const { total: totalExpenses } = useExpenses(expenses || []);

  return useMemo(() => {
    const netProfit = grossProfit - totalExpenses;
    return {
      netProfit,
      displayAmount: Math.abs(netProfit).toFixed(2),
      label: netProfit >= 0 ? "Net Profit" : "Net Loss",
    };
  }, [grossProfit, totalExpenses]);
}
