import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import Axios from 'axios';
import { get, split, isEqual } from 'lodash';
import { withRouter } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import './Results.scss';

export class Results extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.user && !isEqual(this.props.user, prevProps.user) && this.state.pendingScore) {
            this.submitScore(this.state.pendingScore);
            this.setState({ pendingScore: null });
        }
    }

    submitScore = (score) => {
        const { user } = this.props;
        const player = !user
            ? 'Anonymous'
            : `${get(split(user.name, ' ', 2), '0')} ${get(split(user.name, ' ', 2), '1', '').substring(0, 1)}`
        const picture = get(user, 'picture');
        Axios.post('/submit', { player, picture, email: user.email, score }).then(() => {
            this.props.history.push("/leaderboard");
        })
    };

    restartGame = () => {
        this.props.clearResults();
    };

    preLoginSubmit = (response) => {
        this.setState({ pendingScore: this.props.score }, () => {
            this.props.setSession(response);
        })
    }

    render() {
        const { user, toggleWin, toggleLoss, score } = this.props;

        return (
            <Menu className='results-menu' vertical inverted size='massive'>
                {toggleWin && <Menu.Item header><Icon name='smile' />WINNER!</Menu.Item>}
                {toggleLoss && <Menu.Item header><Icon name='smile' />NICE TRY!</Menu.Item>}

                {user && (
                    <Menu.Item
                        onClick={() => this.submitScore(score)}
                    >
                        <Icon name='users' />
                        Submit Score
                </Menu.Item>
                )}
                {!user && (
                    <FacebookLogin
                        appId='582037695982324'
                        autoLoad={false}
                        fields='name,email,picture'
                        callback={this.preLoginSubmit}
                        render={renderProps => (
                            <Menu.Item onClick={renderProps.onClick}>
                                <Icon name='users' />
                                Submit Score
                            </Menu.Item>
                        )} />
                )}

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
