import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Rollover from './Component/Dashboard/Rollover'
import ShowTransaction from './Component/Transaction/Show'
import ShowAccount from './Component/Accounts/Show'
import AddTransaction from './Component/Transaction/Add';
import AddAccount from './Component/Accounts/Add';
import './App.css';

function App() {

  return (
    <div className="row">
      <Router>
        <div className="col-12">
          <nav>
            <Link to="/Dashboard">
              Dashboard
              </Link>
            <Link to="/Transactions">
              Transactions
              </Link>
            <Link to="/Accounts">
              Accounts
              </Link>
            <Link to="/AddAccount">
              Add Account
              </Link>
            <Link to="/AddTransaction">
              Add Transaction
              </Link>
          </nav>
        </div>
        <Switch>
          <Route path="/Dashboard">
            <Rollover />
          </Route>
          <Route path="/Transactions">
            <ShowTransaction />
          </Route>
          <Route path="/Accounts">
            <ShowAccount />
          </Route>
          <Route path="/AddAccount">
            <AddAccount />
          </Route>
          <Route path="/AddTransaction">
            <AddTransaction />
          </Route>
          <Route path="/">
            <Rollover />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
