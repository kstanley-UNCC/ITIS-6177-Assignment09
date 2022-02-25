const express = require('express');
const axios = require('axios');
const { query, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

app.use(
    '/',
    query('keyword')
        .isString().trim().isLength({max: 255})
            .withMessage('keyword may not exceed 255 characters'),
    (req, res) => {
        const keyword = req.query.keyword;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        axios.post('https://ivzeui0q5l.execute-api.us-east-1.amazonaws.com/default/assignment09', {keyword})
            .then(result => res.send(result.data))
            .catch(err => res.status(500).send(`Error: ${err}`));
    }
);

// Catch-all for non-existent routes
app.get('*', function (req, res) {
    res.statusCode = 404;
    res.send();
});

app.listen(3000, function () {
    const host = this.address().address;
    const port = this.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
