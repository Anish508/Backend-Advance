
const {createUserTable}= require('./concepts/basic_query.js')

//testing basic queries

async function testBasicQueries() {
      try {
            await createUserTable()
      } catch (error) {
            console.log("Error:", error);
            
      }
}

async function testAllQueries(paras) {
      await testBasicQueries()
}

testAllQueries()