import React, { Component } from 'react';
import { Author, apiFetch, Center, Header, InputCheckbox, findAncestor, Dropdown as DropdownDefault } from './../global.js';
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
                'Delete',
                'Are you sure?',
                'Do you really want to delete this table?',
                'Fine.'
            ]
        };
    }

    handleDeleteClick = () => {
        if (this.state.deleteClicks >= 2) this.props.delete();
        this.setState({ deleteClicks: this.state.deleteClicks + 1 });
    }

    handleEditClick = evt => {
        this.props.editTable(this.props.table);
        this.props.dismount();
    }

    handleRestoreClick = evt => {
        this.props.table.new = true;
        this.props.table.changed = true;
        this.props.editTable(this.props.table);
        this.props.dismount();
    }

    render() {
        return (
            <DropdownDefault
                onDismount={this.props.dismount}
                style={{
                    position: 'absolute',
                    left: this.props.x + 'px',
                    top:  this.props.y + 'px'
                }}
            >
                <li onClick={this.handleDeleteClick}>
                    {this.state.deletemsgs[this.state.deleteClicks]}
                </li>
                {this.state.deleteClicks < this.state.deletemsgs.length - 1 ?
                    <li onClick={this.handleEditClick}>Edit</li> :
                    <li onClick={this.handleRestoreClick}>Restore</li>
                }
            </DropdownDefault>
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
            changed: props.table.changed || false,
            table: props.table
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

    handleInputPublic = checked => {
        let obj = { changed: true, table: this.state.table };
        obj.table.public = checked;
        this.setState(obj);
    }

    createTable = () => {
        if (!this.state.table.name) return console.log('can\'t create table without a name');

        console.log('table is public: ' + this.state.table.public);

        if (this.state.table.new) {
            apiFetch({
                method: 'ADD',
                reqtype: 'table',
                name: this.state.table.name,
                note: this.state.table.note,
                public: this.state.table.public || false,
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
                public: this.state.table.public || false,
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
                                    <input type='text' defaultValue={this.state.table.name} name='name' onChange={this.handleInput} maxLength='45' />
                                    <input type='text' defaultValue={this.state.table.note} name='note' onChange={this.handleInput} maxLength='256' />

                                    <InputCheckbox onChange={this.handleInputPublic} checked={this.state.table.public} />
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

        if (Author.checkAuth()) this.loadTables();

        document.addEventListener('click', this.cancelDropdown);
    }

    componentDidMount = () => {
        Author.checkUsername(name => {
            this.setState({ username: name });
        });
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
        this.setState({ create: { new: true, public: false } });
    }

    editTable = (table = { new: true, public: false }) => {
        this.setState({ create: table });
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
        this.setState({ dropdown: drop });
    }

    destroyDropdown = () => {
        this.setState({ dropdown: null });
    }

    render() {
        if (!Author.checkAuth()) return <Redirect to='login' />;

        return (
            <div
                className='dashapp'
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
