import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Link,
} from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Icon, Menu, Button } from 'semantic-ui-react';
import { Home } from './components/Home/Home';
import { Game } from './components/Game/Game';
import { Leaderboard } from './components/Leaderboard/Leaderboard';
import './App.scss';

function App() {
  const [state, setState] = useState({ user: null, activeItem: 'home' });

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = () => {
    let user = sessionStorage.getItem('invadersPlayer');

    if (!user) return;

    user = JSON.parse(user);

    user.expires && user.expires * 1000 < Date.now()
      ? clearSession()
      : setState({ ...state, user })
  }

  const setSession = (response) => {
    const { name, email, data_access_expiration_time, picture } = response;

    if (name && email && data_access_expiration_time) {

      const user = {
        name,
        email,
        picture: picture.data.url,
        expires: data_access_expiration_time
      };

      sessionStorage.setItem('invadersPlayer', JSON.stringify(user));
      setState({ ...state, user })
    }
  }

  const clearSession = () => {
    console.log('test');
    sessionStorage.clear();
    setState({ ...state, user: null })
  }

  const handleItemClick = (e, { name }) => setState({ ...state, activeItem: name });

  const { activeItem } = state;

  console.log('active item', activeItem);

  return (
    <BrowserRouter>
      <div className='app'>
        <Menu className='navbar' icon='labeled' inverted>
          <h1 style={{ color: 'white' }} className='app-title'>INVADERS</h1>
          <div className='home-link'>
            <Menu.Item
              as={Link}
              to='/'
              name='home'
              onClick={handleItemClick}
            >
              <img src='https://cdn4.iconfinder.com/data/icons/animals-wildlife-color-1/128/alien-face-green-2-512.png' />
            </Menu.Item>
          </div>
          <Menu.Item
            as={Link} to='/game'
            name='gamepad'
            active={activeItem === 'gamepad'}
            onClick={handleItemClick}
          >
            <Icon name='gamepad' />
            Play
            </Menu.Item>
          <Menu.Item
            as={Link} to='/leaderboard'
            name='users'
            active={activeItem === 'users'}
            onClick={handleItemClick}
          >
            <Icon name='users' />
            Leaderboard
              </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item className='user-menu'>
              <div className='user-controls'>
                {
                  state.user && state.user.name
                    ? (
                      <React.Fragment>
                        <div className='welcome-text'>{`Hello, ${state.user.name}!`}</div>
                        <Button color='facebook' onClick={clearSession}>
                          <Icon name='facebook' /> Sign Out
                      </Button>
                      </React.Fragment>
                    )
                    : (
                      <FacebookLogin
                        appId='582037695982324'
                        autoLoad={false}
                        fields='name,email,picture'
                        callback={setSession}
                        render={renderProps => (
                          <Button color='facebook' onClick={renderProps.onClick}>
                            <Icon name='facebook' /> Sign In
                        </Button>
                        )} />
                    )
                }
              </div>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <div className='routes-container'>
          <Route exact path="/" render={props => <Home />} />
          <Route path="/game" render={props => <Game user={state.user} />} />
          <Route path="/leaderboard" render={props => <Leaderboard user={state.user} />} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
