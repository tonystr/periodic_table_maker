import React, { Component, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Center, apiFetch, Author, Header, Dropdown } from './../global.js';

class Element extends Component {
    constructor(props) {
        super(props);

        let elneg = String((props.elm && props.elm.electronegativity) || '--');
        let mass  = String((props.elm && props.elm.atomic_mass) || '--');

        if (elneg !== '--' && !~elneg.indexOf('.')) elneg += '.0';
        if (mass  !== '--' && !~mass.indexOf('.'))  mass = `(${mass})`;

        this.state = {
            click: props.click || false,
            elm: props.elm || false,
            isUndef: this.props.elm && props.elm.isDefault,
            elneg: elneg,
            mass: mass
        };
    }

    handleClick = () => {
        this.props.onSelect(this.state.elm);
    }

    render() {

        //const typeColors = [
        //    '#F2615A',
        //    '#FAAD59',
        //    '#F0ED58',
        //    '#7FC973',
        //    '#79D1DC',
        //    '#7984C0',
        //    '#8A80BB',
        //    '#B47EB5',
        //    '#E972B2',
        //    '#D281B8'
        //];

        return (
            <td
                symbol={this.state.elm ? this.state.elm.symbol : undefined}
                className={
                    (this.state.elm.slidedown ? 'slidedown' : 'element') +
                    (!this.state.elm ? ' hidden' : '') +
                    (this.state.click ? ' click' : '') +
                    (this.state.isUndef ? ' undef' : '') +
                    (this.state.elm.type_id ? ' type-' + this.state.elm.type_id : ' type-11')
                }
                onClick={this.handleClick}
            >
                <span className='anum'>{this.state.elm && !this.state.isUndef ? this.state.elm.atom_number : undefined}</span>
                <div className='symbol'>{this.state.elm ? this.state.elm.symbol : undefined}</div>
                {this.state.elm && !this.state.isUndef && <span className='mass'><span>{this.state.mass}</span></span>}
                {this.state.elm && !this.state.isUndef && <span className='elneg'><span>{this.state.elneg}</span></span>}
            </td>
        );
    }
}

class Ptable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            redirect: null,
            table: {},
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
            table: this.state.tableID,
            authorID: Author.checkAuth()
        }, res => {
            if (res.error) {
                this.setState({ redirect: 'tablemissing' });
            } else {
                this.setState({
                    loaded: true,
                    table: res.table,
                    elements: res.elements
                });
            }
        });
    }

    handleInspect = evt => {
        this.props.onInspect(evt);
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
                    onSelect={this.handleInspect}
                    key={anum}
                    elm={!elm.hidden && elm}
                />
            );
        }

        return <tr className='group' key={8 + num}>{list}</tr>;
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
                        onSelect={this.handleInspect}
                        key={key}
                        elm={!elm.hidden && elm}
                    />
                );
            }
        }

        return (<tr className='group' key={index}>{list}</tr>);
    }

    render() {

        if (this.state.redirect) return <Redirect to={this.state.redirect} />;
        if (!this.state.tableID) return <Redirect to='tablemissing' />;

        const width = 18;
        const height = 7;
        const list = [];

        if (this.state.loaded) {
            for (let i = 0; i < height; i++) {
                list.push(this.renderGroup(i, width));
            }
            list.push(
                <tr className='spacing' key={7} />,
                this.renderSpecialGroup(0),
                this.renderSpecialGroup(1)
            );
        }

        return (
            <table className={
                'ptable' +
                (this.props.show ? ' show ' + this.props.show : '') +
                (this.state.table && this.state.table.author_id !== Author.checkAuth() ? ' read-only' : '')
            }>
                <tbody>{list}</tbody>
            </table>
        );
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
            readOnly={props.readOnly}
        />
    );
}

