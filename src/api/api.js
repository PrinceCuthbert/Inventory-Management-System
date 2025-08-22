// api.js - Simulated API functions for products, categories, brands, and suppliers
// Replace these with actual API calls to your Express.js backend

// Base URL for your API (replace with your actual backend URL)
const API_BASE_URL = 'http://localhost:3000/api'; // Update this to your backend URL

// Utility function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Categories API
export const categoriesApi = {
    // Fetch all categories
    fetchAll: async () => {
        await delay(500); // Simulate network delay

        // Replace with actual API call:
        // const response = await fetch(`${API_BASE_URL}/categories`);
        // return response.json();

        return [
            { id: 1, name: 'Engine Parts', description: 'Engine related components and accessories' },
            { id: 2, name: 'Body Parts', description: 'Exterior and interior body components' },
            { id: 3, name: 'Electrical', description: 'Electrical components and systems' },
            { id: 4, name: 'Suspension', description: 'Suspension and steering parts' },
            { id: 5, name: 'Braking System', description: 'Brake components and accessories' },
            { id: 6, name: 'Transmission', description: 'Transmission and drivetrain parts' },
            { id: 7, name: 'Cooling System', description: 'Radiators, fans, and cooling components' },
            { id: 8, name: 'Exhaust System', description: 'Exhaust pipes, mufflers, and catalytic converters' },
            { id: 9, name: 'Filters', description: 'Air, oil, fuel, and cabin filters' },
            { id: 10, name: 'Lighting', description: 'Headlights, taillights, and interior lighting' },
        ];
    },

    // Create new category
    create: async (categoryData) => {
        await delay(800);

        // Replace with actual API call:
        // const response = await fetch(`${API_BASE_URL}/categories`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(categoryData),
        // });
        // return response.json();

        return {
            id: Date.now(),
            ...categoryData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
    },
};

// Brands API
export const brandsApi = {
    // Fetch all brands
    fetchAll: async () => {
        await delay(500);

        // Replace with actual API call:
        // const response = await fetch(`${API_BASE_URL}/brands`);
        // return response.json();

        return [
            { id: 1, name: 'Toyota', description: 'Toyota genuine and compatible parts' },
            { id: 2, name: 'Honda', description: 'Honda genuine and compatible parts' },
            { id: 3, name: 'Nissan', description: 'Nissan genuine and compatible parts' },
            { id: 4, name: 'Mercedes-Benz', description: 'Mercedes-Benz genuine parts' },
            { id: 5, name: 'BMW', description: 'BMW genuine parts' },
            { id: 6, name: 'Audi', description: 'Audi genuine parts' },
            { id: 7, name: 'Volkswagen', description: 'Volkswagen genuine parts' },
            { id: 8, name: 'Ford', description: 'Ford genuine and compatible parts' },
            { id: 9, name: 'Hyundai', description: 'Hyundai genuine and compatible parts' },
            { id: 10, name: 'Kia', description: 'Kia genuine and compatible parts' },
            { id: 11, name: 'Universal', description: 'Universal/aftermarket parts compatible with multiple brands' },
            { id: 12, name: 'OEM', description: 'Original Equipment Manufacturer parts' },
        ];
    },

    // Create new brand
    create: async (brandData) => {
        await delay(800);

        // Replace with actual API call:
        // const response = await fetch(`${API_BASE_URL}/brands`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(brandData),
        // });
        // return response.json();

        return {
            id: Date.now(),
            ...brandData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
    },
};

// Suppliers API
export const suppliersApi = {
    // Fetch all suppliers
    fetchAll: async () => {
        await delay(500);

        // Replace with actual API call:
        // const response = await fetch(`${API_BASE_URL}/suppliers`);
        // return response.json();

        return [
            {
                id: 1,
                name: 'AutoParts Rwanda Ltd',
                contact: '+250788123456',
                email: 'info@autopartsrw.com',
                address: 'KN 5 Ave, Kigali',
                description: 'Leading supplier of genuine auto parts in Rwanda'
            },
            {
                id: 2,
                name: 'Kigali Motors Supply',
                contact: '+250788654321',
                email: 'sales@kigalimotors.com',
                address: 'Kimisagara, Kigali',
                description: 'Specialized in Japanese car parts'
            },
            {
                id: 3,
                name: 'East Africa Auto Parts',
                contact: '+250789123456',
                email: 'orders@eaautoparts.com',
                address: 'Gikondo Industrial Zone',
                description: 'Regional distributor of automotive components'
            },
            {
                id: 4,
                name: 'Premium Parts Distributors',
                contact: '+250787654321',
                email: 'info@premiumparts.rw',
                address: 'Remera, Kigali',
                description: 'Luxury and premium vehicle parts supplier'
            },
            {
                id: 5,
                name: 'Universal Auto Supply',
                contact: '+250786789012',
                email: 'contact@universalauto.rw',
                address: 'Nyabugogo, Kigali',
                description: 'Wide range of aftermarket parts'
            },
        ];
    },

    // Create new supplier
    create: async (supplierData) => {
        await delay(800);

        // Replace with actual API call:
        // const response = await fetch(`${API_BASE_URL}/suppliers`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(supplierData),
        // });
        // return response.json();

        return {
            id: Date.now(),
            ...supplierData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
    },
};

// Products API
export const productsApi = {
    // Fetch all products with variants
    fetchAll: async () => {
        await delay(800);

        // Replace with actual API call:
        // const response = await fetch(`${API_BASE_URL}/products?include=variants,category,brand,supplier`);
        // return response.json();

        return [
            {
                id: 1,
                name: "Brake Pads Set",
                category: { id: 5, name: "Braking System" },
                brand: { id: 1, name: "Toyota" },
                default_supplier: { id: 1, name: "AutoParts Rwanda Ltd" },
                unit: "piece",
                description: "High quality brake pads for Toyota vehicles with excellent stopping power",
                is_active: true,
                created_at: "2024-01-15",
                updated_at: "2024-01-15",
                variants: [
                    {
                        id: 1,
                        variant_code: "BP-TOY-COR-F15",
                        size: "Standard",
                        color: null,
                        specification: "Front brake pads for Toyota Corolla 2015-2020, ceramic compound",
                        price: 25000,
                        cost_price: 18000,
                        weight: 2.5,
                        stock: 50,
                        min_stock_level: 10,
                        is_active: true
                    },
                    {
                        id: 2,
                        variant_code: "BP-TOY-COR-R15",
                        size: "Standard",
                        color: null,
                        specification: "Rear brake pads for Toyota Corolla 2015-2020, ceramic compound",
                        price: 22000,
                        cost_price: 16000,
                        weight: 2.2,
                        stock: 30,
                        min_stock_level: 8,
                        is_active: true
                    }
                ]
            },
            {
                id: 2,
                name: "Engine Oil Filter",
                category: { id: 1, name: "Engine Parts" },
                brand: { id: 2, name: "Honda" },
                default_supplier: { id: 2, name: "Kigali Motors Supply" },
                unit: "piece",
                description: "Premium engine oil filter for Honda engines, ensures clean oil circulation",
                is_active: true,
                created_at: "2024-01-20",
                updated_at: "2024-01-20",
                variants: [
                    {
                        id: 3,
                        variant_code: "OF-HON-CIV16",
                        size: "Standard",
                        color: null,
                        specification: "Oil filter for Honda Civic 2016-2021, high-efficiency filtration",
                        price: 8500,
                        cost_price: 6000,
                        weight: 0.8,
                        stock: 75,
                        min_stock_level: 15,
                        is_active: true
                    }
                ]
            },
            {
                id: 3,
                name: "LED Headlight Bulb",
                category: { id: 3, name: "Electrical" },
                brand: { id: 11, name: "Universal" },
                default_supplier: { id: 3, name: "East Africa Auto Parts" },
                unit: "piece",
                description: "High-performance LED headlight bulbs compatible with multiple vehicle brands",
                is_active: true,
                created_at: "2024-01-25",
                updated_at: "2024-01-25",
                variants: [
                    {
                        id: 4,
                        variant_code: "HL-LED-H4-6K",
                        size: "H4",
                        color: "Cool White",
                        specification: "6000K LED bulb, 35W power consumption, 3600 lumens",
                        price: 15000,
                        cost_price: 10000,
                        weight: 0.3,
                        stock: 5,
                        min_stock_level: 20,
                        is_active: true
                    },
                    {
                        id: 5,
                        variant_code: "HL-LED-H7-6K",
                        size: "H7",
                        color: "Cool White",
                        specification: "6000K LED bulb, 35W power consumption, 3800 lumens",
                        price: 16000,
                        cost_price: 11000,
                        weight: 0.3,
                        stock: 40,
                        min_stock_level: 15,
                        is_active: true
                    }
                ]
            },
            {
                id: 4,
                name: "Air Filter",
                category: { id: 9, name: "Filters" },
                brand: { id: 1, name: "Toyota" },
                default_supplier: { id: 1, name: "AutoParts Rwanda Ltd" },
                unit: "piece",
                description: "High-efficiency air filter for Toyota engines",
                is_active: true,
                created_at: "2024-02-01",
                updated_at: "2024-02-01",
                variants: [
                    {
                        id: 6,
                        variant_code: "AF-TOY-CAM18",
                        size: "Standard",
                        color: null,
                        specification: "Air filter for Toyota Camry 2018-2022, pleated design",
                        price: 12000,
                        cost_price: 8500,
                        weight: 0.6,
                        stock: 3,
                        min_stock_level: 12,
                        is_active: true
                    }
                ]
            }
        ];
    },

    // Fetch single product by ID
    fetchById: async (id) => {
        await delay(600);

        // Replace with actual API call:
        // const response = await fetch(`${API_BASE_URL}/products/${id}?include=variants,category,brand,supplier`);
        // return response.json();

        const products = await productsApi.fetchAll();
        return products.find(product => product.id === parseInt(id));
    },

    // Create new product with variants
    create: async (productData) => {
        await delay(1000);

        // Replace with actual API call:
        // const response = await fetch(`${API_BASE_URL}/products`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(productData),
        // });
        // return response.json();

        console.log('Creating product:', productData);

        return {
            id: Date.now(),
            ...productData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
    },

    // Update existing product
    update: async (id, productData) => {
        await delay(1000);

        // Replace with actual API call:
        // const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(productData),
        // });
        // return response.json();

        console.log(`Updating product ${id}:`, productData);

        return {
            id: parseInt(id),
            ...productData,
            updated_at: new Date().toISOString()
        };
    },

    // Delete product
    delete: async (id) => {
        await delay(500);

        // Replace with actual API call:
        // const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        //   method: 'DELETE',
        // });
        // return response.json();

        console.log(`Deleting product ${id}`);

        return { success: true, message: 'Product deleted successfully' };
    },
};

// Product Variants API (for managing individual variants)
export const variantsApi = {
    // Create new variant for existing product
    create: async (productId, variantData) => {
        await delay(800);

        // Replace with actual API call:
        // const response = await fetch(`${API_BASE_URL}/products/${productId}/variants`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(variantData),
        // });
        // return response.json();

        return {
            id: Date.now(),
            product_id: productId,
            ...variantData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
    },

    // Update existing variant
    update: async (variantId, variantData) => {
        await delay(800);

        // Replace with actual API call:
        // const response = await fetch(`${API_BASE_URL}/variants/${variantId}`, {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(variantData),
        // });
        // return response.json();

        return {
            id: parseInt(variantId),
            ...variantData,
            updated_at: new Date().toISOString()
        };
    },

    // Delete variant
    delete: async (variantId) => {
        await delay(500);

        // Replace with actual API call:
        // const response = await fetch(`${API_BASE_URL}/variants/${variantId}`, {
        //   method: 'DELETE',
        // });
        // return response.json();

        return { success: true, message: 'Variant deleted successfully' };
    },
};

// Export all APIs
export default {
    categories: categoriesApi,
    brands: brandsApi,
    suppliers: suppliersApi,
    products: productsApi,
    variants: variantsApi,
};