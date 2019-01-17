
const express = require('express');
const app = express();

const mssql = require('mssql');

const config = {
    user: 'root',
    password: 'sykkel8378',
    server: '127.0.0.1',
    port: 3306,
    database: 'periodic_table'
}

app.get('/', (servReq, servRes) => {
    mssql.connect(config, err => {
        console.log('pingo!');
        if (err) return console.error(err);

        const req = new mssql.Request();

        req.query('SELECT * FROM author', (err, res) => {
            if (err) return console.error(err);
            servRes.send(res);
        });
    });
});

const server = app.listen(5000, () => {
    console.log(`Server is running on port ${5000}`);
});
