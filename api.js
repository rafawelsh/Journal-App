const { title } = require('errorhandler');
const express = require('express');
const apiRouter = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

//parameter works for identifying the id for PUT and DELETE requests
apiRouter.param('/:journalId', (req, res, next, journalId) => {
    db.get(`SELECT * FROM Journal WHERE Journal.id = $journalId`,
    {
        $journalId: journalId
    }, (err, journal) => {
        if (err) {
            next(err)
        } else if (journal) {
            req.journal = journal;
            next();
        } else {
            res.sendStatus(404);
        }
    });
});


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
    console.log('POST WORKING')
    
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
                next(err)
            } else {
                res.status(201).json({ message: 'Journal Created Successfully' });
            }
        });
});

apiRouter.put('/journals/:journalId', (req, res, next) => {
    console.log('PUT WORKING')

    const title = req.body.title;
    const body = req.body.body;
    if (!title || !body) {
        return res.sendStatus(400);
    }
    db.run(`UPDATE Journal SET title = $title, body = $body WHERE Journal.id = $journalId`,
    {
        $title: title,
        $body: body,
        $journalId: req.params.journalId
    }, (err) => {
        if (err) {
            next(err)
        } else {
            res.status(200).json({ message: 'Journal Updated Successfully' });
        }
    });
});

apiRouter.delete('/journals/:journalId', (req, res) => {
    console.log('DELETE WORKING')

    db.run(`DELETE FROM Journal WHERE Journal.id = $journalId`, {
        $journalId: req.params.journalId
    }, (err)=> {
        if(err) {
            next(err)
        } else {
            res.status(204).json({ message: 'Journal Deleted Successfully' });
        }
    });
});

module.exports = apiRouter;