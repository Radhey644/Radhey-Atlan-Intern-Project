import { Query, TableData } from './types';

export const sampleQueries: Query[] = [
  {
    id: '1',
    name: 'List all customers',
    sql: 'SELECT * FROM customers;'
  },
  {
    id: '2',
    name: 'Recent orders',
    sql: 'SELECT order_id, customer_name, order_date, total_amount\nFROM orders\nJOIN customers ON orders.customer_id = customers.id\nORDER BY order_date DESC\nLIMIT 10;'
  },
  {
    id: '3',
    name: 'Product inventory',
    sql: 'SELECT product_name, category, stock_quantity, unit_price\nFROM products\nWHERE stock_quantity < 100\nORDER BY stock_quantity ASC;'
  },
  {
    id: '4',
    name: 'Top selling products',
    sql: 'SELECT p.product_name, COUNT(*) as total_sales, SUM(oi.quantity * oi.unit_price) as revenue\nFROM order_items oi\nJOIN products p ON oi.product_id = p.id\nGROUP BY p.product_name\nORDER BY revenue DESC\nLIMIT 10;'
  },
  {
    id: '5',
    name: 'Customer order history',
    sql: 'SELECT c.name, COUNT(o.id) as total_orders, SUM(o.total_amount) as total_spent\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\nGROUP BY c.id, c.name\nORDER BY total_spent DESC;'
  },
  {
    id: '6',
    name: 'Out of stock products',
    sql: 'SELECT product_name, category, last_restock_date\nFROM products\nWHERE stock_quantity = 0;'
  },
  {
    id: '7',
    name: 'Monthly sales report',
    sql: 'SELECT DATE_TRUNC(\'month\', order_date) as month, COUNT(*) as total_orders, SUM(total_amount) as revenue\nFROM orders\nGROUP BY month\nORDER BY month DESC;'
  },
  {
    id: '8',
    name: 'Customer demographics',
    sql: 'SELECT country, COUNT(*) as customer_count, AVG(lifetime_value) as avg_lifetime_value\nFROM customers\nGROUP BY country\nORDER BY customer_count DESC;'
  },
  {
    id: '9',
    name: 'Product categories summary',
    sql: 'SELECT category, COUNT(*) as product_count, AVG(unit_price) as avg_price\nFROM products\nGROUP BY category\nORDER BY product_count DESC;'
  },
  {
    id: '10',
    name: 'Recent customer reviews',
    sql: 'SELECT p.product_name, c.name as customer_name, r.rating, r.review_text, r.review_date\nFROM reviews r\nJOIN products p ON r.product_id = p.id\nJOIN customers c ON r.customer_id = c.id\nORDER BY r.review_date DESC\nLIMIT 10;'
  },
  {
    id: '11',
    name: 'High-value customers',
    sql: 'SELECT c.name, c.email, COUNT(o.id) as order_count, SUM(o.total_amount) as total_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nGROUP BY c.id, c.name, c.email\nHAVING SUM(o.total_amount) > 1000\nORDER BY total_spent DESC;'
  },
  {
    id: '12',
    name: 'Product price history',
    sql: 'SELECT product_name, old_price, new_price, change_date\nFROM price_history\nORDER BY change_date DESC;'
  },
  {
    id: '13',
    name: 'Customer satisfaction',
    sql: 'SELECT c.name, AVG(r.rating) as avg_rating, COUNT(r.id) as review_count\nFROM customers c\nLEFT JOIN reviews r ON c.id = r.customer_id\nGROUP BY c.id, c.name\nHAVING COUNT(r.id) >= 3\nORDER BY avg_rating DESC;'
  },
  {
    id: '14',
    name: 'Shipping analysis',
    sql: 'SELECT shipping_method, AVG(shipping_cost) as avg_cost, AVG(delivery_days) as avg_delivery_time\nFROM shipments\nGROUP BY shipping_method;'
  },
  {
    id: '15',
    name: 'Product returns',
    sql: 'SELECT p.product_name, COUNT(*) as return_count, STRING_AGG(r.reason, \', \') as return_reasons\nFROM returns r\nJOIN products p ON r.product_id = p.id\nGROUP BY p.product_name\nORDER BY return_count DESC;'
  },
  {
    id: '16',
    name: 'Seasonal sales',
    sql: 'SELECT EXTRACT(month FROM order_date) as month, category, SUM(total_amount) as revenue\nFROM orders o\nJOIN order_items oi ON o.id = oi.order_id\nJOIN products p ON oi.product_id = p.id\nGROUP BY month, category\nORDER BY month, revenue DESC;'
  },
  {
    id: '17',
    name: 'Customer acquisition',
    sql: 'SELECT DATE_TRUNC(\'month\', registration_date) as month, COUNT(*) as new_customers\nFROM customers\nGROUP BY month\nORDER BY month DESC;'
  },
  {
    id: '18',
    name: 'Product bundles',
    sql: 'SELECT p1.product_name as product1, p2.product_name as product2, COUNT(*) as times_bought_together\nFROM order_items oi1\nJOIN order_items oi2 ON oi1.order_id = oi2.order_id AND oi1.product_id < oi2.product_id\nJOIN products p1 ON oi1.product_id = p1.id\nJOIN products p2 ON oi2.product_id = p2.id\nGROUP BY p1.product_name, p2.product_name\nHAVING COUNT(*) >= 5\nORDER BY times_bought_together DESC;'
  },
  {
    id: '19',
    name: 'Payment methods',
    sql: 'SELECT payment_method, COUNT(*) as usage_count, SUM(total_amount) as total_processed\nFROM payments\nGROUP BY payment_method\nORDER BY usage_count DESC;'
  },
  {
    id: '20',
    name: 'Customer retention',
    sql: 'WITH customer_orders AS (\n  SELECT customer_id, COUNT(*) as order_count,\n         MAX(order_date) as last_order_date,\n         MIN(order_date) as first_order_date\n  FROM orders\n  GROUP BY customer_id\n)\nSELECT c.name,\n       co.order_count,\n       co.first_order_date,\n       co.last_order_date,\n       DATE_PART(\'day\', co.last_order_date - co.first_order_date) as days_as_customer\nFROM customer_orders co\nJOIN customers c ON co.customer_id = c.id\nORDER BY days_as_customer DESC;'
  },
  {
    id: '21',
    name: 'Product recommendations',
    sql: 'WITH product_pairs AS (\n  SELECT oi1.product_id as p1, oi2.product_id as p2, COUNT(*) as pair_count\n  FROM order_items oi1\n  JOIN order_items oi2 ON oi1.order_id = oi2.order_id AND oi1.product_id < oi2.product_id\n  GROUP BY oi1.product_id, oi2.product_id\n)\nSELECT p1.product_name as product,\n       p2.product_name as recommended_product,\n       pp.pair_count\nFROM product_pairs pp\nJOIN products p1 ON pp.p1 = p1.id\nJOIN products p2 ON pp.p2 = p2.id\nORDER BY pp.pair_count DESC;'
  },
  {
    id: '22',
    name: 'Category performance',
    sql: 'SELECT p.category,\n       COUNT(DISTINCT p.id) as product_count,\n       COUNT(DISTINCT o.id) as order_count,\n       SUM(oi.quantity * oi.unit_price) as revenue,\n       AVG(r.rating) as avg_rating\nFROM products p\nLEFT JOIN order_items oi ON p.id = oi.product_id\nLEFT JOIN orders o ON oi.order_id = o.id\nLEFT JOIN reviews r ON p.id = r.product_id\nGROUP BY p.category\nORDER BY revenue DESC;'
  },
  {
    id: '23',
    name: 'Customer segments',
    sql: 'WITH customer_metrics AS (\n  SELECT c.id,\n         COUNT(o.id) as order_count,\n         AVG(o.total_amount) as avg_order_value,\n         SUM(o.total_amount) as total_spent,\n         MAX(o.order_date) as last_order_date\n  FROM customers c\n  LEFT JOIN orders o ON c.id = o.customer_id\n  GROUP BY c.id\n)\nSELECT \n  CASE\n    WHEN order_count = 0 THEN \'Inactive\'\n    WHEN order_count = 1 THEN \'New\'\n    WHEN order_count > 10 AND total_spent > 5000 THEN \'VIP\'\n    ELSE \'Regular\'\n  END as segment,\n  COUNT(*) as customer_count,\n  AVG(total_spent) as avg_total_spent\nFROM customer_metrics\nGROUP BY segment\nORDER BY avg_total_spent DESC;'
  },
  {
    id: '24',
    name: 'Inventory valuation',
    sql: 'SELECT category,\n       COUNT(*) as product_count,\n       SUM(stock_quantity) as total_units,\n       SUM(stock_quantity * unit_price) as inventory_value\nFROM products\nGROUP BY category\nORDER BY inventory_value DESC;'
  },
  {
    id: '25',
    name: 'Sales by hour',
    sql: 'SELECT EXTRACT(HOUR FROM order_date) as hour_of_day,\n       COUNT(*) as order_count,\n       AVG(total_amount) as avg_order_value\nFROM orders\nGROUP BY hour_of_day\nORDER BY hour_of_day;'
  },
  {
    id: '26',
    name: 'Customer lifetime value',
    sql: 'WITH customer_orders AS (\n  SELECT customer_id,\n         COUNT(*) as order_count,\n         SUM(total_amount) as total_spent,\n         DATE_PART(\'year\', NOW() - MIN(order_date)) as years_active\n  FROM orders\n  GROUP BY customer_id\n)\nSELECT c.name,\n       co.order_count,\n       co.total_spent,\n       co.years_active,\n       CASE WHEN co.years_active > 0\n         THEN co.total_spent / co.years_active\n         ELSE co.total_spent\n       END as annual_value\nFROM customer_orders co\nJOIN customers c ON co.customer_id = c.id\nORDER BY annual_value DESC;'
  },
  {
    id: '27',
    name: 'Product performance matrix',
    sql: 'WITH product_metrics AS (\n  SELECT p.id,\n         p.product_name,\n         p.category,\n         COUNT(DISTINCT o.id) as order_count,\n         SUM(oi.quantity) as units_sold,\n         AVG(r.rating) as avg_rating,\n         p.stock_quantity\n  FROM products p\n  LEFT JOIN order_items oi ON p.id = oi.product_id\n  LEFT JOIN orders o ON oi.order_id = o.id\n  LEFT JOIN reviews r ON p.id = r.product_id\n  GROUP BY p.id, p.product_name, p.category, p.stock_quantity\n)\nSELECT product_name,\n       category,\n       CASE\n         WHEN units_sold > 100 AND avg_rating >= 4 THEN \'Star\'\n         WHEN units_sold > 100 AND avg_rating < 4 THEN \'High Volume\'\n         WHEN units_sold <= 100 AND avg_rating >= 4 THEN \'High Potential\'\n         ELSE \'Under Performing\'\n       END as performance_category,\n       order_count,\n       units_sold,\n       avg_rating,\n       stock_quantity\nFROM product_metrics\nORDER BY units_sold DESC;'
  },
  {
    id: '28',
    name: 'Abandoned carts',
    sql: 'SELECT c.name as customer_name,\n       p.product_name,\n       ci.quantity,\n       ci.added_date,\n       CURRENT_TIMESTAMP - ci.added_date as time_in_cart\nFROM cart_items ci\nJOIN customers c ON ci.customer_id = c.id\nJOIN products p ON ci.product_id = p.id\nWHERE ci.status = \'abandoned\'\nORDER BY ci.added_date DESC;'
  },
  {
    id: '29',
    name: 'Promotion effectiveness',
    sql: 'SELECT promo_code,\n       COUNT(DISTINCT order_id) as times_used,\n       AVG(discount_amount) as avg_discount,\n       SUM(total_amount) as total_revenue,\n       SUM(discount_amount) as total_discount\nFROM order_promotions\nGROUP BY promo_code\nORDER BY total_discount DESC;'
  },
  {
    id: '30',
    name: 'Customer support tickets',
    sql: 'SELECT status,\n       priority,\n       COUNT(*) as ticket_count,\n       AVG(EXTRACT(EPOCH FROM resolved_at - created_at)/3600) as avg_resolution_hours\nFROM support_tickets\nGROUP BY status, priority\nORDER BY priority, status;'
  }
];

