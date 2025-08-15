import { useState, useEffect, React } from "react";
import "../css/users.css";
import { categories as localCategories } from "../data/categories";
import Spinner from "../components/antDesign/spin";
import AddCategoryDialog from "./AddingPages/AddCategoryDialog";

function Categories() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [dialogOpen, setDialogOpen] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // For AddCategoryDialog Box
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

  useEffect(() => {
    // const fetchCategories = async () => {
    //   try {
    //     const data = await new Promise((resolve) => {
    //       setTimeout(() => resolve(localCategories), 500);
    //     });
    //     setCategories(data);
    //   } catch (error) {
    //     console.error("Failed to fetch categories:", error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };

    const fetchCategories = async () => {
      try {
        const data = await new Promise((resolve) => {
          setTimeout(() => {
            const stored = localStorage.getItem("categories");
            if (stored) {
              resolve(JSON.parse(stored));
            } else {
              resolve(localCategories);
            }
          }, 500);
        });
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Add Category
  const handleAddCategory = (newCategory) => {
    setCategories((prev) => {
      const updated = [
        ...prev,
        {
          ...newCategory,
          createdAt: new Date().toLocaleDateString(),
        },
      ];
      localStorage.setItem("categories", JSON.stringify(updated));
      return updated;
    });
  };

  const filteredCategory = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.createdAt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open category details modal
  const openDetails = (category) => {
    setSelectedCategory(category);
    setDetailsModal(true);
  };

  // Close modal
  const closeDetails = () => {
    setSelectedCategory(null);
    setDetailsModal(false);
  };

  return (
    <>
      <div className="user-container">
        <div className="user-header">
          <div>
            <h1>Categories</h1>
            <p>Manage system users</p>
          </div>
          <button
            className="btn-primary"
            onClick={() => setIsAddCategoryOpen(true)}>
            <i className="fa fa-plus"></i> Add Category
          </button>
        </div>

        <div className="user-search">
          <i className="fa fa-search"></i>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isLoading ? (
          <Spinner />
        ) : filteredCategory.length === 0 ? (
          <p style={{ textAlign: "center", padding: "20px" }}>No data found</p>
        ) : (
          <div className="user-table-wrapper">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  {/* <th>Contacts</th> */}
                  {/* <th>Role</th> */}
                  <th>Created-At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategory.map((category) => (
                  <tr key={category.id}>
                    <td data-label="Name" className="bold">
                      {category.name}
                    </td>{" "}
                    <td data-label="Description" className="bold">
                      {category.description}
                    </td>{" "}
                    <td data-label="Created_at" className="bold">
                      {category.createdAt}
                    </td>
                    <td data-label="Actions" className="actions-buttons-table">
                      <div className="action-buttons">
                        <button
                          className="btn-icon"
                          onClick={() => openDetails(category)}
                          aria-label={`View details of ${category.name}`}>
                          <i className="fa fa-eye"></i>
                        </button>
                        <button className="btn-icon">
                          <i
                            className="fa fa-edit"
                            aria-label={`Edit ${category.name}`}></i>
                        </button>
                        <button className="btn-icon delete">
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

        {detailsModal && selectedCategory && (
          <div className="dialog-overlay" onClick={closeDetails}>
            <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
              <h3>Category Details</h3>
              <div className="dialog-content">
                <label>Name:</label>
                <p>{selectedCategory.name}</p>

                <label>Description</label>
                <p>{selectedCategory.description}</p>

                <label>Created-at</label>
                <p>{selectedCategory.createdAt}</p>
              </div>
              <button className="btn-close" onClick={closeDetails}>
                Close
              </button>
            </div>
          </div>
        )}

        <AddCategoryDialog
          isOpen={isAddCategoryOpen}
          onClose={() => setIsAddCategoryOpen(false)}
          onAddCategory={handleAddCategory}
        />
      </div>
    </>
  );
}

export default Categories;
