import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  NavLink,
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
    let user = localStorage.getItem('invadersPlayer');

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

      localStorage.setItem('invadersPlayer', JSON.stringify(user));
      setState({ ...state, user })
    }
  }

  const clearSession = () => {
    localStorage.clear();
    setState({ ...state, user: null })
  }

  const handleItemClick = (e, { name }) => setState({ ...state, activeItem: name });

  const { activeItem } = state;

  return (
    <BrowserRouter>
      <div className='app'>
        <Menu className='navbar' icon='labeled' inverted>
          <h1 style={{ color: 'white' }} className='app-title'>INVADERS</h1>
          <div className='home-link'>
            <Menu.Item
              as={NavLink}
              to='/'
            >
              <img src='http://www.clker.com/cliparts/e/M/n/O/z/h/del-icon-md.png' />
            </Menu.Item>
          </div>
          <Menu.Item
            as={NavLink} to='/game'
          >
            <Icon name='gamepad' />
            Play
            </Menu.Item>
          <Menu.Item
            as={NavLink} to='/leaderboard'
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
          <Route path="/game" render={props => <Game user={state.user} setSession={setSession} />} />
          <Route path="/leaderboard" render={props => <Leaderboard user={state.user} />} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
