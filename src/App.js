import React, { useState } from 'react';
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

import Equalizer from './Component/Utilities/Equalizer';

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './App.css';
import './Menu.css'
import './Component/Component.css'



function App() {

  const [className, setClass] = useState("topnav");

  const expandMenu = (e) => {
    e.preventDefault()
    if (className === "topnav") {
      setClass("topnav responsive");
    } else {
      setClass("topnav");
    }
    return false;
  }

  const resetMenu = () => {
    setClass("topnav");
  }

  return (
    <div className="row">
      <Router>
        <div className="col-12">
          <nav className={className}>
            <Link to="/Dashboard" className="active">
              Dashboard
              </Link>
            <Link to="/Transactions" onClick={resetMenu}>
              Transactions
            </Link>
            <Link to="/Accounts" onClick={resetMenu}>
              Accounts
            </Link>
            <Link to="/AddAccount" onClick={resetMenu}>
              Add Account
              </Link>
            <Link to="/AddTransaction" onClick={resetMenu}>
              Add Transaction
            </Link>
            <Link to="/Utilities" onClick={resetMenu}>
              Utilities
            </Link>
            <a href="#0" className="icon" onClick={expandMenu}>
              <FontAwesomeIcon icon={faBars} />
            </a>
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
          <Route path="/Utilities">
            <Equalizer />
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
