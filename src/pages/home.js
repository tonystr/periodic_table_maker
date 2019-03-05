import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header, apiFetch } from './global.js';

export default function TableMissing(props) {

    const [tables, setTables] = useState([]);

    useEffect(() => {
        apiFetch({
            method: 'GET',
            reqtype: 'public_tables'
        }, res => {
            setTables(res);
        })
    }, []);

    const renderTables = () => {

        const list = [];
        for (const table of tables) {
            list.push(
                <Link key={table.table_id} to={`table?t=${table.table_id}`}>
                    <div className='table'>
                        <div className='top'>
                            <div className='name'>{table.name}</div>
                            <div className='author'>by {table.author_name}</div>
                        </div>
                        <div className='note'>{table.note}</div>
                    </div>
                </Link>
            );
        }
        // list.push(<NewTable key='+' onClick={this.onClickNewTable} />);
        return list;
    }

    return (
        <>
            <Header />
            <div className='home'>
                <div className={'dashboard'}>
                    <h1>Public tables</h1>
                    <div className='tablesection'>
                        {renderTables()}
                    </div>
                </div>
            </div>
        </>
    );
}
