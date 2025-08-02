const express = require('express')
const authorRoutes= require('./routes/authorRoutes.js')
const bookRoutes= require('./routes/bookRoutes.js')

const app = express()

app.use(express.json())

const PORT = process.env.PORT ||3000

app.use("/api/author", authorRoutes )
app.use("/api/book", bookRoutes )

app.listen(PORT, ()=>{
      console.log("Server is now running on port:",PORT);
      
})