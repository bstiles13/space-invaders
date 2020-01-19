import React, { Component } from 'react';
import { Icon, Button, Header } from 'semantic-ui-react';
import audio from '../../assets/media/home.mp3';

import './Home.scss';

export class Home extends Component {
    render() {
        return (
            <div className='home-container'>
                <Header
                    as='h1'
                    content='Earth is under attack!'
                    inverted
                />
                <Header
                    as='h2'
                    content={'USE ARROW KEYS TO MOVE\nUSE SPACEBAR TO SHOOT'}
                    inverted
                />
                <Button primary size='huge'>
                    Play
                <Icon name='right arrow' />
                </Button>
                <audio src={audio} autoPlay />
            </div>
        )
    }
}
