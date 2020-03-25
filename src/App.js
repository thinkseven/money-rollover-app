import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import ShowAccount from './Component/Accounts'
import ShowTransaction from './Component/Transaction'

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Account">Accounts</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/Account">
            <ShowAccount />
          </Route>
          <Route path="/">
            <ShowTransaction />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// class App extends Component {

//   state = {
//     loading: true,
//     Accounts: [],
//     Transactions: []
//   }

//   setTransaction = (transactionInfo) => {
//     this.setState({
//       Transactions: processTransaction([...this.state.Transactions, transactionInfo])
//     })
//   }

//   componentDidMount = () => {
//     setTimeout(() => {
//       this.setState({
//         loading: false,
//         Accounts: Accounts,
//         Transactions: Transactions,
//       })
//     }, 3000);
//   }

//   render() {
//     return (
//       <div>
//         {
//           this.state.loading ? <div style={{
//             margin: '10px 0 0 10px',
//           }}>
//             Loading ....
//           </div> : <div>
//               <div style={{
//                 margin: '10px 0 0 10px',
//               }}>
//                 <AddTransaction accounts={this.state.Accounts} setTransaction={this.setTransaction} />
//               </div>
//               <div style={{
//                 margin: '10px 0 0 10px',
//               }}>
//                 <ShowTransaction transactions={this.state.Transactions} />
//               </div>
//             </div>
//         }
//       </div>
//     )
//   }
// }

export default App;
