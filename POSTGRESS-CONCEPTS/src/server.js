
const {createUserTable, insertUser, fetchAllUsers, updateUserEmail, deleteUserInfo}= require('./concepts/basic_query.js')

//testing basic queries

async function testBasicQueries() {
      try {
            await createUserTable()

            //insert users
            / await insertUser('Anish', 'Anishbarke@gmail.com')
            /* await insertUser('Manish', 'manish@gmail.com') */
            await insertUser('visnish', 'vinish@gmail.com')
            await insertUser('karan', 'karan@gmail.com') 
            /* await insertUser('Ganesh', 'Ganesh@gmail.com') */

          const allUser =  await fetchAllUsers()
           console.log(allUser);
           
           updateUserEmail("Ganesh", "gandu@gmail.com")

           const DeletedUserdata =await deleteUserInfo("Anish")
           console.log(DeletedUserdata.rows); */
           
      } catch (error) {
            console.log("Error:", error);
            
      }
}

async function testAllQueries(paras) {
      await testBasicQueries()
}

testAllQueries()