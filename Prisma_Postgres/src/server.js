const express = require('express')
const authorRoutes= require('./routes/authorRoutes.js')
const bookRoutes= require('./routes/bookRoutes.js')
const promClient = require('prom-client')

const app = express()

app.use(express.json())

const PORT = process.env.PORT ||3000

const register = new promClient.Registry()
promClient.collectDefaultMetrics({register})

const httpRequestsCounter = new promClient.Counter({
      name: "http_requests_total",
      help:"Total number of http requests",
      labelNames: ["method", "route", "status"]
})

register.registerMetric(httpRequestsCounter)

//middleware to track api request
app.use((req,res,next)=>{
      res.on('finish',()=>{
            httpRequestsCounter.inc({
                  method: req.method,
                  route: req.path,
                  status: res.statusCode
            })
      })
      next()
})

const httpRequestDuration = new promClient.Histogram({
    name: "http_request_duration_seconds",
    help: "Duration of HTTP requests in seconds",
    labelNames: ["method", "route", "status"],
    buckets: [0.1, 0.3, 0.5, 1, 1.5, 2, 5] // Customized bucket sizes
});

register.registerMetric(httpRequestDuration);

app.use((req, res, next) => {
    const startEpoch = Date.now();
    
    res.on('finish', () => {
        const durationInSeconds = (Date.now() - startEpoch) / 1000;

        httpRequestDuration
            .labels(req.method, req.path, res.statusCode.toString())
            .observe(durationInSeconds);
    });

    next();
});



//EXPOSE the /metrics endpoint for prometheus

app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.send(await register.metrics()); 
  } catch (err) {
    console.error('Error in /metrics:', err);
    res.status(500).send(err.message);
  }
});

app.use("/api/author", authorRoutes )
app.use("/api/book", bookRoutes )



app.listen(PORT, ()=>{
      console.log("Server is now running on port:",PORT);
      
})