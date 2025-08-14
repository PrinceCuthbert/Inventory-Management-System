import { useState, useEffect, React } from "react";
import "../css/users.css";
import { categories as localCategories } from "../data/categories";
import Spinner from "../components/antDesign/spin";
import AddCategoryDialog from "./AddingPages/AddCategoryDialog";

function Categories() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await new Promise((resolve) => {
          setTimeout(() => resolve(localCategories), 500);
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

  const filteredCategory = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.createdAt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="user-container">
        <div className="user-header">
          <div>
            <h1>Categories</h1>
            <p>Manage system users</p>
          </div>
          <button className="btn-primary">
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
                          onClick={() => {
                            setSelectedCategory(category);
                            setDialogOpen(true);
                          }}
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

        {dialogOpen && selectedCategory && (
          <div className="dialog-overlay">
            <div className="dialog-box">
              <h3>Category Details</h3>
              <div className="dialog-content">
                <label>Name:</label>
                <p>Electronics</p>

                <label>Description</label>
                <p>Electronic devices and accessories</p>

                <label>Created-at</label>
                <p>1/15/2024, 12:00:00 PM</p>

                <label>Role</label>
                <p>role</p>
              </div>
              <button
                className="btn-close"
                onClick={() => setDialogOpen(false)}>
                Close
              </button>
            </div>
          </div>
        )}

        {/* <AddCategoryDialog /> */}
      </div>
    </>
  );
}

export default Categories;
