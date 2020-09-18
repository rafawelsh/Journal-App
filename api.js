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
            }
        });
});

apiRouter.post('/journal', (req, res, next) => {
    const title = req.body.journal.title;
    const body = req.body.journal.body;
    if(!title || !body) {
        return res.sendStatus(400);
    }
    db.run(`INSERT INTO Journal (title, body) VALUES ($title, $body)`,
    {
        $title: title,
        $body: body
    }), function(err) {
        if(err) {
            next(err)
        } else {
            console.log('Sucessful!')
        }
    }
})
module.exports = apiRouter;