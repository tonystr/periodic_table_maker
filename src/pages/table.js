import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Center, apiFetch, Author, Header } from './global.js';

class Element extends Component {
    constructor(props) {
        super(props);
        this.state = {
            click: props.click || false,
            elm: props.elm || false,
            isUndef: this.props.elm && this.props.elm.isDefault
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        this.props.onSelect(this.state.elm);
    }

    render() {
        return (
            <div
                symbol={this.state.elm ? this.state.elm.symbol : undefined}
                className={
                    'element' +
                    (!this.state.elm ? ' hidden' : '') +
                    (this.state.click ? ' click' : '') +
                    (this.state.isUndef ? ' undef' : '') +
                    (this.state.elm.slidedown ? ' slidedown' : '')
                }
                onClick={this.handleClick}
            >
                {this.state.elm ? this.state.elm.symbol : undefined}
            </div>
        );
    }
}

class Ptable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            elements: [],
            width: 18,
            tableID: props.tableID,
            reload: this.loadTable,
            def: {
                isDefault: true,
                name: '',
                symbol: '',
                atom_number: undefined
            }
        };

        this.loadTable();
    }

    loadTable = () => {
        if (this.state.loaded) {
            this.setState({
                loaded: false
            });
        }
        apiFetch({
            method: 'GET',
            reqtype: 'table_elements',
            table: this.state.tableID
        }, res => {
            this.setState({
                loaded: true,
                elements: res
            });
        });
    }

    renderSpecialGroup = (num, width) => {
        const diff = 32;
        const start = 57 + num * diff;
        const def = this.state.def;
        const list = [];

        for (let i = 0; i < 3; i++) {
            list.push(
                <Element
                    onSelect={undefined}
                    key={start - i - 1}
                    elm={undefined}
                />
            );
        }

        for (let anum = start; anum < start + 15; anum++) {
            const elm = this.state.elements.find(elm => elm.atom_number === anum) ||
                        Object.assign({}, def, { atom_number: anum, symbol: anum });
            list.push(
                <Element
                    onSelect={this.props.onInspect}
                    key={anum}
                    elm={!elm.hidden && elm}
                />
            );
        }

        return <div className='group' key={num}>{list}</div>;
    }

    renderGroup = (index, width) => {
        const list = [];
        const start = index * this.state.width;
        const def = this.state.def;

        for (let i = 0; i < width; i++) {
            let key = start + i;
            let anum = key + 1 -
                (key > 1  && 16) -
                (key > 20 && 10) -
                (key > 38 && 10) +
                (key > 91 && 14) +
                (key > 110 && 14);

            let elm = def;

            if ((key > 0  && key < 17) ||
                (key > 19 && key < 30) ||
                (key > 37 && key < 48)) {

                elm = Object.assign({}, def, { atom_number: anum, hidden: true });
            } else if (key === 92) {
                elm = Object.assign({}, def, { symbol: '57-71', slidedown: true });
            } else if (key === 110) {
                elm = Object.assign({}, def, { symbol: '89-103', slidedown: true });
            } else {
                elm = (this.state.elements.find(elm => elm.atom_number === anum) ||
                    Object.assign({}, def, { atom_number: anum, symbol: anum }));
            }

            if (elm !== undefined) {

                if (index === 0) key = "string" + key;

                list.push(
                    <Element
                        onSelect={this.props.onInspect}
                        key={key}
                        elm={!elm.hidden && elm}
                    />
                );
            }
        }

        return (<div className='group' key={index}>{list}</div>);
    }

    render() {

        if (!this.state.tableID) return <Redirect to='dashboard' />;

        const width = 18;
        const height = 7;
        const list = [];

        if (this.state.loaded) {
            for (let i = 0; i < height; i++) {
                list.push(this.renderGroup(i, width));
            }
            list.push(
                <div className='special-groups' key={8}>
                    {this.renderSpecialGroup(0)}
                    {this.renderSpecialGroup(1)}
                </div>
            );
        }

        return <div className='ptable'>{list}</div>;
    }
}

function XButton(props) {
    return <div className='button-x' onClick={props.onClick} />;
}

function ElementInput(props) {
    return (
        <input
            type='text'
            defaultValue={props.elm[props.name]}
            name={props.name}
            onChange={props.onChange}
            onKeyPress={props.onKeyPress}
            maxLength={props.maxLength || 45}
        />
    );
}

class ElementCard extends Component {
    constructor(props) {
        super(props);
        const undef = !!props.elm.isDefault;
        this.state = {
            dismount: this.props.inspectorDismount,
            loaded: undef,
            isUndef: undef,
            method: undef ? 'ADD' : 'not sure',
            changed: false,
            elm: {
                symbol: undef ? '' : null,
                anom: props.elm.atom_number,
                name: undef ? '' : null,
                amass: null,
                eneg: null
            },
            tableID: props.tableID
        }
        if (!undef) this.fetchElement(this.props.elm.atom_number);
    }

    inputOnChange = (e) => {
        let elm = this.state.elm;
        elm[e.target.name] = e.target.value;
        this.setState({ elm: elm, changed: true });
    }

    handleDismount = () => {
        // this.dismount(); is done by parent
        this.state.dismount();
    }

