import { Route } from 'react-router-dom';
import Login from './pages/Login.js';
import Dashboard from './pages/Dashboard.js';
import Detail from './pages/Detail.js';
import Camera from './pages/Camera.js';
import Calendar from './pages/Calendar.js';
import './App.css';
import { StylesProvider } from '@material-ui/core';

function App() {
  return (
    <StylesProvider injectFirst>
      <Route exact path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/camera" component={Camera} />
      <Route path="/calendar" component={Calendar} />
      <Route path="/detail" component={Detail} />
    </StylesProvider>
  );
}

export default App;
