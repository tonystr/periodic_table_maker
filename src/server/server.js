
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 5487;

const config = {
    user: 'foo',
    password: 'bar',
    host: '127.0.0.1',
    port: 3306,
    database: 'periodic_table'
}

app.get('/', (servReq, servRes) => {
    const con = mysql.createConnection(config);

    con.connect(err => {
        if (err) return console.error(err);

        con.query('SELECT * FROM author', (err, res) => {
            if (err) return console.error(err);
            servRes.send(res);
        });
    });
});

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
