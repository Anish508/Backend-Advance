const express = require('express')
const authorRoutes= require('./routes/authorRoutes.js')
const bookRoutes= require('./routes/bookRoutes.js')
const promClient = require('prom-client')

const app = express()

app.use(express.json())

const PORT = process.env.PORT ||3000

const register = new promClient.Registry()
promClient.collectDefaultMetrics({register})

const httpRequests = new promClient.Counter({
      name: "http_requests_total",
      help:"Total number of http requests",
      labelNames: ["method", "route", "status"]
})

register.registerMetric(httpRequests)

//EXPOSE the /metrics endpoint for prometheus

app.get('/metrics', async(req, res)=>{
      res.set('Content-Type', register.contentType)
      res.send(await register.metrics)
})
app.use("/api/author", authorRoutes )
app.use("/api/book", bookRoutes )



app.listen(PORT, ()=>{
      console.log("Server is now running on port:",PORT);
      
})