import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Package,
  AlertTriangle,
} from "lucide-react";
import "./products.css";

// Simulated API functions
const fetchProducts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return [
    {
      id: 1,
      name: "Brake Pads Set",
      category: { id: 5, name: "Braking System" },
      brand: { id: 1, name: "Toyota" },
      default_supplier: { id: 1, name: "AutoParts Rwanda Ltd" },
      unit: "piece",
      description: "High quality brake pads for Toyota vehicles",
      is_active: true,
      created_at: "2024-01-15",
      variants: [
        {
          id: 1,
          variant_code: "BP-TOY-001",
          size: "Standard",
          color: null,
          specification: "Front brake pads for Corolla 2015-2020",
          price: 25000,
          cost_price: 18000,
          weight: 2.5,
          stock: 50,
          min_stock_level: 10,
          is_active: true,
        },
        {
          id: 2,
          variant_code: "BP-TOY-002",
          size: "Standard",
          color: null,
          specification: "Rear brake pads for Corolla 2015-2020",
          price: 22000,
          cost_price: 16000,
          weight: 2.2,
          stock: 30,
          min_stock_level: 8,
          is_active: true,
        },
      ],
    },
    {
      id: 2,
      name: "Engine Oil Filter",
      category: { id: 1, name: "Engine Parts" },
      brand: { id: 2, name: "Honda" },
      default_supplier: { id: 2, name: "Kigali Motors Supply" },
      unit: "piece",
      description: "Premium engine oil filter for Honda engines",
      is_active: true,
      created_at: "2024-01-20",
      variants: [
        {
          id: 3,
          variant_code: "OF-HON-001",
          size: "Standard",
          color: null,
          specification: "Oil filter for Honda Civic 2016-2021",
          price: 8500,
          cost_price: 6000,
          weight: 0.8,
          stock: 75,
          min_stock_level: 15,
          is_active: true,
        },
      ],
    },
    {
      id: 3,
      name: "Headlight Bulb",
      category: { id: 3, name: "Electrical" },
      brand: { id: 6, name: "Universal" },
      default_supplier: { id: 3, name: "East Africa Auto Parts" },
      unit: "piece",
      description:
        "LED headlight bulbs compatible with multiple vehicle brands",
      is_active: true,
      created_at: "2024-01-25",
      variants: [
        {
          id: 4,
          variant_code: "HL-LED-H4",
          size: "H4",
          color: "White",
          specification: "6000K LED bulb, 35W power consumption",
          price: 15000,
          cost_price: 10000,
          weight: 0.3,
          stock: 5,
          min_stock_level: 20,
          is_active: true,
        },
        {
          id: 5,
          variant_code: "HL-LED-H7",
          size: "H7",
          color: "White",
          specification: "6000K LED bulb, 35W power consumption",
          price: 16000,
          cost_price: 11000,
          weight: 0.3,
          stock: 40,
          min_stock_level: 15,
          is_active: true,
        },
      ],
    },
  ];
};

const deleteProduct = async (productId) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log(`Deleting product ${productId}`);
  return { success: true };
};

