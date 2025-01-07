const express = require('express');
const app = express();
const { initialize } = require('./config/index')
const baseRouter = require('./api/router/baseRouter')
const { errorHandling } = require('./utils/ErrorHandler');
const { initializeRedis } = require('./config/redisClient');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    console.log(req.body)
    res.send('Hello World!')
})

initialize()
initializeRedis()

app.use('/api',baseRouter);

app.use(errorHandling);

app.use('/',express.static('public'))

const server = app.listen(4005, () => {
    console.log('Example app listening on port 4005!')
})


process.on('SIGINT', () => {
    console.log('SIGINT signal received. Goodbye!')
    server.close(()=>{
        console.log('All request finished and server closed')
        process.exit(0)
    })
})
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received. Goodbye!')
    process.exit(0)
})

