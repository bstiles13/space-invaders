import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Header, Image, List, Segment, Icon, Menu, Popup } from 'semantic-ui-react';
import { isEqual } from 'lodash';
import personImage from '../../assets/images/person.png';

import './Leaderboard.scss';

export class Leaderboard extends Component {
    state = { scores: null, activeItem: 'global' };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    componentDidMount() {
        axios.get('/getscores').then(data => {
            this.setState({ scores: data.data })
        })
        if (this.props.user) {
            axios.get('/myscores', {
                params: { email: this.props.user.email }
            }).then(data => {
                this.setState({ myScores: data.data })
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.user && !isEqual(this.props.user, prevProps.user)) {
            axios.get('/myscores', {
                params: { email: this.props.user.email }
            }).then(data => {
                this.setState({ myScores: data.data })
            })
        }
    }

    renderList = () => {
        const { activeItem } = this.state;

        const scores = activeItem === 'myScores'
            ? this.state.myScores
            : this.state.scores;

        if (!scores) return;

        return scores.map((score, i) => {
            return (
                <List.Item className='leaderboard-list-item' key={i}>
                    <List.Content className='score' floated='right'>
                        {score.score}
                    </List.Content>
                    <Image avatar src={score.picture || personImage} onError={i => i.target.src='https://www.stickpng.com/assets/images/585e4bf3cb11b227491c339a.png'} />
                    <List.Content>
                        <List.Header>{score.player}</List.Header>
                        <List.Description>{this.formatDate(score.date)}</List.Description>
                    </List.Content>
                </List.Item>
            )
        })
    }

    formatDate = (date) => {
        const daysAgo = moment().diff(date, 'days');
        return daysAgo === 0 ? 'Today' : daysAgo === 1 ? `${daysAgo} day ago` : `${daysAgo} days ago`
    }

    render() {
        const { activeItem, myScores } = this.state

        return (
            <div className='leaderboard-container'>
                <Segment className='leaderboard-segment' inverted>
                    <Header as='h2' icon textAlign='center'>
                        <Icon inverted name='users' />
                        <Header.Content>Leaderboard</Header.Content>
                    </Header>
                    <Menu inverted pointing secondary>
                        <Menu.Item
                            name='global'
                            active={activeItem === 'global'}
                            onClick={this.handleItemClick}
                        />
                        <Popup
                            position='right center'
                            inverted
                            basic
                            size='tiny'
                            disabled={!!this.props.user}
                            content='Sign in to view your scores'
                            trigger={
                                <Menu.Item
                                    disabled={!myScores}
                                    name='myScores'
                                    active={activeItem === 'myScores'}
                                    onClick={this.handleItemClick}
                                />
                            }
                        />
                    </Menu>
                    <List inverted size='huge' divided verticalAlign='middle'>
                        {this.renderList()}
                    </List>
                </Segment>
            </div>
        )
    }
}
