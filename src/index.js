import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './ptable.scss';
import * as serviceWorker from './serviceWorker';

import elementsRaw from './table.json';

let elements = elementsRaw.slice();

for (let i = 0; i < 18 * 7; i++) {
    const elm = elements[i];
    if (typeof elm === "number") {

        elements = elements.slice(0, i)
            .concat(new Array(elm))
            .concat(elements.slice(i + 1));

        i += elm;
    }
}

class Center extends Component {
    render() {
        return (
            <div className="padjust">
                <div className="padding" />
                {this.props.children}
                <div className="padding" />
            </div>
        );
    }
}

function Element(props) {
    return (
        <div className={'element' + (props.hidden ? ' hidden' : '')}>
            {props.symbol}
        </div>
    );
}

class Ptable extends Component {

    renderGroup(index, width) {
        const list = [];

        for (let i = 0; i < width; i++) {
            list.push(
                <Element
                    symbol={elements[index * width + i] || undefined}
                    hidden={!elements[(index * width + i)]}
                />
            );
        }

        return (<div className="group">{list}</div>);
    }

    render() {
        const width = 18;
        const height = 7;
        const list = [];

        for (let i = 0; i < height; i++) {
            list.push(this.renderGroup(i, width));
        }

        return (<div className="ptable">{list}</div>);
    }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="title"> Hello World </div>
                <Center><Ptable /></Center>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
