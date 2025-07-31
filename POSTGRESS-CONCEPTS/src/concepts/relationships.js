const db = require("../db/db.js")


async function createPostTable() {
      const createTableQuery = 
      `
      CREATE TABLE IF NOT EXISTS posts(
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
      `

      try {
            const result = await db.query(createTableQuery)
            return result.rows
      } catch (error) {
            console.log("Error while creating post table :", error);
            
      }
}

async function insertNewPost(title, content, userId) {
    const inserPosttQuery = `
    INSERT INTO posts (title, content, user_id ) 
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  try {
      const res = await db.query(inserPosttQuery, [title, content, userId])
      return res.rows
  } catch (error) {
      console.log(`Error while inserting posts->`, error)
      throw error
  }
}

module.exports = {createPostTable, insertNewPost}