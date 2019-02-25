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
            this.signup();
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
                        <div className='field'>
                            <div>
                                <h1> Sign up </h1>
                                <div className='warning'>(do not use your normal passwords; this website is not secure) </div>
                            </div>
                        </div>
                        <div className='field'>
                            <div>Username</div>
                            <
                                input
                                name='username'
                                onKeyPress={this.handleKeyPress}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className='field'>
                            <div>Password</div>
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
            </>
        );
    }
}
