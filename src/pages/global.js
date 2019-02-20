import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class Center extends Component {
    render() {
        return (
            <div className='padjust'>
                <div className='padding' />
                {this.props.children}
                <div className='padding' />
            </div>
        );
    }
}

class UserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            deleteCounter: 0,
            deleteMessages: [
                'Delete account',
                'Are you sure?',
                'Do you really wish to delete this account?',
                'Deleting...'
            ]
        };
    }

    handleLogoutClick = () => {
        Author.logout();
        this.setState({ redirect: 'login' });
    }

    handleDeleteClick = () => {
        if (this.state.deleteCounter >= this.state.deleteMessages.length - 1) {
            Author.delete();
        } else this.setState({
            deleteCounter: this.state.deleteCounter + 1
        });
    }

    render() {
        if (this.state.redirect) return <Redirect to={this.state.redirect} />
        return (
            <div className='usercontrolls'>
                <div className='content'>
                    <div onClick={this.handleLogoutClick}>Log out</div>
                    <div onClick={this.handleDeleteClick}>
                        {this.state.deleteMessages[this.state.deleteCounter]}
                    </div>
                </div>
            </div>
        );
    }
}

class Header extends Component {
    constructor(props) {
        super(props);

        let pagename = '';

        console.log('window.location.pathname:', window.location.pathname);

        switch (window.location.pathname.replace(/^\//i, '')) {
            case 'login': pagename = 'Log In'; break;
            case 'signup': pagename = 'Sign Up'; break;
            case 'dashboard': pagename = 'Dashboard'; break;
            case 'table':
                const match = window.location.search.match(/t=(\d+)/i);
                if (!match || !match[1]) break;
                apiFetch({
                    method: 'GET',
                    reqtype: 'table',
                    tableID: match[1]
                }, res => {
                    const resName = (res && res[0] && res[0].name) || null;
                    if (resName) {
                        this.setState({ pagename: resName });
                    }
                });
                break;
            default: pagename = ''; break;
        }

        this.state = {
            username: '',
            pagename: pagename,
            expand: false
        };

        Author.checkUsername(name => {
            if (name) this.setState({ username: name });
        });
    }

    render() {
        return (
            <header>
                <Link to='dashboard' className='dash'> Periodic Table Builder </Link>
                <div className='center'>
                    <div className='pagename'>{this.state.pagename}</div>
                </div>
                {this.state.username && (
                    <div
                        className='user'
                        onClick={() => this.setState({ expand: true })}
                    >
                        {this.state.username}
                        <UserInfo />
                    </div>
                )}
            </header>
        );
    }
}

async function apiFetch(data, callBack) {
    await fetch('http://localhost:5487', {
        headers: {
            accepts: 'application/json',
            data: JSON.stringify(data)
        },
    })
    .then(res => {
        res.json().then(json => callBack(json));

    }).catch(e => console.log(e));
}

function authenticate(options, callback) {
    Author.auth = options.auth;
    let date = new Date();
    date.setDate(date.getDate() + 7);
    document.cookie = `auth=${options.auth}; expires=${date}; path=/`;

    callback();
}

function checkAuth() {
    if (!Author.auth) {
        const match = document.cookie.match(/auth\s*=\s*(\d+)/i);
        if (match) {
            Author.auth = Number(match[1]);
        }
    }

    return Author.auth;
}

async function checkUsername(callback) {
    if (!Author.username) {
        await apiFetch({
            method: 'GET',
            reqtype: 'username',
            authorID: checkAuth()
        }, res => {
            Author.username = (res && res[0] && res[0].name) || '';
            callback(Author.username);
        });
    } else setTimeout(
        () => callback(Author.username),
        40,
    );
}

function authorLogout() {
    document.cookie = 'auth=0;';
    Author.auth = 0;
    Author.username = '';
    Author.password = '';
    console.log('logged out, auth is now:', Author.checkAuth());
}

function authorDelete() {
    // TODO delete author

    apiFetch({
        method: 'DELETE',
        reqtype: 'author',
        authorID: Author.checkAuth()
    }, res => {
        console.log('response from delete request');
    });
}

const Author = {
    username: '',
    password: '',
    auth: 0,
    authenticate: authenticate,
    checkAuth: checkAuth,
    checkUsername: checkUsername,
    logout: authorLogout,
    delete: authorDelete
}

export { Center, apiFetch, Author, Header };
