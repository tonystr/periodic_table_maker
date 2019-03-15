import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header, apiFetch } from './../global.js';

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
            <div id='home'>
                <div className='above'>
                    <h1>Welcome to Periodic Table Builder</h1>
                    <div className='undertitle'>Build your very own periodic table of elements</div>
                </div>
                <div className='below'>
                    <div className='content'>
                        <div className='left'>
                            <div className='dashboard'>
                                <div className='title'>Public tables created by our users</div>
                                <div className='tablesection'>
                                    {renderTables()}
                                    <div className='pad' />
                                </div>
                            </div>
                        </div>
                        <div className='right'>
                            <div className='message'>
                                <Link to='login'>Log in</Link> or <Link to='signup'>sign up</Link> to make your own periodic table of elements
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
