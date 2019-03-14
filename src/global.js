import React, { Component, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

function Center(props) {
    return (
        <div className='padjust'>
            <div className='padding' />
            {props.children}
            <div className='padding' />
        </div>
    );
}

function Dropdown(props) {

    useEffect(() => {

        document.addEventListener('click', dismount);

        return () => {
            document.removeEventListener('click', dismount);
        }
    });

    const dismount = evt => {
        if (evt.target.classList.contains('dropdown') || findAncestor(evt.target, 'dropdown')) return;

        if (!props.onDismount) return console.error('Dropdown onDismount not set');
        props.onDismount();
        document.removeEventListener('click', dismount);
    }

    return (
        <ul
            className={'dropdown' + (props.className ? ' ' + props.className : '')}
            style={props.style}
        >
            {props.children}
        </ul>
    );
}

function ColorPreview(props) {
    return (
        <div className='colorpreview'>
            <div style={{ backgroundColor: props.colors[0] }} className='main' />
            <div style={{ backgroundColor: props.colors[1] }} className='secondary' />
        </div>
    );
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
            ],
            selectingTheme: false,
            selectedTheme: Author.checkTheme()
        };
    }

    clickLogout = () => {
        Author.logout();
        this.setState({ redirect: 'login' });
    }

    clickDelete = () => {
        if (this.state.deleteCounter >= this.state.deleteMessages.length - 2) {
            Author.delete(() => {
                this.setState({ redirect: 'signup' });
            });
        } else {
            const count = this.state.deleteCounter + 1;
            this.setState({ deleteCounter: count });

            setTimeout(() => {
                if (this.state.deleteCounter === count) {
                    this.setState({ deleteCounter: 0 });
                }
            }, 4600);
        }
    }

    clickTheme = evt => {
        evt.stopPropagation();
        evt.preventDefault();
        evt.nativeEvent.stopImmediatePropagation();
        this.setState({ selectingTheme: !this.state.selectingTheme });
    }

    clickThemeOption = evt => {
        const index = Number(evt.target.getAttribute('index'));
        this.setState({ selectedTheme: index });
        this.props.changeTheme(index);
    }

    renderThemeOptions = () => {
        const list = [];
        for (let i = 0; i < this.props.themes.length; i++) {
            list.push(
                <li
                    key={i}
                    index={i}
                    onClick={this.clickThemeOption}
                    className={this.state.selectedTheme === i ? 'selected' : ''}
                >
                    {this.props.themes[i].name}
                    <ColorPreview colors={this.props.themes[i].colorPreview} />
                </li>
            );
        }
        console.log(list);
        return list;
    }

    render() {
        if (this.state.redirect) return <Redirect to={this.state.redirect} />
        return (
            this.state.selectingTheme ? (
                <Dropdown
                    onDismount={this.props.onDismount}
                    className='usercontrolls choose'
                >
                    {this.renderThemeOptions()}
                </Dropdown>
            ) : (
                <Dropdown
                    onDismount={this.props.onDismount}
                    className='usercontrolls'
                >
                    <Link to='dashboard'><li>Dashboard</li></Link>
                    <li onClick={this.clickTheme}>Change theme</li>
                    <li onClick={this.clickLogout}>Log out</li>
                    <li onClick={this.clickDelete}>
                        {this.state.deleteMessages[this.state.deleteCounter]}
                    </li>
                </Dropdown>
            )
        );
    }
}

