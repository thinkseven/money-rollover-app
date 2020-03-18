import React, { Component } from 'react';
import './App.css';
import Accounts from './Component/AddTransaction/Accounts'
import AddTransaction from './Component/AddTransaction'

import Transactions, { processTransaction } from './Component/ShowTransaction/Transactions'
import ShowTransaction from './Component/ShowTransaction'

class App extends Component {

  state = {
    loading: true,
    Accounts: [],
    Transactions: []
  }

  setTransaction = (transactionInfo) => {
    this.setState({
      Transactions: processTransaction([...this.state.Transactions, transactionInfo])
    })
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        loading: false,
        Accounts: Accounts,
        Transactions: Transactions,
      })
    }, 3000);
  }

  render() {
    return (
      <div>
        {
          this.state.loading ? <div style={{
            margin: '10px 0 0 10px',
          }}>
            Loading ....
          </div> : <div>
              <div style={{
                margin: '10px 0 0 10px',
              }}>
                <AddTransaction accounts={this.state.Accounts} setTransaction={this.setTransaction} />
              </div>
              <div style={{
                margin: '10px 0 0 10px',
              }}>
                <ShowTransaction transactions={this.state.Transactions} />
              </div>
            </div>
        }
      </div>
    )
  }
}

export default App;
