const db = require("../database/db");

exports.getOrdersByID = async (user_id) => {
  try {
    const query = "SELECT * FROM gl_store.orders WHERE user_id = $1;";
    const values = [user_id];
    const result = await db.query(query, values);
    return result.rows;
  } catch (error) {
    throw new Error("Error getting orders");
  }
};

exports.newOrder = async (
  user_id,
  order_id,
  products,
  totalPrice,
  date,
  address
) => {
  try {
    const query = `INSERT INTO gl_store.orders(user_id, order_id, products, totalprice, date, address) VALUES ($1, $2, $3, $4, $5, $6);`;
    const values = [user_id, order_id, products, totalPrice, date, address];
    await db.query(query, values);
    console.log("order created successfully");
  } catch (error) {
    throw new Error("error creating order");
  }
};
