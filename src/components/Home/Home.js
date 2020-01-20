import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Segment, Icon, Button, Header, Modal } from 'semantic-ui-react';
import audio from '../../assets/media/home.mp3';

import './Home.scss';

export const Home = () => {
    const [modalOpen, toggleModal] = useState(false)

    const history = useHistory();

    const startGame = () => {
        history.push("/game");
    }

    return (
        <div className='home-container'>
            <div className='home-buttons'>
                <Modal
                    centered={false}
                    className='instructions-modal'
                    basic
                    size='mini'
                    open={modalOpen}
                    onClose={() => toggleModal(false)}
                    trigger={
                        <Button
                            onClick={() => toggleModal(true)}
                            className='home-button'
                            inverted
                            size='massive'
                        >
                            INSTRUCTIONS
                        </Button>
                    }
                >
                    <Modal.Header>HOW TO PLAY</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <p>USE ARROW KEYS TO MOVE</p>
                            <p>USE SPACEBAR TO SHOOT</p>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => toggleModal(false)} color='red'>
                            <Icon name='close' />
                            Happy Hunting!
                        </Button>
                    </Modal.Actions>
                </Modal>
                <br />
                <Button
                    onClick={startGame}
                    className='home-button'
                    inverted
                    color='red'
                    size='massive'
                >
                    PLAY
                </Button>
            </div>
            <audio src={audio} autoPlay />
        </div>
    )
}
