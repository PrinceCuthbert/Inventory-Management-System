import { useState, useEffect, React } from "react";
import "../css/users.css";
import { categories as localCategories } from "../data/categories";

function Categories() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      c.createdAt.toLowerCase().includes(searchTerm())
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
          <input type="text" placeholder="Search categories..." value="" />
        </div>

        {isLoading ? (
          <p> Loading Categories..</p>
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
                {localCategories.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      style={{ textAlign: "center", padding: "20px" }}>
                      No Category Found
                    </td>
                  </tr>
                ) : (
                  localCategories.map((category) => (
                    <tr key={category.id}>
                      <td data-label="Name" className="bold">
                        {category.name}
                      </td>
                      <td data-label="Username">{category.description}</td>

                      <td data-label="Created At">{category.createdAt}</td>
                      <td
                        data-label="Actions"
                        className="actions-buttons-table">
                        <div className="action-buttons">
                          <button className="btn-icon" aria-label="View">
                            <i className="fa fa-eye"></i>
                          </button>
                          <button className="btn-icon" aria-label={`Edit `}>
                            <i className="fa fa-edit"></i>
                          </button>
                          <button className="btn-icon delete" aria-label="">
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* <div className="dialog-overlay">
          <div className="dialog-box">
            <h3>User Details</h3>
            <div className="dialog-content">
              <label>Name:</label>
              <p>Hii</p>

              <label>Username</label>
              <p>Hello</p>

              <label>Contact</label>
              <p>hii</p>

              <label>Role</label>
              <p>role</p>

              <label>Created At</label>
              <p>at</p>
            </div>
            <button className="btn-close">Close</button>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default Categories;
