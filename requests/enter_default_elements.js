
const mysql = require('mysql');
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('../data/default_elements.json').toString());

console.log('laoded data:', data);

const config = {
    user: 'foo',
    password: 'bar',
    host: '127.0.0.1',
    port: 3306,
    database: 'periodic_table'
}

const con = mysql.createConnection(config);

// 1	alkali metal
// 2	alkaline earth metal
// 3	lanthanoid
// 4	actinoid
// 5	transition metal
// 6	post-transition metal
// 7	metalloid
// 8	other nonmetal
// 9	noble gass

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

    const def = '($ANUM, "$NAME", "$SYMBOL", $ATOMIC_MASS, $ELECTRONEGATIVITY, $TYPE_ID), ';
    let sql = `INSERT INTO default_element (atom_number, name, symbol, atomic_mass, electronegativity, type_id) VALUES `;

    for (let elm of data) {
        sql += def
            .replace('$ANUM',               elm.anum)
            .replace('$NAME',               elm.name)
            .replace('$SYMBOL',             elm.symbol)
            .replace('$ATOMIC_MASS',        elm.mass)
            .replace('$ELECTRONEGATIVITY',  elm.elneg || null)
            .replace('$TYPE_ID',            elm.type ? types.findIndex(type => type === elm.type.toLowerCase()) + 1 : null);
    }

    con.query(
        sql.slice(0, -2),
        (err, res) => {
            console.log('got res from inital author check:', res);
            if (err) console.error(err);
        }
    );
});
