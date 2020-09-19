const { title } = require('errorhandler');
const express = require('express');
const apiRouter = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

apiRouter.get('/journals', (req, res) => {
    db.all(`SELECT * FROM Journal`,
        (err, journals) => {
            if (err) {
                res.sendStatus(404);
            } else {
                res.status(200).json({ journals })
                console.log('GET WORKING')
            }
        });
});

apiRouter.post('/journals', (req, res, next) => {
    console.log('API WORKING')
    console.log(body, req.body)
    const title = req.body.title;
    const body = req.body.body;
    if (!title || !body) {
        return res.sendStatus(400);
    }
    db.run(`INSERT INTO Journal (title, body) VALUES ($title, $body)`,
        {
            $title: title,
            $body: body
        }, function (err) {
            if (err) {
                CONSOLE.LOG(err)
                next(err)
            } else {
                res.status(201).json({ journals })
            }
        })
})

module.exports = apiRouter;