function Header(props) {

    const [username, setUsername] = useState('');
    const [pagename, setPagename] = useState('');
    const [userDropdown, setUserDropdown] = useState(false);

    const themes = [{
        name: 'Royal',
        filename: 'royal.css',
        colorPreview: [ '#ddc239', '#331F26' ]
    }, {
        name: 'One Dark',
        filename: 'one_dark.css',
        colorPreview: [ '#61dafb', '#282C34' ]
    }, {
        name: 'Dracula',
        filename: 'dracula.css',
        colorPreview: [ '#ff79c6', '#282a36' ]
    }, {
        name: 'Black',
        filename: 'black.css',
        colorPreview: [ '#c3cfd2', '#06080a' ]
    }, {
        name: 'White',
        filename: 'white.css',
        colorPreview: [ '#4a5266', '#ffffff' ]
    }, {
        name: 'Beach',
        filename: 'beach.css',
        colorPreview: [ 'palevioletred', 'papayawhip' ]
    }];

    useEffect(() => {
        Author.checkUsername(name => {
            if (name) setUsername(name);
        });
    });

    useEffect(() => {
        changeTheme(Author.checkTheme());
    }, []);

    useEffect(() => {
        let pname = '';

        switch (window.location.pathname.replace(/^\//i, '')) {
            case 'home': case '': pname = 'Home'; break;
            case 'login': pname = 'Log in'; break;
            case 'signup': pname = 'Sign up'; break;
            case 'dashboard': pname = 'Dashboard'; break;
            case 'tablemissing': pname = 'Table not found'; break;
            case 'table':
                const match = window.location.search.match(/t=(\d+)/i);
                if (!match || !match[1]) break;
                apiFetch({
                    method: 'GET',
                    reqtype: 'table',
                    tableID: match[1]
                }, res => {
                    if (res && res[0]) {
                        setPagename(
                            res[0].name +
                            (res[0].author_id !== Author.checkAuth() ? ' [read-only]' : '')
                        );
                    }
                });
                break;
            default: pname = ''; break;
        }

        if (pname) setPagename(pname);
    }, [window.location.pathname]);

    const handleUserClick = () => {
        setUserDropdown(!userDropdown);
    }

    const userInfoDismount = () => {
        setUserDropdown(false);
    }

    const changeTheme = index => {
        const link = document.querySelector('head>link.theme') ||
            document.createElement('link');

        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('class', 'theme');
        link.setAttribute('href', index !== 0 ? `${process.env.PUBLIC_URL}/themes/${themes[index].filename}` : '');

        Author.setTheme(index);
        // this.setState({ selectedTheme: index });
        document.head.appendChild(link);
    }

    return (
        <header>
            <section className='left'>
                <Link to='/' className='dash'><i className="fas fa-home"></i> Periodic Table Builder  </Link>
                {props.left}
            </section>

            <section className='center'>
                <div className='pagename'>{pagename}</div>
                {props.center}
            </section>

            <section className='right'>
                {props.right}
                {username && (
                    <>
                        <div
                            className='user'
                            onClick={handleUserClick}
                        >
                            {username}
                        </div>
                        {userDropdown && (
                            <UserInfo
                                changeTheme={changeTheme}
                                onDismount={userInfoDismount}
                                themes={themes}
                            />
                        )}
                    </>
                )}
            </section>
        </header>
    );
}

function InputCheckbox(props) {

    const [checked, setChecked] = useState(props.checked || false);

    const handleClick = evt => {
        const checkbox = evt.target.classList.contains('checkbox') ?
            evt.target :
            findAncestor(evt.target, 'checkbox');

        const chk = checkbox && !checkbox.classList.contains('checked');
        setChecked(chk);
        props.onChange(chk);
    }

    return (
        <div
            className={'checkbox' + (checked ? ' checked' : '')}
            onClick={handleClick}
        >
            <i className="fa fa-check" aria-hidden="true"></i>
        </div>
    );
}

function findAncestor(el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

async function apiFetch(data, callBack) {
    await fetch(`http://${window.location.hostname}:443`, {
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
    } else callback(Author.username);
}

function authorLogout() {
    document.cookie = 'auth=0;';
    Author.auth = 0;
    Author.username = '';
    Author.password = '';
}

function authorDelete(callback) {
    apiFetch({
        method: 'DELETE',
        reqtype: 'author',
        authorID: Author.checkAuth()
    }, res => {
        Author.logout();
        callback(res);
    });
}

function checkTheme() {
    if (!Author.themeIndex) {
        const match = document.cookie.match(/theme\s*=\s*(\d+)/i);
        if (match) {
            Author.themeIndex = Number(match[1]);
        }
    }

    return Author.themeIndex;
}

function setTheme(themeIndex) {
    Author.themeIndex = themeIndex;
    let date = new Date();
    date.setDate(date.getDate() + 7);
    document.cookie = `theme=${themeIndex}; expires=${date}; path=/`;
}

const Author = {
    username: '',
    password: '',
    auth: 0,
    themeIndex: 0,
    authenticate: authenticate,
    setTheme: setTheme,
    checkAuth: checkAuth,
    checkTheme: checkTheme,
    checkUsername: checkUsername,
    logout: authorLogout,
    delete: authorDelete
}

export { Center, apiFetch, Author, Header, InputCheckbox, Dropdown, findAncestor };