function Products() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [detailsModal, setDetailsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  // Fetch products query
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
    },
  });

  // Filter products by search term
  const filteredProducts = products.filter((product) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.category.name.toLowerCase().includes(searchLower) ||
      product.brand.name.toLowerCase().includes(searchLower) ||
      product.default_supplier.name.toLowerCase().includes(searchLower) ||
      product.variants.some(
        (variant) =>
          variant.variant_code.toLowerCase().includes(searchLower) ||
          variant.size?.toLowerCase().includes(searchLower) ||
          variant.color?.toLowerCase().includes(searchLower)
      )
    );
  });

  // Calculate total stock and low stock variants for each product
  const getProductStats = (product) => {
    const totalStock = product.variants.reduce(
      (sum, variant) => sum + variant.stock,
      0
    );
    const lowStockVariants = product.variants.filter(
      (variant) => variant.stock <= variant.min_stock_level
    );
    const totalVariants = product.variants.length;

    return {
      totalStock,
      lowStockCount: lowStockVariants.length,
      totalVariants,
      hasLowStock: lowStockVariants.length > 0,
    };
  };

  // Open product details modal
  const openDetails = (product) => {
    setSelectedProduct(product);
    setDetailsModal(true);
  };

  const closeDetails = () => {
    setSelectedProduct(null);
    setDetailsModal(false);
  };

  const handleDeleteProduct = (productId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this product and all its variants?"
      )
    ) {
      deleteProductMutation.mutate(productId);
    }
  };

  const formatCurrency = (amount) => {
    return (
      new Intl.NumberFormat("rw-RW", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount) + " RWF"
    );
  };

  if (isLoading) {
    return (
      <div className="products-loading">
        <div className="loading-spinner">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-error">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Failed to load products. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="products-container">
      {/* Header */}
      <div className="products-header">
        <div className="header-info">
          <h1>Products</h1>
          <p>Manage your product inventory and variants</p>
        </div>
        <Button
          //   onClick={() => navigate("/HomePage/product/add")}
          onClick={() => navigate("./add")}
          className="add-product-btn">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Search */}
      <div className="products-search">
        <Search className="search-icon" />
        <Input
          type="text"
          placeholder="Search products, categories, brands, variants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="search-input"
        />
      </div>

      {/* Products table */}
      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <Package className="no-products-icon" />
          <h3>No products found</h3>
          <p>
            {searchTerm
              ? "No products match your search criteria"
              : "Start by adding your first product"}
          </p>
          {!searchTerm && (
            <Button onClick={() => navigate("/products/add")}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Product
            </Button>
          )}
        </div>
      ) : (
        <div className="products-table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Variants</th>
                <th>Stock Status</th>
                <th>Price Range</th>
                <th>Supplier</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const stats = getProductStats(product);
                const priceRange =
                  product.variants.length > 1
                    ? `${formatCurrency(
                        Math.min(...product.variants.map((v) => v.price))
                      )} - ${formatCurrency(
                        Math.max(...product.variants.map((v) => v.price))
                      )}`
                    : formatCurrency(product.variants[0]?.price || 0);

                return (
                  <tr key={product.id}>
                    <td data-label="Product Name" className="product-name">
                      <div className="product-info">
                        <span className="name">{product.name}</span>
                        {!product.is_active && (
                          <Badge variant="secondary" className="inactive-badge">
                            Inactive
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td data-label="Category">{product.category.name}</td>
                    <td data-label="Brand">{product.brand.name}</td>
                    <td data-label="Variants">
                      <Badge variant="outline" className="variants-count">
                        {stats.totalVariants} variant
                        {stats.totalVariants !== 1 ? "s" : ""}
                      </Badge>
                    </td>
                    <td data-label="Stock Status">
                      <div className="stock-info">
                        <span className="stock-count">
                          {stats.totalStock} units
                        </span>
                        {stats.hasLowStock && (
                          <Badge
                            variant="destructive"
                            className="low-stock-badge">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            {stats.lowStockCount} low
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td data-label="Price Range">{priceRange}</td>
                    <td data-label="Supplier">
                      {product.default_supplier.name}
                    </td>
                    <td data-label="Created">{product.created_at}</td>
                    <td data-label="Actions" className="actions-cell">
                      <div className="action-buttons">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDetails(product)}
                          title="View Details">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            navigate(`/products/edit/${product.id}`)
                          }
                          title="Edit Product">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          title="Delete Product"
                          disabled={deleteProductMutation.isPending}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Product Details Modal */}
      {detailsModal && selectedProduct && (
        <div className="modal-overlay" onClick={closeDetails}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Product Details</h3>
              <Button variant="ghost" size="sm" onClick={closeDetails}>
                ×
              </Button>
            </div>

            <div className="modal-body">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="details-grid">
                    <div className="detail-item">
                      <label>Name:</label>
                      <span>{selectedProduct.name}</span>
                    </div>
                    <div className="detail-item">
                      <label>Category:</label>
                      <span>{selectedProduct.category.name}</span>
                    </div>
                    <div className="detail-item">
                      <label>Brand:</label>
                      <span>{selectedProduct.brand.name}</span>
                    </div>
                    <div className="detail-item">
                      <label>Unit:</label>
                      <span>{selectedProduct.unit}</span>
                    </div>
                    <div className="detail-item">
                      <label>Supplier:</label>
                      <span>{selectedProduct.default_supplier.name}</span>
                    </div>
                    <div className="detail-item">
                      <label>Status:</label>
                      <Badge
                        variant={
                          selectedProduct.is_active ? "default" : "secondary"
                        }>
                        {selectedProduct.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    {selectedProduct.description && (
                      <div className="detail-item full-width">
                        <label>Description:</label>
                        <span>{selectedProduct.description}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Variants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="variants-list">
                    {selectedProduct.variants.map((variant) => (
                      <div key={variant.id} className="variant-item">
                        <div className="variant-header">
                          <span className="variant-code">
                            {variant.variant_code}
                          </span>
                          {variant.stock <= variant.min_stock_level && (
                            <Badge variant="destructive" size="sm">
                              Low Stock
                            </Badge>
                          )}
                        </div>
                        <div className="variant-details">
                          {variant.size && <span>Size: {variant.size}</span>}
                          {variant.color && <span>Color: {variant.color}</span>}
                          <span>Price: {formatCurrency(variant.price)}</span>
                          {variant.cost_price && (
                            <span>
                              Cost: {formatCurrency(variant.cost_price)}
                            </span>
                          )}
                          <span>
                            Stock: {variant.stock} / Min:{" "}
                            {variant.min_stock_level}
                          </span>
                        </div>
                        {variant.specification && (
                          <div className="variant-specs">
                            <small>{variant.specification}</small>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="modal-footer">
              <Button onClick={closeDetails}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
