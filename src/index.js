const express = require('express');
const app = express();
const { initialize } = require('./config/index')
const baseRouter = require('./api/router/baseRouter')
const { errorHandling } = require('./utils/ErrorHandler')

app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello World!')
})

initialize()

app.use('/api',baseRouter);

app.use(errorHandling);

app.listen(4005, () => {
    console.log('Example app listening on port 4005!')
})

