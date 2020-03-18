import React, { Component } from 'react';
import './App.css';
import Accounts from './Component/AddTransaction/Accounts'
import AddTransaction from './Component/AddTransaction'

import Transactions, { processTransaction } from './Component/ShowTransaction/Transactions'
import ShowTransaction from './Component/ShowTransaction'

class App extends Component {

  state = {
    Accounts: [],
    Transactions: [],
  }

  setTransaction = (transactionInfo) => {
    this.setState({
      Transactions: processTransaction([...this.state.Transactions, transactionInfo])
    })
  }

  componentDidMount = () => {
    this.setState({
      Accounts: Accounts,
      Transactions: Transactions,
    })
  }

  render() {
    return (
      <div>
        <div style={{
          margin: '10px 0 0 10px'
        }}>
          <AddTransaction accounts={this.state.Accounts} setTransaction={this.setTransaction} />
        </div>
        <div style={{
          margin: '10px 0 0 10px'
        }}>
          <ShowTransaction transactions={this.state.Transactions} />
        </div>
      </div>
    )
  }
}

export default App;
