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
            db.query(createTableQuery)
            console.log(`User table cretaed successfully`);

      } catch (error) {
            console.log(error, `Error while cretaing users table`);
            throw error
      }
}

module.exports = { createUserTable }