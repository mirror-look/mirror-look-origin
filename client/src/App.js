import { Route, Redirect } from 'react-router-dom';
import Login from './pages/Login.js';
import Dashboard from './pages/Dashboard.js';
import Detail from './pages/Detail.js';
import Camera from './pages/Camera.js';
import FashionCalendar from './pages/FashionCalendar.js';
import Main from './pages/Main.js';
import OAuthRedirectHandler from './pages/OAuthRedirectHandler.js';

import './App.css';
import { StylesProvider } from '@material-ui/core';

function App() {
  return (
    <div>
      {!sessionStorage.getItem('token') ? <Redirect to="/login" /> : ''}
      <StylesProvider injectFirst>
        <Route exact path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/camera" component={Camera} />
        <Route path="/calendar" component={FashionCalendar} />
        <Route path="/detail" component={Detail} />
        <Route path="/oauth/callback/kakao" component={OAuthRedirectHandler} />
        <Route exact path="/" component={Main} />
      </StylesProvider>
    </div>
  );
}

export default App;
