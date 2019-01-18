import React, { Component } from 'react';

import elementsRaw from '../table.json';

let anom = 1;
let skip = 0;
let elements = [];

for (let i = 0; i < elementsRaw.length; i++) {
    const elm = elementsRaw[i];
    if (typeof elm === 'number') {

        skip += elm - 1;

    } else elements[i + skip] = {
        symbol: elementsRaw[i],
        anom: anom++,
        name: 'This is the name of the atom'
    }
}

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

class Element extends Component {
    constructor(props) {
        super(props);
        this.state = {
            click: props.click || false,
            elm: props.elm || false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // this.setState({ click: !this.state.click });
        this.props.onSelect(this.state.elm);
    }

    render() {
        return (
            <div
                symbol={this.state.elm ? this.state.elm.symbol : undefined}
                className={'element' + (!this.state.elm ? ' hidden' : '') + (this.state.click ? ' click' : '')}
                onClick={this.handleClick}
            >
                {this.state.elm ? this.state.elm.symbol : undefined}
            </div>
        );
    }
}

class Ptable extends Component {
    renderGroup(index, width) {
        const list = [];
        const start = index * width;

        for (let i = 0; i < width; i++) {
            const key = start + i;
            list.push(
                <Element
                    onSelect={this.props.onInspect}
                    key={key}
                    elm={elements[key] || undefined}
                />
            );
        }

        return (<div className='group' key={index}>{list}</div>);
    }

    render() {
        const width = 18;
        const height = 7;
        const list = [];

        for (let i = 0; i < height; i++) {
            list.push(this.renderGroup(i, width));
        }

        return (<div className='ptable'>{list}</div>);
    }
}

function XButton(props) {
    return (<div className='button-x' onClick={props.onClick} />);
}

class ElementCard extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(evt) {
        evt.stopPropagation();
        evt.nativeEvent.stopImmediatePropagation();
    }

    render() {
        return (
            <Center>
                <div className='card-holder'>
                    <div
                        className={'card' + (this.props.dismounting ? ' fadeout' : '')}
                        onClick={this.handleClick}
                    >
                        <div className='datalist'>
                            <input type='text' value={this.props.elm.symbol} className='elm-symbol' />
                            <input type='text' value={this.props.elm.anom}   className='elm-anom' />
                            <input type='text' value={this.props.elm.name}   className='elm-name' />
                        </div>
                        <XButton onClick={this.props.inspectorDismount} />
                    </div>
                </div>
            </Center>
        );
    }
}

class Inspector extends Component {
    constructor(props) {
        super(props);
        this.dismount = this.dismount.bind(this);
        this.state = { dismounting: false };
        this.props.blur(true);
    }

    dismount() {
        if (this.state.dismounting) return;
        this.setState({ dismounting: true });
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
                />
            </div>
        );
    }
}

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = { inspect: false, blur: false };
        this.onInspectElement = this.onInspectElement.bind(this);
        this.onInspectEscape = this.onInspectEscape.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onInspectElement(elm) {
        this.setState({ inspect: elm });
    }

    onBlur(blur) {
        this.setState({ blur: blur });
    }

    onInspectEscape() {
        this.setState({ inspect: false });
    }

    render() {
        return (
            <div className='app'>
                <div className={this.state.blur ? 'content blur' : 'content'}>
                    <div className='title'> Periodic Table Builder </div>
                    <Center><Ptable onInspect={this.onInspectElement} /></Center>
                </div>
                {this.state.inspect && <Inspector
                    elm={this.state.inspect}
                    blur={this.onBlur}
                    onDismount={this.onInspectEscape}
                />}
            </div>
        );
    }
}
