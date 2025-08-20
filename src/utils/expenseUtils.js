// src/utils/expenseUtils.js
export function calculateTotalExpenses(expenses) {
  const total = expenses.reduce(
    (acc, exp) => acc + (parseFloat(exp.amount) || 0),
    0
  );
  return total;
}

export function formatAmount(amount, decimals = 2) {
  return amount.toFixed(decimals);
}
