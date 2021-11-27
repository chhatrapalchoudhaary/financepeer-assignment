import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import SignUp from './components/Signup';
import NotFound from './components/NotFound';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route component={NotFound}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
