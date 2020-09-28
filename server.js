const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const path = require('path');

const apiRouter = require('./api');


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(errorhandler());

app.use('/api', apiRouter);

if(process.env.NODE_ENV==='production') {
    app.use(express.static('journal-app/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'journal-app', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});

module.exports = app;