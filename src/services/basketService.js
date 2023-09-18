const db = require("../database/db");

exports.getBaskets = async () => {
  try {
    const query = "SELECT * FROM gl_store.baskets;";
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    throw new Error("Error getting users");
  }
};

exports.getBasketByUser = async (user_id) => {
  try {
    const query = "SELECT * FROM gl_store.baskets WHERE user_id = $1;";
    const values = [user_id];
    const result = await db.query(query, values);
    return result.rows;
  } catch (error) {
    throw new Error("Error getting basket");
  }
};

exports.createBasket = async (user_id) => {
  try {
    console.log(user_id);
    const query = "INSERT INTO gl_store.baskets (user_id) VALUES ($1);";
    const values = [user_id];
    await db.query(query, values);
    console.log("Bakset created successfully");
  } catch (error) {
    throw new Error("Error creating basket");
  }
};

exports.addToBasket = async (product, user_id) => {
  console.log(product, user_id);
  try {
    const query = `UPDATE gl_store.baskets SET products = array_append(products, $1) WHERE user_id = $2;`;
    const values = [product, user_id];
    await db.query(query, values);
    console.log("item added successfully");
  } catch (error) {
    throw new Error("Error adding item");
  }
};

exports.removeItem = async (user_id, product) => {
  try {
    const query = `UPDATE gl_store.baskets
        SET products = (
          SELECT array_cat(products[1:array_position(products, $2)-1], products[array_position(products, $2)+1:])
          WHERE array_position(products, $2) IS NOT NULL
          LIMIT 1
        )
        WHERE user_id = $1;
        `;
    const values = [user_id, product];
    await db.query(query, values);
    console.log("item removed successfully");
  } catch (error) {
    throw new Error("Error removing item");
  }
};

exports.clear = async (user_id) => {
  console.log(user_id);
  try {
    const query = `UPDATE gl_store.baskets SET products = '{}'::jsonb[] WHERE user_id = $1;`;
    const values = [user_id];
    await db.query(query, values);
    console.log("Basket cleared successfully");
  } catch (error) {
    throw new Error("Error clearing basket");
  }
};
