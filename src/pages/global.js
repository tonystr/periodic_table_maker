import React, { Component } from 'react';

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

function authenticate(auth, callback) {
    console.log(`this in authenticate func: ${this}`);
    author.authenticated = true;
    author.auth = auth;
    document.cookie = `auth=${auth}`;

    callback();
}

const author = {
    authenticated: false,
    username: '',
    password: '',
    auth: 0,
    authenticate: authenticate
}

export { Center, apiFetch, author };
