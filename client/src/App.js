import { Route, useLocation, Redirect } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login.js';
import Dashboard from './pages/Dashboard.js';
import Detail from './pages/Detail.js';
import SelectTop3 from './pages/SelectTop3.js';
import Camera from './pages/Camera.js';
import FashionCalendar from './pages/FashionCalendar.js';
import Main from './pages/Main.js';
import OAuthRedirectHandler from './pages/OAuthRedirectHandler.js';
import Header from './components/common/Header';
import NavBar from './components/common/NavBar';
import WindowWrapper from './components/common/WindowWrapper';
import styled from 'styled-components';

import './App.css';
import { Divider, StylesProvider } from '@material-ui/core';
//import FriendsList from './pages/FriendsList.js';
//import FriendPage from './pages/FriendPage.js';

function App() {
  let { pathname } = useLocation();
  console.log('pathname == ', pathname);
  const [userName, setUserName] = useState('꼬부기');
  const [userAgreement, setUserAgreement] = useState();
  const [agreement, setAgreement] = useState();
  const [userKakaoId, setUserKakaoId] = useState('');

  return (
    <div>
      {!sessionStorage.getItem('token') ? <Redirect to="/login" /> : ''}

      <StylesProvider injectFirst>
        {pathname === '/login' ? (
          <Route exact path="/login" component={Login} />
        ) : (
          <WindowWrapper>
            <NavBar />
            <MainLayout>
              <Header />
              <Route
                path="/dashboard"
                render={() => <Dashboard userName={userName} />}
              />
              <Route
                exact
                path="/camera"
                render={() => <Camera userName={userName} />}
              />
              <Route
                path="/calendar"
                render={() => <FashionCalendar userId={userKakaoId} />}
              />
              <Route
                path="/detail"
                render={() => <Detail userName={userName} />}
              />
              <Route path="/select" component={SelectTop3} />
              <Route
                path="/oauth/callback/kakao"
                component={OAuthRedirectHandler}
              />
              <Route
                exact
                path="/"
                render={() => (
                  <Main
                    setUserAgreement={setUserAgreement}
                    setUserKakaoId={setUserKakaoId}
                    setAgreement={setAgreement}
                    userName={userName}
                    setUserName={setUserName}
                  />
                )}
              />
              {/*<Route path="/friends-list" component={FriendsList} />
              <Route path="/friend-page" component={FriendPage} />*/}
            </MainLayout>
          </WindowWrapper>
        )}
      </StylesProvider>
    </div>
  );
}

const MainLayout = styled('div')`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
`;

export default App;
