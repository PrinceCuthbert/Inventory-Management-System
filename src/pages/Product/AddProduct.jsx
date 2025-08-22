import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';
import ProductVariantForm from './ProductVariantForm';
import './AddProduct.css';

// Simulated API functions
const fetchCategories = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
        { id: 1, name: 'Engine Parts', description: 'Engine related components' },
        { id: 2, name: 'Body Parts', description: 'Exterior and interior body components' },
        { id: 3, name: 'Electrical', description: 'Electrical components and systems' },
        { id: 4, name: 'Suspension', description: 'Suspension and steering parts' },
        { id: 5, name: 'Braking System', description: 'Brake components' },
    ];
};

const fetchBrands = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
        { id: 1, name: 'Toyota', description: 'Toyota genuine parts' },
        { id: 2, name: 'Honda', description: 'Honda genuine parts' },
        { id: 3, name: 'Nissan', description: 'Nissan genuine parts' },
        { id: 4, name: 'Mercedes-Benz', description: 'Mercedes-Benz genuine parts' },
        { id: 5, name: 'BMW', description: 'BMW genuine parts' },
        { id: 6, name: 'Universal', description: 'Universal/aftermarket parts' },
    ];
};

const fetchSuppliers = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
        { id: 1, name: 'AutoParts Rwanda Ltd', contact: '+250788123456' },
        { id: 2, name: 'Kigali Motors Supply', contact: '+250788654321' },
        { id: 3, name: 'East Africa Auto Parts', contact: '+250789123456' },
        { id: 4, name: 'Premium Parts Distributors', contact: '+250787654321' },
    ];
};

const createProduct = async (productData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Creating product:', productData);
    return { id: Date.now(), ...productData };
};

