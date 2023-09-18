const db = require("../database/db");

exports.getUsers = async () => {
  try {
    const query = "SELECT * FROM gl_store.users";
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    throw new Error("Error getting users");
  }
};

exports.getUserByID = async (username) => {
  try {
    console.log(username);
    const query = "SELECT * FROM gl_store.users WHERE username = $1";
    const values = [username];
    const result = await db.query(query, values);
    console.log(result.rows);
    return result.rows;
  } catch (error) {
    throw new Error("Error getting user");
  }
};

exports.createUser = async (email, username, password) => {
  try {
    const query =
      "INSERT INTO gl_store.users (email, username, password) VALUES ($1, $2, $3);";
    const values = [email, username, password];
    await db.query(query, values);
    console.log("User created successfully");
  } catch (error) {
    throw new Error("Error creating user");
  }
};

exports.updateUser = async (user_id, email, password) => {
  try {
    const query =
      "UPDATE gl_store.users SET username = $2, password = $3 WHERE user_id = $1;";
    const values = [user_id, email, password];
    await db.query(query, values);
    console.log("User Updated Successfully");
  } catch (error) {
    throw new Error("Error updating user");
  }
};
