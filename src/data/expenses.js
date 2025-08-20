// src/data/expenses.js
export const expenses = [
  {
    id: 1,
    payee: "Landlord Ltd.",
    amount: 500.0,
    expenseTypeId: 1, // Office Rent
    description: "Monthly office rent payment for HQ",
    createdAt: "2025-08-01",
  },
  {
    id: 2,
    payee: "City Utilities",
    amount: 145.75,
    expenseTypeId: 2, // Utilities
    description: "Electricity and water bills for the office",
    createdAt: "2025-08-05",
  },
  {
    id: 3,
    payee: "Stationery Co.",
    amount: 72.0,
    expenseTypeId: 3, // Stationery
    description: "Pens, papers, and printer ink",
    createdAt: "2025-08-07",
  },
  {
    id: 4,
    payee: "FuelMart",
    amount: 180.0,
    expenseTypeId: 4, // Transportation
    description: "Fuel and vehicle maintenance for company car",
    createdAt: "2025-08-10",
  },
  {
    id: 5,
    payee: "Payroll Dept.",
    amount: 2500.0,
    expenseTypeId: 5, // Salaries
    description: "Monthly staff salaries",
    createdAt: "2025-08-15",
  },
  {
    id: 6,
    payee: "Café Delight",
    amount: 80.0,
    expenseTypeId: 3, // Stationery (small office purchase)
    description: "Stationery restock for new interns",
    createdAt: "2025-08-12",
  },
];
