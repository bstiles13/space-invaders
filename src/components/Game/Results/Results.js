import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import Axios from 'axios';
import { get, split } from 'lodash';
import { withRouter } from 'react-router-dom'

import './Results.scss';

export class Results extends Component {
    submitScore = () => {
        const { user } = this.props;
        const player = !user
            ? 'Anonymous'
            : `${get(split(user.name, ' ', 2), '0')} ${get(split(user.name, ' ', 2), '1', '').substring(0, 1)}`
        const picture = get(user, 'picture');
        Axios.post('/submit', { player, picture, email: user.email, score: this.props.score }).then(() => {
            this.props.history.push("/leaderboard");
        })
    };

    restartGame = () => {
        this.props.clearResults();
    };

    render() {
        const { toggleWin, toggleLoss } = this.props;

        return (
            <Menu className='results-menu' vertical inverted size='massive'>
                {toggleWin && <Menu.Item header><icon name='smile' />WINNER!</Menu.Item>}
                {toggleLoss && <Menu.Item header><icon name='smile' />NICE TRY!</Menu.Item>}

                <Menu.Item
                    onClick={this.submitScore}
                >
                    <Icon name='users' />
                    Submit Score
                </Menu.Item>

                <Menu.Item
                    onClick={this.restartGame}
                >
                    <Icon name='gamepad' />
                    Play Again
                </Menu.Item>
            </Menu>
        )
    }
}

export default withRouter(Results);