export const mockResults: Record<string, TableData> = {
  '1': {
    columns: ['id', 'name', 'email', 'country'],
    rows: [
      { id: 1, name: 'John Doe', email: 'john@example.com', country: 'USA' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', country: 'Canada' },
      { id: 3, name: 'Alice Brown', email: 'alice@example.com', country: 'UK' }
    ]
  },
  '2': {
    columns: ['order_id', 'customer_name', 'order_date', 'total_amount'],
    rows: [
      { order_id: 1001, customer_name: 'John Doe', order_date: '2024-03-15', total_amount: 299.99 },
      { order_id: 1002, customer_name: 'Jane Smith', order_date: '2024-03-14', total_amount: 149.50 },
      { order_id: 1003, customer_name: 'Alice Brown', order_date: '2024-03-13', total_amount: 499.99 }
    ]
  },
  '3': {
    columns: ['product_name', 'category', 'stock_quantity', 'unit_price'],
    rows: [
      { product_name: 'Laptop Pro', category: 'Electronics', stock_quantity: 45, unit_price: 1299.99 },
      { product_name: 'Wireless Mouse', category: 'Accessories', stock_quantity: 78, unit_price: 29.99 },
      { product_name: 'USB-C Cable', category: 'Accessories', stock_quantity: 92, unit_price: 19.99 }
    ]
  },
  "4": {
    "columns": ["product_name", "total_sales", "revenue"],
    "rows": [
      { "product_name": "Laptop Pro", "total_sales": 120, "revenue": 155999.99 },
      { "product_name": "Wireless Mouse", "total_sales": 200, "revenue": 5999.99 },
      { "product_name": "Mechanical Keyboard", "total_sales": 150, "revenue": 75000.00 },
      { "product_name": "Monitor 4K", "total_sales": 80, "revenue": 160000.00 },
      { "product_name": "Gaming Chair", "total_sales": 60, "revenue": 90000.00 }
    ]
  },
  "5": {
    "columns": ["name", "total_orders", "total_spent"],
    "rows": [
      { "name": "John Doe", "total_orders": 15, "total_spent": 4500.99 },
      { "name": "Jane Smith", "total_orders": 10, "total_spent": 3200.50 },
      { "name": "Alice Brown", "total_orders": 18, "total_spent": 5600.75 },
      { "name": "Bob Johnson", "total_orders": 12, "total_spent": 4200.99 },
      { "name": "Charlie White", "total_orders": 20, "total_spent": 6800.50 }
    ]
  },
  "6": {
    "columns": ["product_name", "category", "last_restock_date"],
    "rows": [
      { "product_name": "Gaming Headset", "category": "Electronics", "last_restock_date": "2024-01-20" },
      { "product_name": "USB Hub", "category": "Accessories", "last_restock_date": "2023-12-15" },
      { "product_name": "Wireless Charger", "category": "Electronics", "last_restock_date": "2024-02-10" },
      { "product_name": "Smartwatch", "category": "Wearables", "last_restock_date": "2024-01-30" },
      { "product_name": "Bluetooth Speaker", "category": "Audio", "last_restock_date": "2024-03-05" }
    ]
  },
  "7": {
    "columns": ["month", "total_orders", "revenue"],
    "rows": [
      { "month": "2024-03", "total_orders": 2000, "revenue": 500000.00 },
      { "month": "2024-02", "total_orders": 1800, "revenue": 450000.00 },
      { "month": "2024-01", "total_orders": 1900, "revenue": 470000.00 },
      { "month": "2023-12", "total_orders": 2100, "revenue": 520000.00 },
      { "month": "2023-11", "total_orders": 1700, "revenue": 430000.00 }
    ]
  },
  "8": {
    "columns": ["country", "customer_count", "avg_lifetime_value"],
    "rows": [
      { "country": "USA", "customer_count": 1000, "avg_lifetime_value": 3500.50 },
      { "country": "Canada", "customer_count": 500, "avg_lifetime_value": 2900.75 },
      { "country": "UK", "customer_count": 700, "avg_lifetime_value": 3100.99 },
      { "country": "Germany", "customer_count": 600, "avg_lifetime_value": 2950.50 },
      { "country": "Australia", "customer_count": 400, "avg_lifetime_value": 2800.25 }
    ]
  },
  "9": {
    "columns": ["category", "product_count", "avg_price"],
    "rows": [
      { "category": "Electronics", "product_count": 50, "avg_price": 750.99 },
      { "category": "Accessories", "product_count": 80, "avg_price": 45.99 },
      { "category": "Wearables", "product_count": 30, "avg_price": 199.99 },
      { "category": "Audio", "product_count": 40, "avg_price": 120.50 },
      { "category": "Gaming", "product_count": 25, "avg_price": 300.75 }
    ]
  },
  "10": {
    "columns": ["order_id", "customer_name", "order_value"],
    "rows": [
      { "order_id": 101, "customer_name": "Emma Wilson", "order_value": 450.75 },
      { "order_id": 102, "customer_name": "Liam Brown", "order_value": 320.00 },
      { "order_id": 103, "customer_name": "Olivia Davis", "order_value": 220.50 },
      { "order_id": 104, "customer_name": "Noah Martinez", "order_value": 510.25 },
      { "order_id": 105, "customer_name": "Sophia Taylor", "order_value": 380.99 },
      { "order_id": 106, "customer_name": "Mason Anderson", "order_value": 275.60 }
    ]
  },
  "11": {
  "columns": ["name", "email", "order_count", "total_spent"],
  "rows": [
    { "name": "Ava Johnson", "email": "ava.j@example.com", "order_count": 8, "total_spent": 2150.45 },
    { "name": "Ethan Clark", "email": "ethan.c@example.com", "order_count": 10, "total_spent": 1899.99 },
    { "name": "Isabella Moore", "email": "isabella.m@example.com", "order_count": 12, "total_spent": 3250.00 },
    { "name": "Logan Wright", "email": "logan.w@example.com", "order_count": 15, "total_spent": 4500.30 },
    { "name": "Mia Green", "email": "mia.g@example.com", "order_count": 7, "total_spent": 1580.70 }
    ]
  },
  "12": {
    "columns": ["product_name", "old_price", "new_price", "change_date"],
    "rows": [
      { "product_name": "Smartphone X", "old_price": 699.99, "new_price": 749.99, "change_date": "2025-03-20" },
      { "product_name": "Wireless Earbuds", "old_price": 89.99, "new_price": 79.99, "change_date": "2025-03-18" },
      { "product_name": "Gaming Laptop", "old_price": 1199.00, "new_price": 1099.00, "change_date": "2025-03-15" },
      { "product_name": "Smartwatch Z", "old_price": 249.99, "new_price": 229.99, "change_date": "2025-03-10" },
      { "product_name": "Bluetooth Speaker", "old_price": 59.99, "new_price": 54.99, "change_date": "2025-03-05" }
    ]
  },
  "13": {
    "columns": ["name", "avg_rating", "review_count"],
    "rows": [
      { "name": "Liam Brown", "avg_rating": 4.7, "review_count": 6 },
      { "name": "Olivia Davis", "avg_rating": 4.9, "review_count": 8 },
      { "name": "Noah Martinez", "avg_rating": 4.3, "review_count": 4 },
      { "name": "Sophia Taylor", "avg_rating": 4.6, "review_count": 5 },
      { "name": "Mason Anderson", "avg_rating": 4.2, "review_count": 3 }
    ]
  },
  "14": {
    "columns": ["shipping_method", "avg_cost", "avg_delivery_time"],
    "rows": [
      { "shipping_method": "Standard", "avg_cost": 5.99, "avg_delivery_time": 5.2 },
      { "shipping_method": "Express", "avg_cost": 12.50, "avg_delivery_time": 2.1 },
      { "shipping_method": "Overnight", "avg_cost": 24.99, "avg_delivery_time": 1.0 }
    ]
  },
  "15": {
    "columns": ["product_name", "return_count", "return_reasons"],
    "rows": [
      { "product_name": "Smartphone X", "return_count": 10, "return_reasons": "Defective, Late Delivery" },
      { "product_name": "Wireless Earbuds", "return_count": 7, "return_reasons": "Sound Issue, Not as Described" },
      { "product_name": "Gaming Laptop", "return_count": 5, "return_reasons": "Too Expensive, Battery Issue" }
    ]
  },
  "16": {
    "columns": ["month", "category", "revenue"],
    "rows": [
      { "month": 1, "category": "Electronics", "revenue": 19500.75 },
      { "month": 1, "category": "Audio", "revenue": 7420.50 },
      { "month": 2, "category": "Wearables", "revenue": 5250.00 },
      { "month": 3, "category": "Gaming", "revenue": 8900.25 },
      { "month": 3, "category": "Accessories", "revenue": 4100.35 }
    ]
  },
  "17": {
    "columns": ["month", "new_customers"],
    "rows": [
      { "month": "2025-01-01", "new_customers": 120 },
      { "month": "2025-02-01", "new_customers": 95 },
      { "month": "2025-03-01", "new_customers": 110 }
    ]
  },
  "18": {
    "columns": ["product1", "product2", "times_bought_together"],
    "rows": [
      { "product1": "Smartphone X", "product2": "Wireless Earbuds", "times_bought_together": 18 },
      { "product1": "Gaming Laptop", "product2": "Gaming Mouse", "times_bought_together": 12 },
      { "product1": "Smartwatch Z", "product2": "Bluetooth Speaker", "times_bought_together": 7 }
    ]
  },
  "19": {
    "columns": ["payment_method", "usage_count", "total_processed"],
    "rows": [
      { "payment_method": "Credit Card", "usage_count": 210, "total_processed": 54500.75 },
      { "payment_method": "PayPal", "usage_count": 135, "total_processed": 31250.00 },
      { "payment_method": "UPI", "usage_count": 89, "total_processed": 16780.20 }
    ]
  },
  "20": {
    "columns": ["name", "order_count", "first_order_date", "last_order_date", "days_as_customer"],
    "rows": [
      { "name": "Ava Johnson", "order_count": 9, "first_order_date": "2022-02-01", "last_order_date": "2025-03-20", "days_as_customer": 1144 },
      { "name": "Logan Wright", "order_count": 12, "first_order_date": "2021-07-15", "last_order_date": "2025-03-18", "days_as_customer": 1343 },
      { "name": "Isabella Moore", "order_count": 6, "first_order_date": "2023-03-10", "last_order_date": "2025-03-22", "days_as_customer": 743 }
    ]
  },
  "21": {
    "columns": ["product", "recommended_product", "pair_count"],
    "rows": [
      { "product": "Smartphone X", "recommended_product": "Smartwatch Z", "pair_count": 14 },
      { "product": "Gaming Laptop", "recommended_product": "Gaming Headset", "pair_count": 10 },
      { "product": "Bluetooth Speaker", "recommended_product": "Wireless Earbuds", "pair_count": 8 }
    ]
  },
  "22": {
    "columns": ["category", "product_count", "order_count", "revenue", "avg_rating"],
    "rows": [
      { "category": "Electronics", "product_count": 12, "order_count": 150, "revenue": 38500.25, "avg_rating": 4.5 },
      { "category": "Accessories", "product_count": 20, "order_count": 200, "revenue": 10200.80, "avg_rating": 4.0 },
      { "category": "Wearables", "product_count": 8, "order_count": 75, "revenue": 15800.60, "avg_rating": 4.6 }
    ]
  },
  "23": {
    "columns": ["segment", "customer_count", "avg_total_spent"],
    "rows": [
      { "segment": "VIP", "customer_count": 5, "avg_total_spent": 6200.50 },
      { "segment": "Regular", "customer_count": 22, "avg_total_spent": 1800.00 },
      { "segment": "New", "customer_count": 15, "avg_total_spent": 420.99 },
      { "segment": "Inactive", "customer_count": 9, "avg_total_spent": 0.0 }
    ]
  },
  "24": {
    "columns": ["category", "product_count", "total_units", "inventory_value"],
    "rows": [
      { "category": "Electronics", "product_count": 15, "total_units": 320, "inventory_value": 78000.00 },
      { "category": "Audio", "product_count": 10, "total_units": 220, "inventory_value": 16800.50 },
      { "category": "Wearables", "product_count": 6, "total_units": 150, "inventory_value": 28750.00 }
    ]
  },
  "25": {
    "columns": ["hour_of_day", "order_count", "avg_order_value"],
    "rows": [
      { "hour_of_day": 9, "order_count": 50, "avg_order_value": 250.75 },
      { "hour_of_day": 13, "order_count": 60, "avg_order_value": 310.25 },
      { "hour_of_day": 17, "order_count": 80, "avg_order_value": 295.00 },
      { "hour_of_day": 21, "order_count": 40, "avg_order_value": 180.60 }
    ]
  },
  "26": {
    "columns": ["name", "order_count", "total_spent", "years_active", "annual_value"],
    "rows": [
      { "name": "Ethan Clark", "order_count": 14, "total_spent": 4700.00, "years_active": 3, "annual_value": 1566.67 },
      { "name": "Mia Green", "order_count": 11, "total_spent": 3525.50, "years_active": 2, "annual_value": 1762.75 },
      { "name": "Olivia Davis", "order_count": 6, "total_spent": 1980.00, "years_active": 1, "annual_value": 1980.00 }
    ]
  },
  "27": {
    "columns": ["product_name", "category", "performance_category", "order_count", "units_sold", "avg_rating", "stock_quantity"],
    "rows": [
      { "product_name": "Gaming Laptop", "category": "Electronics", "performance_category": "Star", "order_count": 70, "units_sold": 120, "avg_rating": 4.8, "stock_quantity": 30 },
      { "product_name": "Smartwatch Z", "category": "Wearables", "performance_category": "High Potential", "order_count": 45, "units_sold": 95, "avg_rating": 4.5, "stock_quantity": 50 },
      { "product_name": "Bluetooth Speaker", "category": "Audio", "performance_category": "High Volume", "order_count": 55, "units_sold": 110, "avg_rating": 3.7, "stock_quantity": 40 }
    ]
  },
  "28": {
    "columns": ["customer_name", "product_name", "quantity", "added_date", "time_in_cart"],
    "rows": [
      { "customer_name": "Liam Brown", "product_name": "Gaming Mouse", "quantity": 1, "added_date": "2025-03-20T10:15:00", "time_in_cart": "2 days 6 hours" },
      { "customer_name": "Ava Johnson", "product_name": "Wireless Earbuds", "quantity": 2, "added_date": "2025-03-18T09:45:00", "time_in_cart": "4 days 8 hours" },
      { "customer_name": "Mia Green", "product_name": "Smartwatch Z", "quantity": 1, "added_date": "2025-03-25T14:20:00", "time_in_cart": "1 day 3 hours" }
    ]
  },
  "29": {
    "columns": ["promo_code", "times_used", "avg_discount", "total_revenue", "total_discount"],
    "rows": [
      { "promo_code": "SAVE20", "times_used": 80, "avg_discount": 20.00, "total_revenue": 21000.00, "total_discount": 1600.00 },
      { "promo_code": "FREESHIP", "times_used": 55, "avg_discount": 5.99, "total_revenue": 9700.00, "total_discount": 329.45 },
      { "promo_code": "WELCOME15", "times_used": 40, "avg_discount": 15.00, "total_revenue": 6400.00, "total_discount": 600.00 }
    ]
  },
  "30": {
    "columns": ["ticket_id", "customer_name", "issue_category", "status", "created_at", "resolved_at", "response_time_hours"],
    "rows": [
      {
        "ticket_id": "TKT1001",
        "customer_name": "Liam Brown",
        "issue_category": "Order Delay",
        "status": "Resolved",
        "created_at": "2025-03-22T10:15:00",
        "resolved_at": "2025-03-22T18:30:00",
        "response_time_hours": 8.25
      },
      {
        "ticket_id": "TKT1002",
        "customer_name": "Ava Johnson",
        "issue_category": "Payment Failure",
        "status": "In Progress",
        "created_at": "2025-03-25T14:45:00",
        "resolved_at": null,
        "response_time_hours": null
      },
      {
        "ticket_id": "TKT1003",
        "customer_name": "Ethan Clark",
        "issue_category": "Return Request",
        "status": "Resolved",
        "created_at": "2025-03-20T09:10:00",
        "resolved_at": "2025-03-21T11:00:00",
        "response_time_hours": 25.83
      }
    ]
  }  
};
