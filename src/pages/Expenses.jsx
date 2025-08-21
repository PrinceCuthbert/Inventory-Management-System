import { useState, useEffect } from "react";
import "../css/products.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useOutletContext } from "react-router-dom";
import Spinner from "../components/antDesign/spin";
import { Space, Button, notification } from "antd";
import AddExpenseDialog from "./AddingPages/AddExpenseDialog";
// import { calculateTotalExpenses, formatAmount } from "@/utils/expenseUtils";
import { useExpenses } from "@/hooks/useExpenses";

function Expenses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get expenseTypes from context
  const { expenseTypes = [] } = useOutletContext();

  // Expenses state
  // const [expenses, setExpenses] = useState([]);
  const { expenses, setExpenses } = useOutletContext();

  // Antd notification instance
  const [api, contextHolder] = notification.useNotification();

  console.log("Expenses inside Dashboard:", expenses);

  // Fetch expenses from localStorage or fallback to localExpenses
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const stored = localStorage.getItem("expenses");
        if (stored) {
          setExpenses(JSON.parse(stored));
        } else {
          const { expenses: localExpenses } = await import("../data/expenses");
          setExpenses(localExpenses);
        }
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExpenses();
  }, [setExpenses]);

  // Calculate total expenses dynamically
  // const totalExpenses = expenses.reduce(
  //   (acc, exp) => acc + (parseFloat(exp.amount) || 0),
  //   0
  // );
  // const displayExpense = totalExpenses.toFixed(2);

  const { total, displayAmount } = useExpenses(expenses);

  // const totalExpenses = calculateTotalExpenses(expenses);
  // const displayExpense = formatAmount(totalExpenses);

  if (isLoading) return <Spinner />;

  // Filtered expenses for search
  const filteredExpenses = expenses.filter((exp) => {
    const categoryName =
      expenseTypes?.find((t) => t.id === exp.expenseTypeId)?.name || "";
    return (
      exp.payee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.amount.toString().includes(searchTerm) ||
      exp.createdAt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Open/close details modal
  const openDetails = (expense) => {
    setSelectedExpense(expense);
    setDetailsModal(true);
  };
  const closeDetails = () => {
    setSelectedExpense(null);
    setDetailsModal(false);
  };

  // Add expense with persistence
  const handleAddExpense = (newExpense) => {
    setExpenses((prev) => {
      // For auto incrementing the id(but works fine for only small local storage datasets)
      const nextId = prev.length ? Math.max(...prev.map((e) => e.id)) + 1 : 1;
      const updated = [
        ...prev,
        {
          ...newExpense,
          id: nextId,
          createdAt: new Date().toLocaleDateString(),
        },
      ];
      localStorage.setItem("expenses", JSON.stringify(updated));
      return updated;
    });
  };

  // Delete expense with confirmation, updating state and localStorage
  const handleDeleteExpense = (expenseId) => {
    const key = `delete${expenseId}`;

    const btn = (
      <Space>
        <Button
          type="link"
          size="small"
          onClick={() => {
            api.close(key); // closes just this notification
          }}>
          Cancel
        </Button>
        <Button
          type="primary"
          size="small"
          danger
          onClick={() => {
            // Remove the expense
            const updated = expenses.filter((e) => e.id !== expenseId);
            setExpenses(updated);
            localStorage.setItem("expenses", JSON.stringify(updated));
            api.close(key); // closes this notification smoothly
          }}>
          Confirm
        </Button>
      </Space>
    );

    api.open({
      message: "Delete Confirmation",
      description: "Are you sure you want to delete this expense?",
      btn,
      key,
      duration: 0, // stays until closed manually
    });
  };

  return (
    <>
      {contextHolder}

      {/* Header */}
      <div className="products-header">
        <div>
          <h1>Expenses</h1>
          <p>Manage your expenses and categories</p>
        </div>
        <button
          className="btn-primary"
          onClick={() => setIsAddExpenseOpen(true)}>
          <i className="fa fa-plus"></i> Add Expense
        </button>
      </div>

      {/* Total Expenses Card */}
      <div
        className="expense-card"
        style={{
          marginBottom: "20px",
          padding: "15px",
          background: "var(--bg-color)",
          borderRadius: "8px",
          border: "2px solid var(--primary-color)",
          fontWeight: "bold",
          fontSize: "18px",
          boxShadow: "0 4px 6px var(--btn-hover-color)",
          textAlign: "center",
        }}>
        <h2>Total Expenses: ${displayAmount}</h2>
      </div>

      {/* Search */}
      <div className="products-search">
        <i className="fa fa-search"></i>
        <input
          style={{
            outline: "none",
            border: "none",
            boxShadow: "none",
            ...(isFocused && {
              outline: "none",
              border: "none",
              boxShadow: "none",
            }),
          }}
          type="text"
          placeholder="Search expenses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>

      {/* Expenses Table */}
      {filteredExpenses.length === 0 ? (
        <p style={{ textAlign: "center", padding: "20px" }}>
          {expenses.length === 0 ? "No expenses yet" : "No expenses found"}
        </p>
      ) : (
        <div className="products-table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th>Payee</th>
                <th>Amount (FRW)</th>
                <th>Category</th>
                <th>Description</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((exp) => (
                <tr key={exp.id}>
                  <td data-label="Payee" className="bold">
                    {exp.payee}
                  </td>
                  <td data-label="Amount">{exp.amount}</td>
                  <td data-label="Category">
                    {expenseTypes?.find((t) => t.id === exp.expenseTypeId)
                      ?.name ||
                      exp.expenseType ||
                      "Other"}
                  </td>
                  <td data-label="Description">{exp.description}</td>
                  <td data-label="Created">{exp.createdAt}</td>
                  <td data-label="Actions" className="actions-buttons-table">
                    <div className="action-buttons">
                      <button
                        className="btn-icon"
                        onClick={() => openDetails(exp)}>
                        <i className="fa fa-eye"></i>
                      </button>
                      <button className="btn-icon">
                        <i className="fa fa-edit"></i>
                      </button>
                      <button
                        className="btn-icon delete"
                        onClick={() => handleDeleteExpense(exp.id)}>
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Expense Details Modal */}
      {detailsModal && selectedExpense && (
        <div className="dialog-overlay" onClick={closeDetails}>
          <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
            <h3>Expense Details</h3>
            <div className="dialog-content">
              <label>Payee:</label>
              <p>{selectedExpense.payee}</p>
              <label>Amount:</label>
              <p>{selectedExpense.amount} FRW</p>
              <label>Category:</label>
              <p>
                {expenseTypes?.find(
                  (t) => t.id === selectedExpense.expenseTypeId
                )?.name ||
                  selectedExpense.expenseType ||
                  "Other"}
              </p>
              <label>Description:</label>
              <p>{selectedExpense.description}</p>
              <label>Created At:</label>
              <p>{selectedExpense.createdAt}</p>
            </div>
            <button className="btn-close" onClick={closeDetails}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Expense Dialog */}
      {isAddExpenseOpen && (
        <AddExpenseDialog
          isOpen={isAddExpenseOpen}
          onClose={() => setIsAddExpenseOpen(false)}
          onAddExpense={handleAddExpense}
          expenseTypes={expenseTypes}
        />
      )}
    </>
  );
}

export default Expenses;
