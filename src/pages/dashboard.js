import React, { Component } from 'react';
import { Author, apiFetch, Center, Header } from './global.js';
import { Redirect, Link } from 'react-router-dom'

class Welcome extends Component {
    render() {
        return (
            <div className='welcome'>
                <h3>Welcome, {this.props.user}</h3>
            </div>
        );
    }
}

class Dropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deleteClicks: 0,
            deletemsgs: [
                'delete',
                'are you sure?',
                'do you really want to delete this table?',
                'fine.'
            ]
        };
    }

    handleDeleteClick = () => {
        if (this.state.deleteClicks >= 2) this.props.delete();
        this.setState({
            deleteClicks: this.state.deleteClicks + 1
        });
    }

    handleEditClick = evt => {
        this.props.editTable(this.props.table);
        this.props.dismount();
    }

    render() {
        return (
            <div
                className='dropdown'
                style={{
                    left: this.props.x + 'px',
                    top:  this.props.y + 'px'
                }}
            >
                <div
                    className='field'
                    onClick={this.handleDeleteClick}
                >
                    {this.state.deletemsgs[this.state.deleteClicks]}
                </div>
                <div className='field' onClick={this.handleEditClick}>edit</div>
            </div>
        );
    }
}

class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deleted: false,
            table: props.table
        }

        document.addEventListener('contextmenu', evt => {
            if (evt.target.classList.contains('table') ||
                findAncestor(evt.target, 'table')) {
                evt.preventDefault();
                this.createDropdown(evt);
            }
        }, false);
    }

    createDropdown = (evt) => {
        this.props.createDropdown(
            <Dropdown
                x={evt.pageX}
                y={evt.pageY}
                delete={this.delete}
                editTable={this.props.editTable}
                dismount={this.props.destroyDropdown}
                table={this.props.table}
            />
        );
    }

    handleClickOptions = evt => {
        evt.stopPropagation();
        evt.preventDefault();
        evt.nativeEvent.stopImmediatePropagation();
        this.createDropdown(evt);
    }

    delete = () => {
        apiFetch({
            method: 'DELETE',
            reqtype: 'table',
            tableID: this.state.table.table_id
        }, () => {
            this.setState({ deleted: true });
        });
    }

    render() {
        if (this.state.deleted) return null;
        return (
            <Link to={`table?t=${this.props.table.table_id}`}>
                <div className='table'>
                    <div className='name'>{this.props.table.name}</div>
                    <div className='note'>{this.props.table.note}</div>
                    <div className='options' onClick={this.handleClickOptions}><i className="fas fa-cog" /></div>
                </div>
            </Link>
        );
    }
}

class NewTable extends Component {

    handleClick = () => {
        this.props.onClick();
    }

    render() {
        return (
            <div
                className='table last'
                onClick={this.handleClick}
            >
                <div className='name'>+ Create new table</div>
            </div>
        );
    }
}

class TableCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dismounting: false,
            changed: false,
            table: props.table
            //name: '',
            //desc: ''
        }
    }

    dismount = () => {
        this.props.onDismount();
    }

    handleClick = evt => {
        evt.stopPropagation();
        evt.nativeEvent.stopImmediatePropagation();
    }

    handleInput = evt => {
        let obj = { changed: true, table: this.state.table };
        obj.table[evt.target.name] = evt.target.value;
        this.setState(obj);
    }

    createTable = () => {
        if (!this.state.table.name) return console.log('can\'t create table without a name');

        if (this.state.table.new) {
            apiFetch({
                method: 'ADD',
                reqtype: 'table',
                name: this.state.table.name,
                note: this.state.table.note,
                authorID: Author.checkAuth()
            }, () => {
                this.dismount();
            });
        } else {
            apiFetch({
                method: 'UPDATE',
                reqtype: 'table',
                name: this.state.table.name,
                note: this.state.table.note,
                tableID: this.state.table.table_id
                // authorID: Author.checkAuth()
            }, () => {
                this.dismount();
            });
        }
    }

    render() {
        return (
            <div
                className={'inspector' + (this.state.dismounting ? ' fadeout' : '')}
                onClick={this.dismount}
            >
                <Center>
                    <div className='card-holder'>
                        <div
                            className={'card' + (this.props.dismounting ? ' fadeout' : '')}
                            onClick={this.handleClick}
                        >
                            <div className='button-x' onClick={this.dismount} />
                            <div className='data-input'>
                                <ul>
                                    <li>Table name</li>
                                    <li>Description</li>
                                    <li>Public</li>
                                </ul>
                                <form className='datalist' method='POST'>
                                    <input type='text' defaultValue={this.state.table.name} name='name' onChange={this.handleInput} maxlength='45' />
                                    <input type='text' defaultValue={this.state.table.note} name='note' onChange={this.handleInput} maxlength='256' />
                                    <div class='checkbox' defaultValue={this.state.table.public} name='public' onChange={this.handleInput} />
                                </form>
                            </div>
                            <div className='bottom-bar'>
                                <div
                                    className={'button add' + (this.state.changed ? '' : ' hidden')}
                                    onClick={this.createTable}
                                >
                                    {this.state.table.new ? 'Create' : 'Update'}
                                </div>
                            </div>
                        </div>
                    </div>
                </Center>
            </div>
        );
    }
}

function findAncestor(el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            tables: [],
            create: null,
            username: '',
            dropdown: null
        };

        Author.checkUsername(name => {
            this.setState({ username: name });
        });

        if (Author.checkAuth()) this.loadTables();

        document.addEventListener('click', this.cancelDropdown);
    }

    loadTables = () => {
        apiFetch({
            method: 'GET',
            reqtype: 'tables',
            authorID: Author.checkAuth()
        }, res => {
            this.setState({ tables: res });
        })
    }

    onClickNewTable = () => {
        this.setState({ create: { new: true } });
        console.log(this.state.create);
    }

    editTable = (table = { new: true }) => {
        this.setState({ create: table });
        console.log(this.state.create);
    }

    renderTables = () => {

        const list = [];
        for (const table of this.state.tables) {
            list.push(
                <Table
                    key={table.table_id}
                    table={table}
                    createDropdown={this.createDropdown}
                    destroyDropdown={this.destroyDropdown}
                    editTable={this.editTable}
                />
            );
        }
        list.push(<NewTable key='+' onClick={this.onClickNewTable} />);
        return list;
    }

    onInspectEscape = () => {
        this.setState({ create: null });
        if (Author.checkAuth()) this.loadTables();
    }

    createDropdown = drop => {
        this.setState({
            dropdown: drop
        });
    }

    destroyDropdown = () => {
        this.setState({ dropdown: null });
    }

    cancelDropdown = evt => {
        if (this.state.dropdown &&
            !evt.target.classList.contains('dropdown') &&
            !findAncestor(evt.target, 'dropdown')
        ) this.destroyDropdown();
    }

    render() {
        if (!Author.checkAuth()) return <Redirect to='login' />;

        return (
            <div
                className='dashapp'
                onClick={this.cancelDropdown}
            >
                <Header />
                <div className={'dashboard' + (this.state.create ? ' blur' : '')}>
                    {this.state.username !== '' && <Welcome user={this.state.username} />}
                    <h1>Your tables</h1>
                    <div className='tablesection'>
                        {this.renderTables()}
                    </div>
                </div>
                {this.state.create && <TableCreator
                    blur={this.onBlur}
                    onDismount={this.onInspectEscape}
                    table={this.state.create}
                />}
                {this.state.dropdown}
            </div>
        );
    }
}
