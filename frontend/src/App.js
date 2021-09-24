import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
// nav
import Navbar from './components/Navbar';
// pages
import Home from './Pages/Home';
import SignIn from './Pages/SingIn';
import SignUp from './Pages/SignUp';
import Login from './components/Login';
import CreatedTests from './Pages/CreatedTests';
import AssignedTests from './Pages/AssignedTests';
import OneTest from './Pages/OneTest';
import OneTestForm from './Pages/OneTestForm';

function App() {
  return (
    <div className="App">
      <Login>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/sign-up" exact component={SignUp} />
            <Route path="/created-test" exact component={CreatedTests} />
            <Route path="/assigned-tests" exact component={AssignedTests} />
            <Route path="/test/:testId" component={OneTest} />
            <Route path="/test-form/:testId" component={OneTestForm} />
          </Switch>
        </Router>
      </Login>
    </div>
  );
}

export default App;
