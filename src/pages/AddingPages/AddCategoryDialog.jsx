import { React, useState } from "react";
import "../../css/users.css";

function AddCategoryDialog() {
  const [description, setDescription] = useState("");

  return (
    <>
      <div className="popup-overlay">
        <div className="add-user">
          <form onSubmit="">
            <div>
              <label htmlFor="name">Category Name</label>
              <input
                name="name"
                placeholder="Enter full name"
                value=""
                onChange=""
                required
              />
            </div>

            <div>
              <label htmlFor="username">Description</label>
              <textarea
                name="category"
                style={{
                  backgroundColor: "var(--bg-color)",
                  color: "var(--text-color)",
                  border: "1px solid var(--btn-border)",
                  overflowY: "hidden", // hides vertical overflow
                }}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit">Add Category </button>
              <button type="button" className="cancel-btn" onClick="">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddCategoryDialog;
