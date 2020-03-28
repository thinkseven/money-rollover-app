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

function App() {

  // const [currentSelection, setSelection] = useState('0');

  return (
    <div>
      <Router>
        <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6 mr-4">
          <div class="flex items-center flex-shrink-0 text-white mr-6">
            <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
            <span class="font-semibold text-xl tracking-tight">Money Rollover</span>
          </div>
          <div class="block lg:hidden">
            <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
              <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
            </button>
          </div>
          <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div class="text-sm lg:flex-grow">
              <Link to="/Dashboard" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                Dashboard
            </Link>
              <Link to="/Transactions" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                Transactions
            </Link>
              <Link to="/Accounts" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                Accounts
            </Link>
              <Link to="/AddAccount" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                Add Account
            </Link>
              <Link to="/AddTransaction" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                Add Transaction
            </Link>
            </div>
          </div>
        </nav>
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