function ElectronShell(props) {

    const renderShells = num => {
        let elm = <div className='core'><div className='symbol'>{props.elm.symbol}</div></div>;
        let drawnEls = 0;

        for (let i = 1; i < num; i++) {

            let eltrons = [];
            const max = Math.min(props.elm.anom - drawnEls, props.elecDist[i - 1]);
            for (let j = 0; j < max; j++) {
                let ang = ((j / max) * (2 * Math.PI) + Math.PI * 1.5) % (2 * Math.PI);
                eltrons.push(
                    <div
                        key={max - j - 1}
                        style={{
                            left: `${Math.cos(ang) * 50 + 50}%`,
                            top: `${Math.sin(ang) * 50 + 50}%`
                        }}
                        className='electron'
                    />
                );
                drawnEls++;
            }

            elm = (
                <div className={'shell ' + i + (!eltrons.length ? ' hidden' : '')}>
                    {elm} {eltrons}
                </div>
            );
        }

        return elm;
    }

    return (
        <div className='electronshell'>
            {renderShells(8)}
        </div>
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
                anom:   props.elm.atom_number,
                name:   undef ? '' : null,
                mass:   null,
                elneg:  null
            },
            tableID: props.tableID,
            elecDist: [
                2,
                8,
                8 + Math.min(Math.max(props.elm.atom_number - 20 + (props.elm.atom_number > 23) - (props.elm.atom_number > 24), 0), 10),
                8 + Math.min(Math.max(props.elm.atom_number - 38 + (props.elm.atom_number > 40), 0), 10),
                8
            ]
        }
        if (!undef) this.fetchElement(this.props.elm.atom_number);
    }

    inputOnChange = (e) => {
        let elm = this.state.elm;
        elm[e.target.name] = e.target.value;
        if (!this.state.changed) this.props.onChange();
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
                        name: elm.name,
                        mass: elm.atomic_mass,
                        elneg: elm.electronegativity
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

        if (!this.state.changed) this.props.onChange();
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
                                <li>Symbol</li>
                                <li>Atomic Number</li>
                                <li>Name</li>
                                <br />
                                {this.state.elm.mass  && <li>Atomic Mass</li>}
                                {this.state.elm.elneg && <li>Electronegativity</li>}
                            </ul>
                            {this.state.loaded && (
                                <form className='datalist' method='POST'>
                                    <ElementInput name='symbol' readOnly={this.props.readOnly} elm={this.state.elm} onChange={this.inputOnChange} className='elm-symbol' maxLength={4} />
                                    <ElementInput name='anom'   readOnly={this.props.readOnly} elm={this.state.elm} onChange={this.inputOnChange} className='elm-anom' />
                                    <ElementInput name='name'   readOnly={this.props.readOnly} elm={this.state.elm} onChange={this.inputOnChange} className='elm-name' onKeyPress={this.handleKeyPress} />
                                    <br />
                                    {this.state.elm.mass  && <ElementInput name='mass'  readOnly={true} elm={this.state.elm} onChange={null} className='elm-mass'  onKeyPress={null} />}
                                    {this.state.elm.elneg && <ElementInput name='elneg' readOnly={true} elm={this.state.elm} onChange={null} className='elm-elneg' onKeyPress={null} />}
                                </form>
                            )}
                        </div>
                        {!this.props.readOnly && (
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
                        )}
                    </div>
                </div>
                <ElectronShell elm={this.state.elm} elecDist={this.state.elecDist} />
            </Center>
        );
    }
}

class Inspector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changed: false,
            dismounting: false
        };
        this.props.blur(true);
    }

    dismount = () => {
        if (this.state.dismounting) return;
        this.setState({ dismounting: true });
        this.refs.card.dismount();
        this.props.blur(false);
        setTimeout(() => {
            this.props.onDismount(this.state.changed);
        }, 200);
    }

    handleChange = () => {
        this.setState({
            changed: true
        })
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
                    onChange={this.handleChange}
                    elm={this.props.elm}
                    ref='card'
                    tableID={this.props.tableID}
                    readOnly={this.props.readOnly}
                />
            </div>
        );
    }
}

function TableOptions(props) {
    const [dropdown, setDropdown] = useState(false);
    const [options, setOptions] = useState(props.options);
    const toggleStates = ['Show ', 'Hide '];

    const toggleOption = evt => {
        const name = evt.target.getAttribute('name');
        let opts = options;
        opts[name] = !opts[name];
        setOptions(opts);
        props.onChange(options);
    }

    return (
        <div className='tableoptions'>
            <div className='btn' onClick={() => setDropdown(!dropdown)}>
                <i className="fas fa-cog"></i>
            </div>
            {dropdown && (
                <Dropdown onDismount={() => setDropdown(false)} className='dropdown'>
                    <li name='mass' onClick={toggleOption}>
                        {toggleStates[Number(options.mass)]}
                        atomic mass
                    </li>
                    <li name='elneg' onClick={toggleOption}>
                        {toggleStates[Number(options.elneg)]}
                        electronegativity
                    </li>
                    <li name='typeColors' onClick={toggleOption}>
                        {toggleStates[Number(options.typeColors)]}
                        type colors
                    </li>


                </Dropdown>
            )}
        </div>
    );
}

export default class PTable extends Component {
    constructor(props) {
        super(props);

        let params = (new URL(document.location)).searchParams;
        let tableCookie = params.get('t');

        this.state = {
            inspect: null,
            blur: false,
            tableID: (tableCookie && Number(tableCookie)) || -1,
            options : {
                elneg: false,
                mass: false,
                typeColors: false
            }
        };
    }

    onInspectElement = (elm) => {
        this.setState({ inspect: elm });
    }

    onBlur = (blur) => {
        this.setState({ blur: blur });
    }

    onInspectEscape = changed => {
        this.setState({ inspect: null });
        if (changed) this.refs.table.state.reload();
    }

    tableOptionsChange = options => {
        this.setState({ options: options });
    }

    render() {
        if (!Author.checkAuth()) return <Redirect to='login' />;

        return (
            <>
                <Header right={
                    <TableOptions
                        onChange={this.tableOptionsChange}
                        options={this.state.options}
                    />
                } />
                <div className='ptabapp'>
                    <div className={this.state.blur ? 'content blur' : 'content'}>
                        <Center>
                            <Ptable
                                tableID={this.state.tableID}
                                ref='table'
                                onInspect={this.onInspectElement}
                                show={
                                    (this.state.options.elneg ? 'elneg' : '') +
                                    (this.state.options.mass  ? ' mass' : '') +
                                    (this.state.options.typeColors ? ' tcolors' : '')
                                }
                            />
                        </Center>
                    </div>
                    {this.state.inspect && <Inspector
                        elm={this.state.inspect}
                        blur={this.onBlur}
                        onDismount={this.onInspectEscape}
                        tableID={this.state.tableID}
                        readOnly={this.refs.table && this.refs.table.state.table.author_id !== Author.checkAuth()}
                    />}
                </div>
            </>
        );
    }
}
