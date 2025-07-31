const db = require('../db/db.js')


async function getUsersWitPost() {
      const getUSerWithPost = `
      SELECT users.id, users.username, posts.title 
      FROM users
      INNER JOIN posts ON users.id = posts.user_id
      `

      try {
            const res = await db.query(getUSerWithPost)   
            return res.rows  
      } catch (error) {
            console.log("Error while joining->",error);
            
      }
}

module.exports= {getUsersWitPost}