import { Route, useLocation, Redirect } from 'react-router-dom';
import Login from './pages/Login.js';
import Dashboard from './pages/Dashboard.js';
import Detail from './pages/Detail.js';
import Camera from './pages/Camera.js';
import FashionCalendar from './pages/FashionCalendar.js';
import Main from './pages/Main.js';
import OAuthRedirectHandler from './pages/OAuthRedirectHandler.js';
import Header from './components/common/Header';
import NavBar from './components/common/NavBar';
import WindowWrapper from './components/common/WindowWrapper';
import styled from 'styled-components';

import './App.css';
import { StylesProvider } from '@material-ui/core';
import FriendsList from './pages/FriendsList.js';
import FriendPage from './pages/FriendPage.js';

function App() {
  const username = '하성민';
  let { pathname } = useLocation();
  console.log('pathname == ', pathname);
  return (
<<<<<<< client/src/App.js
    <StylesProvider injectFirst>
      {pathname === '/login' ? (
        {!sessionStorage.getItem('token') ? <Redirect to="/login" /> : ''}
      ) : (
        <WindowWrapper>
          <NavBar />
          <MainLayout>
            <Header username={username} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/camera" component={Camera} />
            <Route path="/calendar" component={FashionCalendar} />
            <Route path="/detail" component={Detail} />
            <Route
              path="/oauth/callback/kakao"
              component={OAuthRedirectHandler}
            />
            <Route exact path="/" component={Main} />
            <Route path="/friendslist" component={FriendsList} />
            <Route path="/friendPage" component={FriendPage} />
          </MainLayout>
        </WindowWrapper>
      )}
    </StylesProvider>
  );
}

const MainLayout = styled('div')`
  display: flex;
  flex-direction: column;
  width: 95%;
`;

export default App;
