
const mysql = require('mysql');
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./defaultElements.json').toString());

console.log('laoded data:', data);

const config = {
    user: 'foo',
    password: 'bar',
    host: '127.0.0.1',
    port: 3306,
    database: 'periodic_table'
}

const con = mysql.createConnection(config);

const tableID = 9;

con.connect(err => {
    if (err) return console.error(err);

    let types = [
        'alkali',
        'alkaline',
        'lanthanoid',
        'actinoid',
        'transition',
        'poor',
        'metalloid',
        'nonmetal',
        'noble'
    ];

    const def = `("$NAME", "$SYMBOL", $ANUM, $TABLE_ID), `;
    let sql = `INSERT INTO element (name, symbol, atom_number, table_id) VALUES`;

    //const def = '($ANUM, "$NAME", "$SYMBOL", $ATOMIC_MASS, $ELECTRONEGATIVITY, $TYPE_ID), ';
    //let sql = `INSERT INTO default_element (atom_number, name, symbol, atomic_mass, electronegativity, type_id) VALUES `;

    for (let elm of data) {
        sql += def
            .replace('$NAME',     elm.name)
            .replace('$SYMBOL',   elm.symbol)
            .replace('$ANUM',     elm.anum)
            .replace('$TABLE_ID', tableID);
    }

    con.query(
        sql.slice(0, -2),
        (err, res) => {
            console.log('got res from inital author check:', res);
            if (err) console.error(err);
        }
    );
});
