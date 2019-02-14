
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
                case 'GET':
                    console.log('table reqtype: ' + data.reqtype);
                    if (data.reqtype === 'element') {
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
                    } else if (data.reqtype === 'table_elements') {
                        console.log('got here');
                        con.query(
                            `SELECT atom_number, symbol FROM element WHERE table_id=${data.table}`,
                            (err, res) => {

                            if (err) return console.error(err);
                            console.log('responding with:', res);
                            servRes.send(res);
                        });
                    }
                    break;

                case 'UPDATE':
                    if (!data.name || !data.symbol || !data.anom) {
                        servRes.send({error: 'proper data not set'});
                        return;
                    }
                    // UPDATE `periodic_table`.`element` SET `name` = 'Hydrogenium' WHERE (`element_id` = '1');
                    console.log(`UPDATE element SET
                        name="${data.name}", symbol="${data.symbol}"
                        WHERE table_id=${data.table} AND atom_number=${data.anom}`);
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

                case 'ADD':
                    if (!data.name || !data.symbol || !data.anom) {
                        const res = { error: 'proper data not set' };
                        servRes.send(res);
                        console.log('responding with:', res);
                        return;
                    }
                    con.query(
                        `INSERT INTO element (name, symbol, atom_number, atomic_mass, electron_negativity, table_id, type_id)
                        VALUES ("${data.name}", "${data.symbol}", ${data.anom}, 1, 1, 1, 1)`,
                        (err, res) => {

                        if (err) return console.error(err);
                        console.log('responding with:', res);
                        servRes.send(res);
                    });
                    //servRes.send('something');
                    break;

                case 'DELETE':
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
