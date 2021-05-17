import { Route } from 'react-router-dom';
import Login from './pages/Login.js';
import './App.css';

function App() {
  return (
    <div>
      <Route exact path="/login" component={Login} />
    </div>
  );
}

export default App;
