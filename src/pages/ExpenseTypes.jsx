import { useState, useEffect, React } from "react";
import "../css/users.css";
import { expenseTypes as localExpenseTypes } from "../data/expenseTypes"; // you need to create this file like categories
import Spinner from "../components/antDesign/spin";
import AddExpenseTypeDialog from "./AddingPages/AddExpenseTypeDialog";
// we will implement later
import { Button, notification, Space } from "antd";

function ExpenseTypes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [detailsModal, setDetailsModal] = useState(false);
  const [selectedExpenseType, setSelectedExpenseType] = useState(null);

  // For AddExpenseTypeDialog
  const [isAddExpenseTypeOpen, setIsAddExpenseTypeOpen] = useState(false);

  // Notification hook
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const fetchExpenseTypes = async () => {
      try {
        const data = await new Promise((resolve) => {
          setTimeout(() => {
            const stored = localStorage.getItem("expenseTypes");
            if (stored) {
              resolve(JSON.parse(stored));
            } else {
              resolve(localExpenseTypes);
            }
          }, 500);
        });
        setExpenseTypes(data);
      } catch (error) {
        console.error("Failed to fetch expense types:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExpenseTypes();
  }, []);

  // Add Expense Type
  const handleAddExpenseType = (newExpenseType) => {
    setExpenseTypes((prev) => {
      const nextId = prev.length
        ? Math.max(...prev.map((et) => et.id || 0)) + 1
        : 1;
      const updated = [
        ...prev,
        {
          id: nextId,
          ...newExpenseType,
          createdAt: new Date().toLocaleDateString(),
        },
      ];
      localStorage.setItem("expenseTypes", JSON.stringify(updated));
      return updated;
    });
  };

  // Delete Expense Type with notification
  const handleDeleteExpenseType = (expenseTypeId) => {
    const key = `delete${expenseTypeId}`;

    const btn = (
      <Space>
        <Button type="link" size="small" onClick={() => api.destroy(key)}>
          Cancel
        </Button>
        <Button
          type="primary"
          size="small"
          danger
          onClick={() => {
            setExpenseTypes((prev) => {
              const updated = prev.filter((et) => et.id !== expenseTypeId);
              localStorage.setItem("expenseTypes", JSON.stringify(updated));
              return updated;
            });
            api.destroy(key);
          }}>
          Confirm
        </Button>
      </Space>
    );

    api.open({
      message: "Delete Confirmation",
      description: "Are you sure you want to delete this expense type?",
      btn,
      key,
      duration: 0,
    });
  };

  const filteredExpenseTypes = expenseTypes.filter(
    (et) =>
      et.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      et.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      et.createdAt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open details modal
  const openDetails = (expenseType) => {
    setSelectedExpenseType(expenseType);
    setDetailsModal(true);
  };

  // Close details modal
  const closeDetails = () => {
    setSelectedExpenseType(null);
    setDetailsModal(false);
  };

  console.log("ExpenseTypes:", expenseTypes);

  return (
    <>
      {contextHolder}
      <div className="products-container">
        <div className="products-header">
          <div>
            <h1>Expense Types</h1>
            <p>Manage system expense types</p>
          </div>
          <button
            className="btn-primary"
            onClick={() => setIsAddExpenseTypeOpen(true)}>
            <i className="fa fa-plus"></i> Add Expense Type
          </button>
        </div>

        <div className="products-search">
          <i className="fa fa-search"></i>
          <input
            type="text"
            placeholder="Search expense types..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isLoading ? (
          <Spinner />
        ) : filteredExpenseTypes.length === 0 ? (
          <p style={{ textAlign: "center", padding: "20px" }}>No data found</p>
        ) : (
          <div className="products-table-wrapper">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Created-At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenseTypes.map((expenseType) => (
                  <tr key={expenseType.id}>
                    <td data-label="Name" className="bold">
                      {expenseType.name}
                    </td>
                    <td data-label="Description" className="bold">
                      {expenseType.description}
                    </td>
                    <td data-label="Created_at" className="bold">
                      {expenseType.createdAt}
                    </td>
                    <td data-label="Actions" className="actions-buttons-table">
                      <div className="action-buttons">
                        <button
                          className="btn-icon"
                          onClick={() => openDetails(expenseType)}
                          aria-label={`View details of ${expenseType.name}`}>
                          <i className="fa fa-eye"></i>
                        </button>
                        <button className="btn-icon">
                          <i
                            className="fa fa-edit"
                            aria-label={`Edit ${expenseType.name}`}></i>
                        </button>
                        <button
                          className="btn-icon delete"
                          aria-label={`Delete ${expenseType.name}`}
                          onClick={() =>
                            handleDeleteExpenseType(expenseType.id)
                          }>
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

        {detailsModal && selectedExpenseType && (
          <div className="dialog-overlay" onClick={closeDetails}>
            <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
              <h3>Expense Type Details</h3>
              <div className="dialog-content">
                <label>Title:</label>
                <p>{selectedExpenseType.name}</p>

                <label>Regular Amount</label>
                <p>{selectedExpenseType.regularAmount}</p>

                <label>Description</label>
                <p>{selectedExpenseType.description}</p>

                <label>Created-at</label>
                <p>{selectedExpenseType.createdAt}</p>
              </div>
              <button className="btn-close" onClick={closeDetails}>
                Close
              </button>
            </div>
          </div>
        )}

        <AddExpenseTypeDialog
          isOpen={isAddExpenseTypeOpen}
          onClose={() => setIsAddExpenseTypeOpen(false)}
          onAddExpenseType={handleAddExpenseType}
          expenseTypes={expenseTypes}
        />
      </div>
    </>
  );
}

export default ExpenseTypes;
