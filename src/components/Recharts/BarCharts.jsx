import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { products } from "../../data/products";

export default function ProductChart() {
  // Transform products into chart format
  const chartData = products.map((p) => ({
    name: p.name, // X-axis label
    price: p.price, // Y-axis line 1
    stock: p.stock, // Y-axis line 2
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            name="Price ($)"
          />
          <Line type="monotone" dataKey="stock" stroke="#82ca9d" name="Stock" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
