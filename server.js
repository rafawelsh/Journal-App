const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorhandler = require('errorhandler');


const apiRouter = require('./api');


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(errorhandler());

app.use('/api', apiRouter);

const port = 5000;

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});

module.exports = app;