    dismount = () => {
        if (this.state.changed) {
            // update SQL
            const elm = this.state.elm;
            apiFetch({
                method: this.state.method,
                reqtype: 'element',
                table: this.state.tableID,
                symbol: elm.symbol,
                anom: elm.anom,
                name: elm.name,
                amass: elm.amass,
                eneg: elm.eneg
            }, res => {
                console.log(res);
            });
        } else {
            console.log('Did not apiFetch, because elm has not changed');
        }
    }

    fetchElement = (anom) => {
        apiFetch({
            method: 'GET',
            reqtype: 'element',
            table: this.state.tableID,
            anom: anom
        }, res => {
            if (res.length) {
                const elm = res[0];
                this.setState({
                    loaded: true,
                    method: 'UPDATE',
                    elm: {
                        symbol: elm.symbol,
                        anom: anom,
                        name: elm.name
                    }
                });
            } else {
                this.setState({
                    loaded: true,
                    method: 'ADD',
                    elm: {
                        symbol: '',
                        anom: anom,
                        name: ''
                    }
                });
            }
        });
    }

    changeElement = (key, value) => {
        this.elm[key] = value
    }

    handleClick = (evt) => {
        evt.stopPropagation();
        evt.nativeEvent.stopImmediatePropagation();
    }

    delete = () => {
        if (this.state.method === 'ADD') {
            this.setState({ method: 'don\'t touch it, you idiot' });
            return this.handleDismount();
        }

        apiFetch({
            method: 'DELETE',
            reqtype: 'element',
            table: this.state.tableID,
            anom: this.state.elm.anom
        }, () => {
            this.handleDismount();
        });
    }

    handleKeyPress = evt => {
        if (evt.key === 'Enter') this.handleDismount();
    }

    render() {
        return (
            <Center>
                <div className='card-holder'>
                    <div
                        className={'card' + (this.props.dismounting ? ' fadeout' : '')}
                        onClick={this.handleClick}
                    >
                        <XButton onClick={this.handleDismount} />
                        <div className='data-input'>
                            <ul>
                                <li>Symbol:</li>
                                <li>Atomic Number:</li>
                                <li>Name:</li>
                            </ul>
                            {this.state.loaded && (
                                <form className='datalist' method='POST'>
                                    <ElementInput name='symbol' elm={this.state.elm} onChange={this.inputOnChange} className='elm-symbol' maxLength={4} />
                                    <ElementInput name='anom'   elm={this.state.elm} onChange={this.inputOnChange} className='elm-anom' />
                                    <ElementInput name='name'   elm={this.state.elm} onChange={this.inputOnChange} className='elm-name' onKeyPress={this.handleKeyPress} />
                                </form>
                            )}
                        </div>
                        <div className='bottom-bar'>
                            <div
                                className={'button delete' + (this.state.method !== 'ADD' || this.state.changed ? '' : ' hidden')}
                                onClick={this.delete}
                            >
                                {this.state.method === 'ADD' ? 'Cancel' : 'Delete'}
                            </div>
                            <div
                                className={'button add' + (this.state.changed ? '' : ' hidden')}
                                onClick={this.handleDismount}
                            >
                                {this.state.method === 'ADD' ? 'Add' : 'Update'}
                            </div>
                        </div>
                    </div>
                </div>
            </Center>
        );
    }
}

class Inspector extends Component {
    constructor(props) {
        super(props);
        this.state = { dismounting: false };
        this.props.blur(true);
    }

    dismount = () => {
        if (this.state.dismounting) return;
        this.setState({ dismounting: true });
        this.refs.card.dismount();
        this.props.blur(false);
        setTimeout(() => {
            this.props.onDismount();
        }, 200);
    }

    render() {
        return (
            <div
                className={'inspector' + (this.state.dismounting ? ' fadeout' : '')}
                onClick={this.dismount}
            >
                <ElementCard
                    dismounting={this.state.dismounting}
                    inspectorDismount={this.dismount}
                    elm={this.props.elm}
                    ref='card'
                    tableID={this.props.tableID}
                />
            </div>
        );
    }
}

export default class PTable extends Component {
    constructor(props) {
        super(props);

        let params = (new URL(document.location)).searchParams;
        let tableCookie = params.get('t');

        this.state = {
            inspect: false,
            blur: false,
            tableID: (tableCookie && Number(tableCookie)) || -1
        };
    }

    onInspectElement = (elm) => {
        this.setState({ inspect: elm });
    }

    onBlur = (blur) => {
        this.setState({ blur: blur });
    }

    onInspectEscape = () => {
        this.setState({ inspect: false });
        this.refs.table.state.reload();
    }

    render() {
        if (!Author.checkAuth()) return <Redirect to='login' />;

        return (
            <>
                <Header />
                <div className='ptabapp'>
                    <div className={this.state.blur ? 'content blur' : 'content'}>
                        <Center>
                            <Ptable
                                tableID={this.state.tableID}
                                ref='table'
                                onInspect={this.onInspectElement}
                            />
                        </Center>
                    </div>
                    {this.state.inspect && <Inspector
                        elm={this.state.inspect}
                        blur={this.onBlur}
                        onDismount={this.onInspectEscape}
                        tableID={this.state.tableID}
                    />}
                </div>
            </>
        );
    }
}
