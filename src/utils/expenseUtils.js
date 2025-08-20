// src/utils/expenseUtils.js

// ✅ Total expenses
export function calculateTotalExpenses(expenses) {
  const total = expenses.reduce(
    (acc, exp) => acc + (parseFloat(exp.amount) || 0),
    0
  );
  return total;
}

// ✅ Format amount nicely
export function formatAmount(amount, decimals = 2) {
  return amount.toFixed(decimals);
}

// ✅ Normalize expenses so they always use expenseTypeId
export function normalizeExpenses(expenses, expenseTypes) {
  return expenses.map((exp) => {
    if (exp.expenseTypeId) return { ...exp };

    if (exp.expenseType) {
      const match = expenseTypes.find((t) => t.name === exp.expenseType);
      return {
        ...exp,
        expenseTypeId: match ? match.id : null, // fallback to null if not found
      };
    }

    return { ...exp, expenseTypeId: null };
  });
}

// ✅ Get the name of an expense type by ID
export function getExpenseTypeName(id, expenseTypes) {
  const match = expenseTypes.find((t) => t.id === id);
  return match ? match.name : "Others";
}
