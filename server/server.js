
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 5487;

const config = {
    user: 'foo',
    password: 'bar',
    host: '127.0.0.1',
    port: 3306,
    database: 'periodic_table'
}

const con = mysql.createConnection(config);

app.use(cors());

con.connect(err => {
    if (err) return console.error(err);

    app.get('/', (servReq, servRes) => {
        console.log(`got request: ${servReq.headers.data}`);
        const data = JSON.parse(servReq.headers.data);

        if (data && data.reqtype) {
            switch (data.method) {

                case 'LOGIN':
                    console.log('sending login SELECT request');
                    con.query(
                        `SELECT author_id FROM author WHERE name="${data.username}" AND password="${data.password}"`,
                        (err, res) => {

                        if (err) return console.error(err);
                        console.log('responding with:', res);
                        servRes.send(res);
                    });
                    break;

                case 'SIGNUP':
                    console.log('sending login SIGNUP request');

                    con.query(`SELECT author_id FROM author WHERE name="${data.username}"`, (err, res) => {
                            console.log('got res from inital author check:', res);
                            if (err) return console.error(err);

                            if (res && res[0]) {
                                res = { error: 'name taken' };
                                console.log('responding with:', res);
                                servRes.send(res);
                            } else {
                                con.query(
                                    `INSERT INTO author (name, password)
                                    VALUES ("${data.username}", "${data.password}")`,
                                    (err, res) => {

                                    if (err) return console.error(err);
                                    console.log('got res:', res);

                                    con.query(
                                        `SELECT author_id FROM author WHERE name="${data.username}" AND password="${data.password}"`,
                                        (err, res) => {

                                        if (err) return console.error(err);
                                        console.log('responding with:', res);
                                        servRes.send(res);
                                    });
                                });
                            }
                    });
                    break;

                case 'GET':
                    switch (data.reqtype) {
                        case 'element':
                            if (data.anom === undefined) {

                                console.log('anom is undefined');
                                servRes.send({error: 'proper data not set'});
                            } else {
                                con.query(
                                    `SELECT * FROM element WHERE table_id=${data.table} AND atom_number=${data.anom}`,
                                    (err, res) => {

                                    if (err) return console.error(err);
                                    console.log('responding with:', res);
                                    servRes.send(res);
                                });
                            }
                            break;

                        case 'table_elements':
                            con.query(
                                `SELECT atom_number, symbol FROM element WHERE table_id=${data.table}`,
                                (err, res) => {

                                if (err) return console.error(err);
                                console.log('responding with:', res);
                                servRes.send(res);
                            });
                            break;

                        case 'tables':
                            con.query(
                                `SELECT * FROM \`table\` WHERE author_id=${data.authorID}`,
                                (err, res) => {

                                if (err) return console.error(err);
                                console.log('responding with:', res);
                                servRes.send(res);
                            });
                            break;

                        case 'table':
                            con.query(
                                `SELECT * FROM \`table\` WHERE table_id=${data.tableID}`,
                                (err, res) => {

                                if (err) return console.error(err);
                                console.log('responding with:', res);
                                servRes.send(res);
                            });
                            break;

                        case 'username':
                            console.log('rquesting username...');
                            con.query(
                                `SELECT name FROM author WHERE author_id=${data.authorID}`,
                                (err, res) => {

                                if (err) return console.error(err);
                                console.log('responding with:', res);
                                servRes.send(res);
                            });
                            break;
                    }
                    break;

                case 'UPDATE':
                    switch (data.reqtype) {
                        case 'element':
                            if (!data.name || !data.symbol || !data.anom) {
                                servRes.send({error: 'proper data not set'});
                                return;
                            }
                            // UPDATE `periodic_table`.`element` SET `name` = 'Hydrogenium' WHERE (`element_id` = '1');
                            con.query(
                                `UPDATE element SET
                                name="${data.name}", symbol="${data.symbol}"
                                WHERE table_id=${data.table} AND atom_number=${data.anom}`,
                                (err, res) => {

                                if (err) return console.error(err);
                                console.log('responding with:', res);
                                servRes.send(res);
                            });
                            break;

                        case 'table':
                            con.query(
                                `UPDATE \`table\` SET
                                name="${data.name}", note="${data.note}"
                                WHERE table_id=${data.tableID}`,
                                (err, res) => {

                                if (err) return console.error(err);
                                console.log('responding with:', res);
                                servRes.send(res);
                            });
                            break;
                    }
                    break;

                case 'ADD':
                    if (data.reqtype === 'element') {
                        if (!data.name || !data.symbol || !data.anom) {
                            const res = { error: 'proper data not set' };
                            servRes.send(res);
                            console.log('responding with:', res);
                            return;
                        }
                        con.query(
                            `INSERT INTO element (name, symbol, atom_number, atomic_mass, electron_negativity, table_id, type_id)
                            VALUES ("${data.name}", "${data.symbol}", ${data.anom}, 1, 1, ${data.table}, 1)`,
                            (err, res) => {

                            if (err) return console.error(err);
                            console.log('responding with:', res);
                            servRes.send(res);
                        });
                    } else if (data.reqtype === 'table') {
                        con.query(
                            `INSERT INTO \`table\` (name, author_id, note)
                            VALUES ("${data.name}", ${data.authorID}, "${data.note}")`,
                            (err, res) => {

                            if (err) return console.error(err);
                            console.log('responding with:', res);
                            servRes.send(res);
                        });
                    }
                    //servRes.send('something');
                    break;

                case 'DELETE':
                    switch (data.reqtype) {
                        case 'element':
                            if (!data.anom) {
                                const res = { error: 'proper data not set' };
                                servRes.send(res);
                                console.log('responding with:', res);
                                return;
                            }
                            con.query(
                                `DELETE FROM element WHERE atom_number=${data.anom}`,
                                (err, res) => {
                                    if (err) return console.error(err);
                                    console.log('responding with:', res);
                                    servRes.send(res);
                                }
                            );
                            break;

                        case 'table':
                            if (!data.tableID) {
                                const res = { error: 'tableID not set' };
                                servRes.send(res);
                                console.log('responding with:', res);
                                return;
                            }
                            con.query(
                                `DELETE FROM  element  WHERE table_id=${data.tableID};`,
                                (err, res) => {
                                    if (err) return console.error(err);

                                    con.query(
                                        `DELETE FROM \`table\` WHERE table_id=${data.tableID};`,
                                        (err, res) => {
                                            if (err) return console.error(err);
                                            console.log('responding with:', res);
                                            servRes.send(res);
                                        }
                                    );
                                }
                            );
                            break;
                    }
                    break;

                default:
                    servRes.send({
                        error: 'Specified data method does not exist'
                    });
                    console.log('responding with: error: \'Specified data method does not exist\'');
                    break;
            }
        }
    });
});

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
