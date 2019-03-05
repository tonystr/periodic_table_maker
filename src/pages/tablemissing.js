import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from './global.js';

export default function TableMissing(props) {
    return (
        <>
            <Header />
            <div className='warning table-error'>
                <div className='ohno'>Oh no</div>
                Looks like there either isn't a table here, or it's set to private.&nbsp;
                <Link to='login'>Log in</Link> or ask the table owner to make it public.
            </div>
        </>
    );
}
