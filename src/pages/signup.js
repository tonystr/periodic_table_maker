import React, { Component } from 'react';
import { Center, apiFetch, Author } from './global.js';
import { Link, Redirect } from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            changed: false,
            username: '',
            password: '',
            auth: null
        };
    }

    handleChange = evt => {
        let obj = { changed: true };
        obj[evt.target.name] = evt.target.value
        this.setState(obj);
    }

    handleKeyPress = evt => {
        if (evt.key === 'Enter') {
            this.login();
        }
    }

    signup = () => {
        if (this.state.username === '' || this.state.password === '') {
            console.log('Can\'t sign up without a username or password');
            return;
        }

        apiFetch({
            method: 'SIGNUP',
            reqtype: 'signup',
            username: this.state.username,
            password: this.state.password
        }, res => {
            console.log('callback from signup:', res);
            if (res && res[0]) {
                Author.username = this.state.username;
                Author.password = this.state.password;
                Author.authenticate(res[0].author_id, () => {
                    this.setState({ auth: res[0].author_id });
                });
            }
        });
    }

    render() {
        if (this.state.auth) return <Redirect to='dashboard' />;
        return (
            <Center>
                <div className='login'>
                    <div className='field'>
                        <h1> Sign up </h1>
                        <div>(do not use your normal passwords, this page is not secure) </div>
                    </div>
                    <div className='field'>
                        Username:
                        <
                            input
                            name='username'
                            onKeyPress={this.handleKeyPress}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className='field'>
                        Password:
                        <
                            input
                            name='password'
                            onKeyPress={this.handleKeyPress}
                            onChange={this.handleChange}
                            type='password'
                        />
                    </div>
                    <div className='field redirbar'>
                        <div className='button' onClick={this.signup}> Create </div>
                        <div><Link to='/login'> Log in instead? </Link></div>
                    </div>
                </div>
            </Center>
        );
    }
}
