import React, { Component } from 'react';
import { Center } from './global.js';
import { Link } from 'react-router-dom';

export default class Login extends Component {
    render() {
        return (
            <Center>
                <div className='login'>
                    <div className='field'> <h1> Log in </h1>   </div>
                    <div className='field'> Username: <input /> </div>
                    <div className='field'> Password: <input /> </div>
                    <div className='field'>
                        <Link to='/signup'> Create new user? </Link>
                    </div>
                </div>
            </Center>
        );
    }
}
