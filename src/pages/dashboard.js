import React, { Component } from 'react';
import { author, apiFetch } from './global.js';
import { Redirect } from 'react-router-dom'

class Welcome extends Component {
    render() {
        return (
            <div className='welcome'>
                <h2>Welcome, {this.props.user}</h2>
            </div>
        );
    }
}

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            tables: []
        };

        if (author.auth) this.loadTables();
    }

    loadTables = () => {
        apiFetch({
            method: 'GET',
            reqtype: 'tables',
            authorID: author.auth
        }, res => {
            this.setState({ tables: res });
        })
    }

    renderTables = () => {

        const list = [];
        for (const table of this.state.tables) {
            list.push(
                <div className='table'>
                    <div className='name'>{table.name}</div>
                    <div className='note'>{table.note}</div>
                </div>
            );
        }
        return list;
    }

    render() {

        if (!author.auth) return <Redirect to='login' />;

        return (
            <div className='dashboard'>
                <Welcome user={author.username} />
                <div className='tablesection'>
                    <h1>Your tables</h1>
                    {this.state.tables.length ? this.renderTables() : false}
                </div>
            </div>
        );
    }
}
