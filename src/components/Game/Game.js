import React, { Component } from 'react';
import { sketch } from '../../assets/sketch/objects';
import P5Wrapper from 'react-p5-wrapper';
import "p5/lib/addons/p5.sound";
/* eslint-disable-next-line no-unused-vars */
import p5 from 'p5';
import Results from './Results/Results';

import './Game.scss';

export class Game extends Component {
    state = { toggleWin: false, toggleLoss: false };

    handleWin = (score) => {
        this.setState({ toggleWin: true, score });
    };

    handleLoss = (score) => {
        this.setState({ toggleLoss: true, score });
    };

    clearResults = () => {
        this.setState({ toggleWin: false, toggleLoss: false });
    }

    render() {
        const { user, setSession } = this.props;
        const { score, toggleWin, toggleLoss } = this.state;

        const showResults = toggleWin || toggleLoss;

        return (
            <div className='game-container'>
                {!showResults && <P5Wrapper sketch={p5 => sketch(p5, this.handleWin, this.handleLoss)} />}
                {showResults && (
                    <Results
                        user={user}
                        score={score}
                        toggleWin={toggleWin}
                        toggleLoss={toggleLoss}
                        setSession={setSession}
                        clearResults={this.clearResults} />
                )}
            </div>
        );
    }
}