const AddProduct = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        name: '',
        brand_id: '',
        category_id: '',
        default_supplier_id: '',
        unit: 'piece',
        description: '',
        is_active: true,
    });

    const [variants, setVariants] = useState([
        {
            id: Date.now(),
            variant_code: '',
            size: '',
            color: '',
            specification: '',
            price: '',
            cost_price: '',
            weight: '',
            stock: '',
            min_stock_level: '',
            is_active: true,
        }
    ]);

    const [errors, setErrors] = useState({});

    // Fetch queries
    const { data: categories, isLoading: categoriesLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });

    const { data: brands, isLoading: brandsLoading } = useQuery({
        queryKey: ['brands'],
        queryFn: fetchBrands,
    });

    const { data: suppliers, isLoading: suppliersLoading } = useQuery({
        queryKey: ['suppliers'],
        queryFn: fetchSuppliers,
    });

    // Create product mutation
    const createProductMutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
            navigate('/products');
        },
        onError: (error) => {
            console.error('Error creating product:', error);
        },
    });

    const handleInputChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleVariantChange = (variantId, field, value) => {
        setVariants(prev =>
            prev.map(variant =>
                variant.id === variantId
                    ? { ...variant, [field]: value }
                    : variant
            )
        );
    };

    const addVariant = () => {
        const newVariant = {
            id: Date.now(),
            variant_code: '',
            size: '',
            color: '',
            specification: '',
            price: '',
            cost_price: '',
            weight: '',
            stock: '',
            min_stock_level: '',
            is_active: true,
        };
        setVariants(prev => [...prev, newVariant]);
    };

    const removeVariant = (variantId) => {
        if (variants.length > 1) {
            setVariants(prev => prev.filter(variant => variant.id !== variantId));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Product name is required';
        }

        if (!formData.category_id) {
            newErrors.category_id = 'Category is required';
        }

        if (!formData.brand_id) {
            newErrors.brand_id = 'Brand is required';
        }

        if (!formData.default_supplier_id) {
            newErrors.default_supplier_id = 'Default supplier is required';
        }

        // Validate variants
        const variantErrors = {};
        variants.forEach((variant, index) => {
            const variantError = {};

            if (!variant.variant_code.trim()) {
                variantError.variant_code = 'Variant code is required';
            }

            if (!variant.price || parseFloat(variant.price) <= 0) {
                variantError.price = 'Valid price is required';
            }

            if (variant.cost_price && parseFloat(variant.cost_price) <= 0) {
                variantError.cost_price = 'Cost price must be greater than 0';
            }

            if (Object.keys(variantError).length > 0) {
                variantErrors[index] = variantError;
            }
        });

        if (Object.keys(variantErrors).length > 0) {
            newErrors.variants = variantErrors;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const productData = {
            ...formData,
            brand_id: parseInt(formData.brand_id),
            category_id: parseInt(formData.category_id),
            default_supplier_id: parseInt(formData.default_supplier_id),
            variants: variants.map(variant => ({
                ...variant,
                price: parseFloat(variant.price),
                cost_price: variant.cost_price ? parseFloat(variant.cost_price) : null,
                weight: variant.weight ? parseFloat(variant.weight) : null,
                stock: variant.stock ? parseFloat(variant.stock) : 0,
                min_stock_level: variant.min_stock_level ? parseFloat(variant.min_stock_level) : 0,
            })),
        };

        createProductMutation.mutate(productData);
    };

    const isLoading = categoriesLoading || brandsLoading || suppliersLoading;

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner">Loading...</div>
            </div>
        );
    }

    return (
        <div className="add-product-container">
            <div className="add-product-header">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/products')}
                    className="back-button"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Products
                </Button>
                <h1>Add New Product</h1>
            </div>

            <form onSubmit={handleSubmit} className="add-product-form">
                <Card className="product-basic-info">
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="form-grid">
                            <div className="form-group">
                                <Label htmlFor="name">Product Name *</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder="Enter product name"
                                    className={errors.name ? 'error' : ''}
                                />
                                {errors.name && <span className="error-text">{errors.name}</span>}
                            </div>

                            <div className="form-group">
                                <Label htmlFor="category">Category *</Label>
                                <Select
                                    value={formData.category_id}
                                    onValueChange={(value) => handleInputChange('category_id', value)}
                                >
                                    <SelectTrigger className={errors.category_id ? 'error' : ''}>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories?.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.category_id && <span className="error-text">{errors.category_id}</span>}
                            </div>

                            <div className="form-group">
                                <Label htmlFor="brand">Brand *</Label>
                                <Select
                                    value={formData.brand_id}
                                    onValueChange={(value) => handleInputChange('brand_id', value)}
                                >
                                    <SelectTrigger className={errors.brand_id ? 'error' : ''}>
                                        <SelectValue placeholder="Select brand" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {brands?.map((brand) => (
                                            <SelectItem key={brand.id} value={brand.id.toString()}>
                                                {brand.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.brand_id && <span className="error-text">{errors.brand_id}</span>}
                            </div>

                            <div className="form-group">
                                <Label htmlFor="supplier">Default Supplier *</Label>
                                <Select
                                    value={formData.default_supplier_id}
                                    onValueChange={(value) => handleInputChange('default_supplier_id', value)}
                                >
                                    <SelectTrigger className={errors.default_supplier_id ? 'error' : ''}>
                                        <SelectValue placeholder="Select supplier" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {suppliers?.map((supplier) => (
                                            <SelectItem key={supplier.id} value={supplier.id.toString()}>
                                                {supplier.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.default_supplier_id && <span className="error-text">{errors.default_supplier_id}</span>}
                            </div>

                            <div className="form-group">
                                <Label htmlFor="unit">Unit</Label>
                                <Select
                                    value={formData.unit}
                                    onValueChange={(value) => handleInputChange('unit', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="piece">Piece</SelectItem>
                                        <SelectItem value="kg">Kilogram</SelectItem>
                                        <SelectItem value="litre">Litre</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="form-group full-width">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    placeholder="Enter product description"
                                    rows={3}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="product-variants">
                    <CardHeader>
                        <div className="variants-header">
                            <CardTitle>Product Variants</CardTitle>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addVariant}
                                className="add-variant-btn"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Variant
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="variants-list">
                            {variants.map((variant, index) => (
                                <ProductVariantForm
                                    key={variant.id}
                                    variant={variant}
                                    index={index}
                                    onVariantChange={handleVariantChange}
                                    onRemove={() => removeVariant(variant.id)}
                                    canRemove={variants.length > 1}
                                    errors={errors.variants?.[index]}
                                />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="form-actions">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate('/products')}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={createProductMutation.isPending}
                        className="submit-btn"
                    >
                        {createProductMutation.isPending ? 'Creating...' : 'Create Product'}
                    </Button>
                </div>

                {createProductMutation.error && (
                    <Alert className="error-alert">
                        <AlertDescription>
                            Failed to create product. Please try again.
                        </AlertDescription>
                    </Alert>
                )}
            </form>
        </div>
    );
};

export default AddProduct;