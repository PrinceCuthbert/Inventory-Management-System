import { useState, useEffect } from "react";
import "../css/users.css";
import { brands as localBrands } from "../data/brands"; // you'll need a local data file like categories
import Spinner from "../components/antDesign/spin";
import AddBrandDialog from "./AddingPages/AddBrandDialog";
import { Button, notification, Space } from "antd";

function Brands() {
  const [searchTerm, setSearchTerm] = useState("");
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [detailsModal, setDetailsModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  // For AddBrandDialog
  const [isAddBrandOpen, setIsAddBrandOpen] = useState(false);

  // Notification hook
  const [api, contextHolder] = notification.useNotification();

  // Load brands (from localStorage or fallback to local file)
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await new Promise((resolve) => {
          setTimeout(() => {
            const stored = localStorage.getItem("brands");
            if (stored) {
              resolve(JSON.parse(stored));
            } else {
              resolve(localBrands);
            }
          }, 500);
        });
        setBrands(data);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBrands();
  }, []);

  // Add Brand
  const handleAddBrand = (newBrand) => {
    setBrands((prev) => {
      const updated = [
        ...prev,
        {
          ...newBrand,
          createdAt: new Date().toLocaleDateString(),
        },
      ];
      localStorage.setItem("brands", JSON.stringify(updated));
      return updated;
    });
  };

  // Delete Brand with notification
  const handleDeleteBrand = (brandId) => {
    const key = `delete${brandId}`;

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
            // Confirm deletion
            setBrands((prev) => {
              const updated = prev.filter((b) => b.id !== brandId);
              localStorage.setItem("brands", JSON.stringify(updated));
              return updated;
            });
            api.destroy(key); // close notification
          }}>
          Confirm
        </Button>
      </Space>
    );

    api.open({
      message: "Delete Confirmation",
      description: "Are you sure you want to delete this brand?",
      btn,
      key,
      onClose: () => console.log("Delete notification closed"),
      duration: 0, // stays until user confirms/cancels
    });
  };

  // Search filter
  const filteredBrands = brands.filter(
    (b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.createdAt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open brand details modal
  const openDetails = (brand) => {
    setSelectedBrand(brand);
    setDetailsModal(true);
  };

  // Close modal
  const closeDetails = () => {
    setSelectedBrand(null);
    setDetailsModal(false);
  };

  return (
    <>
      {contextHolder}
      <div className="products-container">
        <div className="products-header">
          <div>
            <h1>Brands</h1>
            <p>Manage system brands</p>
          </div>
          <button
            className="btn-primary"
            onClick={() => setIsAddBrandOpen(true)}>
            <i className="fa fa-plus"></i> Add Brand
          </button>
        </div>

        <div className="products-search">
          <i className="fa fa-search"></i>
          <input
            type="text"
            placeholder="Search brands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isLoading ? (
          <Spinner />
        ) : filteredBrands.length === 0 ? (
          <p style={{ textAlign: "center", padding: "20px" }}>No data found</p>
        ) : (
          <div className="products-table-wrapper">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Name</th>
                  {/* <th>Description</th> */}
                  <th>Created-At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBrands.map((brand) => (
                  <tr key={brand.id}>
                    <td data-label="Name" className="bold">
                      {brand.name}
                    </td>
                    {/* <td data-label="Description" className="bold">
                      {brand.description}
                    </td> */}
                    <td data-label="Created_at" className="bold">
                      {brand.createdAt}
                    </td>
                    <td data-label="Actions" className="actions-buttons-table">
                      <div className="action-buttons">
                        <button
                          className="btn-icon"
                          onClick={() => openDetails(brand)}
                          aria-label={`View details of ${brand.name}`}>
                          <i className="fa fa-eye"></i>
                        </button>
                        <button className="btn-icon">
                          <i
                            className="fa fa-edit"
                            aria-label={`Edit ${brand.name}`}></i>
                        </button>
                        <button
                          className="btn-icon delete"
                          aria-label={`Delete ${brand.name}`}
                          onClick={() => handleDeleteBrand(brand.id)}>
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

        {/* Details Modal */}
        {detailsModal && selectedBrand && (
          <div className="dialog-overlay" onClick={closeDetails}>
            <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
              <h3>Brand Details</h3>
              <div className="dialog-content">
                <label>Name:</label>
                <p>{selectedBrand.name}</p>

                <label>Description:</label>
                <p>{selectedBrand.description}</p>

                <label>Created-at:</label>
                <p>{selectedBrand.createdAt}</p>
              </div>
              <button className="btn-close" onClick={closeDetails}>
                Close
              </button>
            </div>
          </div>
        )}

        {/* Add Brand Dialog */}
        <AddBrandDialog
          isOpen={isAddBrandOpen}
          onClose={() => setIsAddBrandOpen(false)}
          onAddBrand={handleAddBrand}
        />
      </div>
    </>
  );
}

export default Brands;
