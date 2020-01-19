import React, { Component } from 'react';
import { sketch } from '../../assets/sketch/objects';
import P5Wrapper from 'react-p5-wrapper';

import "p5/lib/addons/p5.sound";
import p5 from 'p5';

export class Game extends Component {
    state = { toggleWin: false, toggleLoss: false };

    handleWin = (score) => {
        this.setState({ toggleWin: true, score });
    };
    handleLoss = (score) => {
        this.setState({ toggleLoss: true, score });
    };

    render() {
        return (
            <React.Fragment>
            { !this.state.toggleLoss && <P5Wrapper sketch={p5 => sketch(p5, this.handleWin, this.handleLoss)} /> }
            { this.state.toggleLoss && <h1 style={{ color: 'white' }}>Better luck next time!</h1> }
            </React.Fragment>
        );
    }
}