// src/hooks/useProfit.js
import { useMemo } from "react";

export function useProfit(sales, products) {
  return useMemo(() => {
    if (!sales || !products) {
      return { profitLabel: "Gross Profit", displayAmount: 0, totalProfit: 0 };
    }

    const totalProfit = sales.reduce((acc, sale) => {
      const product = products.find((p) => p.id === sale.productId);
      const costPrice = product?.costPrice || 0;
      const quantity = sale.quantity || 1;
      return acc + (sale.actualPrice - costPrice) * quantity;
    }, 0);

    const profitLabel = totalProfit >= 0 ? "Gross Profit" : "Gross Loss";
    const displayAmount = Math.abs(totalProfit);

    return { profitLabel, displayAmount, totalProfit };
  }, [sales, products]);
}
