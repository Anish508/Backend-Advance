const db = require('../db/db.js')

async function countPostsByUsers(params) {
      const postCountQuery = `
      SELECT users.username , COUNT(posts.user_id) as post_count
      FROM users
      LEFT JOIN posts ON users.id = posts.user_id
      GROUP BY users.username
      `

      try {
            const res = await db.query(postCountQuery)
            return  res.rows
      } catch (error) {
            console.log("Error while aggregation->", error);
            
      }
}
async function countAvgByUsers(params) {
      const postAvgCountQuery = `
      SELECT avg(post_count) as avg_posts
      FROM (
      SELECT count(posts.id) as post_count
      FROM users
      LEFT JOIN posts ON users.id = posts.user_id
      GROUP BY users.id
      )as user_per_count
      `

      try {
            const res = await db.query(postAvgCountQuery)
            return  res.rows
      } catch (error) {
            console.log("Error while avegraging posts->", error);
            
      }
}

module.exports ={countPostsByUsers,countAvgByUsers}