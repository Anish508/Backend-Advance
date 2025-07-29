const db = require('../db/db')

async function createUserTable() {
      const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  )
  `;

      try {
            await db.query(createTableQuery)
            console.log(`User table cretaed successfully`);

      } catch (error) {
            console.log(error, `Error while cretaing users table`);
            throw error
      }
}

async function insertUser(username, email) {
  const insertQuery = `
    INSERT INTO users (username, email) 
    VALUES ($1, $2)
    RETURNING *
  `;

  try {
    const res = await db.query(insertQuery, [username, email]);
    console.log(`User inserted successfully`, res.rows[0]);
    return res.rows[0];
  } catch (error) {
    console.log(error, "Error while inserting user");
    throw error; // Optional: rethrow to handle it at higher level
  }
}

async function fetchAllUsers() {
      const getAllUserQuery = `
      SELECT * FROM users
      `

      try {
            const res = await db.query(getAllUserQuery)
            console.log("All users details:")
            return res.rows
      } catch (error) {
            console.log("Error while fetching record", error);
            throw error
      }
}

async function updateUserEmail(username , newEmail) {
      const updateUserQuery = `
      UPDATE users SET 
      email = $2
      WHERE username = $1
      RETURNING *
      `

      try {
            const res = await db.query(updateUserQuery, [username, newEmail])
            if(res.rows.length > 0){
                  console.log(`user updated successfully`, res.rows[0]);
                  return res.rows[0]
            }else{
                  console.log("No user to update the email");
                  
            }
      } catch (error) {
            console.log("Error while updating record",error );
            throw error
      }
}

async function deleteUserInfo(username) {
      const deleteUserQuery =`
      DELETE FROM users
      WHERE username = $1
      RETURNING *
      `
      try {
            const res = await db.query(deleteUserQuery, [username])
            
                  console.log(`user deleted successfully`, res.rows[0]);
                  return res.rows[0]
           
            
      } catch (error) {
            console.log("Error while deleting user record", error);
            return error
      }
}
module.exports = { createUserTable, insertUser, fetchAllUsers , updateUserEmail, deleteUserInfo}