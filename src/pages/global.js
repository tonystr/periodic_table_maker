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

class Dropdown extends Component {
    componentDidMount = () => {
        document.addEventListener('click', this.dismount);
    }

    componentWillUnMount = () => {
        document.removeEventListener('click', this.dismount);
    }

    dismount = evt => {
        if (evt.target.classList.contains('dropdown') || findAncestor(evt.target, 'dropdown')) return;

        if (!this.props.onDismount) return console.error('Dropdown onDismount not set');
        this.props.onDismount();
        document.removeEventListener('click', this.dismount);
    }

    render() {
        return (
            <ul
                className={'dropdown' + (this.props.className ? ' ' + this.props.className : '')}
                style={this.props.style}
            >
                {this.props.children}
            </ul>
        );
    }
}

class ColorPreview extends Component {
    render() {
        return (
            <div className='colorpreview'>
                <div style={{ backgroundColor: this.props.colors[0] }} className='main' />
                <div style={{ backgroundColor: this.props.colors[1] }} className='secondary' />
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
            ],
            selectingTheme: false,
            selectedTheme: 0,
            themes: [{
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
            }]
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

    changeTheme = evt => {
        const index = Number(evt.target.getAttribute('index'));
        const link = document.querySelector('head>link.theme') ||
            document.createElement('link');

        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('class', 'theme');
        link.setAttribute('href', `${process.env.PUBLIC_URL}/themes/${this.state.themes[index].filename}`);

        this.setState({ selectedTheme: index });
        document.head.appendChild(link);
    }

    renderThemeOptions = () => {
        const list = [];
        for (let i = 0; i < this.state.themes.length; i++) {
            list.push(
                <li
                    key={i}
                    index={i}
                    onClick={this.changeTheme}
                    className={this.state.selectedTheme === i ? 'selected' : ''}
                >
                    {this.state.themes[i].name}
                    <ColorPreview colors={this.state.themes[i].colorPreview} />
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
                    <li onClick={this.clickLogout}>Log out</li>
                    <li onClick={this.clickTheme}>Change theme</li>
                    <li onClick={this.clickDelete}>
                        {this.state.deleteMessages[this.state.deleteCounter]}
                    </li>
                </Dropdown>
            )
        );
    }
}

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            pagename: '',
            userDropdown: false
        };
    }

    componentDidMount = () => {
        Author.checkUsername(name => {
            if (name) this.setState({ username: name });
        });

        let pagename = '';

        switch (window.location.pathname.replace(/^\//i, '')) {
            case 'login': pagename = 'Log in'; break;
            case 'signup': pagename = 'Sign up'; break;
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

        if (pagename) this.setState({ pagename: pagename });
    }

    componentWillUnmount = () => {
        this.setState = () => { return; };
    }

    handleUserClick = () => {
        this.setState({ userDropdown: !this.state.userDropdown });
    }

    userInfoDismount = () => {
        this.setState({ userDropdown: false });
    }

    render() {
        return (
            <header>
                <section className='left'>
                    <Link to='dashboard' className='dash'> Periodic Table Builder  </Link>
                    {this.props.left}
                </section>

                <section className='center'>
                    <div className='pagename'>{this.state.pagename}</div>
                    {this.props.center}
                </section>

                <section className='right'>
                    {this.props.right}
                    {this.state.username && (
                        <>
                            <div
                                className='user'
                                onClick={this.handleUserClick}
                            >
                                {this.state.username}
                            </div>
                            {this.state.userDropdown && <UserInfo onDismount={this.userInfoDismount} />}
                        </>
                    )}
                </section>
            </header>
        );
    }
}

class InputCheckbox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: props.checked || false,
            onChange: props.onChange
        };
    }

    handleClick = evt => {
        let checkbox = evt.target.classList.contains('checkbox') ?
            evt.target :
            findAncestor(evt.target, 'checkbox');
        this.setState({
            checked: checkbox && !checkbox.classList.contains('checked')
        });
        this.state.onChange(this.state.checked);
    }

    render() {
        return (
            <div
                className={'checkbox' + (this.state.checked ? ' checked' : '')}
                onClick={this.handleClick}
            >
                <i className="fa fa-check" aria-hidden="true"></i>
            </div>
        );
    }
}

function findAncestor(el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
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

export { Center, apiFetch, Author, Header, InputCheckbox, Dropdown, findAncestor };
