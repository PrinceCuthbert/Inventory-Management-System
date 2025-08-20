// src/data/sales.js
export const salesData = [
  {
    id: 1,
    productId: 1, // reference to products.js
    sizeId: 1, // reference to sizes.js (if applicable)
    quantity: 1,
    actualPrice: 1250, // sold lower than expected 1299
    paymentType: "CASH", // cash, momo, loan, installments
    userId: 1, // reference to users.js
    clientName: "John Doe",
    clientContact: "+1234567890",
    description: "Regular sale",
    createdAt: new Date("2024-01-15T10:00:00Z").toLocaleString(),
    updatedAt: new Date("2024-01-15T10:00:00Z").toLocaleString(),
  },
  {
    id: 2,
    productId: 2,
    sizeId: 2,
    quantity: 1,
    actualPrice: 1100, // slightly under expected 1199
    paymentType: "MOMO",
    userId: 1,
    clientName: "Jane Smith",
    clientContact: "+9876543210",
    description: "Discounted sale",
    createdAt: new Date("2024-01-16T10:00:00Z").toLocaleString(),
    updatedAt: new Date("2024-01-16T10:00:00Z").toLocaleString(),
  },
  {
    id: 3,
    productId: 3,
    sizeId: 3,
    quantity: 1,
    actualPrice: 2400, // close to expected 2499
    paymentType: "CASH",
    userId: 2,
    clientName: "Alice Johnson",
    clientContact: "+1122334455",
    description: "Special offer",
    createdAt: new Date("2024-01-17T14:30:00Z").toLocaleString(),
    updatedAt: new Date("2024-01-17T14:30:00Z").toLocaleString(),
  },
  {
    id: 4,
    productId: 4,
    sizeId: 4,
    quantity: 2,
    actualPrice: 380, // each sold slightly below 399
    paymentType: "MOMO",
    userId: 2,
    clientName: "Bob Brown",
    clientContact: "+9988776655",
    description: "Clearance sale",
    createdAt: new Date("2024-01-18T11:20:00Z").toLocaleString(),
    updatedAt: new Date("2024-01-18T11:20:00Z").toLocaleString(),
  },
  {
    id: 5,
    productId: 5,
    sizeId: 5,
    quantity: 1,
    actualPrice: 1850,
    paymentType: "CASH",
    userId: 1,
    clientName: "Charlie Davis",
    clientContact: "+4455667788",
    description: "Bundle deal",
    createdAt: new Date("2024-01-19T09:45:00Z").toLocaleString(),
    updatedAt: new Date("2024-01-19T09:45:00Z").toLocaleString(),
  },
  {
    id: 6,
    productId: 6,
    sizeId: 6,
    quantity: 3,
    actualPrice: 110, // bulk sale discount
    paymentType: "CASH",
    userId: 3,
    clientName: "Diana Evans",
    clientContact: "+5566778899",
    description: "Regular sale",
    createdAt: new Date("2024-01-20T16:00:00Z").toLocaleString(),
    updatedAt: new Date("2024-01-20T16:00:00Z").toLocaleString(),
  },
];
