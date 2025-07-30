//where clause
//limit offset


const db = require('../db/db.js')


//WHERE CLAUSE

async function getFilteredUser(field) {
      const query = `SELECT * FROM users WHERE ${field} = $1`;
      try {
            const res = await db.query(query);
            return res.rows;
      } catch (error) {
            console.log("Error: get user error", error);
      }
}


async function getSortedUser(column, order = "ASC") {
      const sortQuery = `
      SELECT * FROM users
      ORDER BY ${column} ${order}
      `

      try {
            const res = await db.query(sortQuery)
            return res.rows
      } catch (error) {

            console.log("Error: filter user error", error);
      }
}

async function getPaginatedUser(limit, offset) {
           const paginationQuery =  `
           SELECT * FROM users
           LIMIT $1 OFFSET $2
           `

           try {
            const result = await db.query(paginationQuery,[limit, offset])
            return result.rows
           } catch (error) {
            console.log("Error while pagination",error);
            
           }
      }

module.exports = { getFilteredUser, getSortedUser, getPaginatedUser }