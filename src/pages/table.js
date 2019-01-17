import React, { Component } from 'react';

import elementsRaw from '../table.json';

let elements = elementsRaw.slice();

for (let i = 0; i < 18 * 7; i++) {
    const elm = elements[i];
    if (typeof elm === 'number') {

        elements = elements.slice(0, i)
            .concat(new Array(elm))
            .concat(elements.slice(i + 1));

        i += elm;
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
        this.state = { click: props.click || false };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // this.setState({ click: !this.state.click });
        this.props.onSelect(this.props.symbol);
    }

    render() {
        return (
            <div
                symbol={this.props.symbol}
                className={'element' + (this.props.hidden ? ' hidden' : '') + (this.state.click ? ' click' : '')}
                onClick={this.handleClick}
            >
                {this.props.symbol}
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
                    anom={key}
                    key={key}
                    symbol={elements[key] || undefined}
                    hidden={!elements[key]}
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

function ElementCard(props) {
    return (
        <Center>
            <div className='card-holder'>
                <div className={'card' + (props.dismounting ? ' fadeout' : '')}>
                    <div className='element'>{props.elm}</div>
                </div>
            </div>
        </Center>
    );
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
            <div className={'inspector' + (this.state.dismounting ? ' fadeout' : '')} onClick={this.dismount}>
                <ElementCard
                    dismounting={this.state.dismounting}
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
        console.log(elm);
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
