
const { createUserTable, insertUser, fetchAllUsers, updateUserEmail, deleteUserInfo } = require('./concepts/basic_query.js')
const { getFilteredUser, getSortedUser, getPaginatedUser } = require('./concepts/filtering_sorting.js');
const { createPostTable, insertNewPost } = require('./concepts/relationships.js');
const { getUsersWitPost } = require('./concepts/joins_pg.js');
const { countPostsByUsers , countAvgByUsers} = require('./concepts/aggregations.js');
//testing basic queries

async function testBasicQueries() {
      //await insertUser('xyx', 'xyz@gmail.com')
      //await insertUser('Ayx', 'Ayz@gmail.com')
      /* try {
            await createUserTable()

            //insert users
            await insertUser('Anish', 'Anishbarke@gmail.com')
             await insertUser('Manish', 'manish@gmail.com') 
            await insertUser('visnish', 'vinish@gmail.com')
            await insertUser('karan', 'karan@gmail.com') 
       await insertUser('Ganesh', 'Ganesh@gmail.com') 

          const allUser =  await fetchAllUsers()
           console.log(allUser);
           
           updateUserEmail("Ganesh", "gandu@gmail.com")

           const DeletedUserdata =await deleteUserInfo("Anish")
           console.log(DeletedUserdata.rows); 
           
      } catch (error) {
            console.log("Error:", error);
            
      } */
}

async function testFilteredSortQueries() {
      try {
            //get the username whos name start with A

            const getAllFilteredRecords = await getFilteredUser("username LIKE 'A%'")
            console.log(getAllFilteredRecords);

            const sortedUsers = await getSortedUser('created_at', 'ASC')
            console.log(sortedUsers);

            const paginatedUser = await getPaginatedUser(2, 1)
            console.log(paginatedUser);

      } catch (error) {
            console.log("Error while filtering data:", error);

      }
}

async function testRelationshipQueries() {
      try {
            //await createPostTable()
            //console.log("post table created successully");

            /*  const insertedPosts = await insertNewPost('leraning pg', "pg is most powerfull db", 18)
             console.log("post inseted successfully:",
               insertedPosts); */


            /* 
            */
           const relatedUser = await getUsersWitPost()
            console.log("Joined result:",relatedUser );
            
            const totalCount = await countPostsByUsers()
            console.log("Total posts by users:", totalCount);
            const totalAvgCount = await countAvgByUsers()
            console.log("Total posts by users:", totalAvgCount);
      } catch (error) {
            console.log("Error: post testRelationshipQueries  error ->", error);



      }


}


async function testAllQueries() {
      await testBasicQueries()
      await testFilteredSortQueries()
      await testRelationshipQueries()
}

testAllQueries()