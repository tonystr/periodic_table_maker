import React, { Component } from 'react';
import { Center, apiFetch, Author, Header } from './global.js';
import { Link, Redirect } from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            changed: false,
            username: '',
            password: '',
            auth: null,
            error: false
        };
    }

    handleChange = evt => {
        let obj = { changed: true, error: false };
        obj[evt.target.name] = evt.target.value
        this.setState(obj);
    }

    handleKeyPress = evt => {
        if (evt.key === 'Enter') {
            this.login();
        }
    }

    login = () => {
        if (this.state.username === '' || this.state.password === '') {
            this.setState({ changed: false, error: true });
            console.log('Can\'t log in without a username or password');
            return;
        }

        apiFetch({
            method: 'LOGIN',
            reqtype: 'login',
            username: this.state.username,
            password: this.state.password
        }, res => {
            let resAuth = (res && res.length && res[0].author_id) || null;

            if (resAuth != null) {
                Author.authenticate({
                    username: this.state.username,
                    password: this.state.password,
                    auth: resAuth
                }, () => {
                    this.setState({
                        auth: resAuth,
                        error: false
                    });
                });
            } else {
                this.setState({ changed: false, error: true });
            }
        });
    }

    render() {
        if (this.state.auth) return <Redirect to='dashboard' />;
        return (
            <>
                <Header />
                <Center>
                    <div className='login'>
                        <div className='field'><h1> Log in </h1></div>
                        <div className={'field' + (this.state.error ? ' error' : '')}>
                            Username:
                            <input
                                name='username'
                                onKeyPress={this.handleKeyPress}
                                onChange={this.handleChange}

                            />
                        </div>
                        <div className={'field' + (this.state.error ? ' error' : '')}>
                            Password:
                            <input
                                name='password'
                                onKeyPress={this.handleKeyPress}
                                onChange={this.handleChange}
                                type='password'
                            />
                        </div>
                        <div className='field redirbar'>
                            <div className='button' onClick={this.login}> Log in </div>
                            <div><Link className='signup' to='/signup'> Create new user? </Link></div>
                        </div>
                    </div>
                </Center>
            </>
        );
    }
}
