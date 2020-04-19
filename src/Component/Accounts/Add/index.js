import React, { Component } from 'react';

class AddAccount extends Component {

  state = {
    name: '',
    initialBalance: '',
    currentBalance: '',
    accountType: 'None',
    paymentDueDay: '',
    statementClosingDay: '',
    installmentAmount: '',
    comments: '',
    msg: '',
  }

  setValue = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  addTransaction = (event) => {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = {
      name: this.state.name,
      initialBalance: this.state.initialBalance,
      currentBalance: this.state.currentBalance,
      accountType: this.state.accountType,
      paymentDueDay: new Date(this.state.paymentDueDay),
      statementClosingDay: new Date(this.state.statementClosingDay),
      installmentAmount: this.state.installmentAmount,
      comments: this.state.comments
    }

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(raw)
    };

    fetch("/api/v1/money/Account", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw Error("Failed to create account due to error!!");
        }
        return response.text()
      })
      .then(response => {
        console.log(response)
        this.setState({
          msg: "Account created successfully!!",
          name: '',
          initialBalance: '',
          currentBalance: '',
          accountType: 'None',
          paymentDueDay: '',
          statementClosingDay: '',
          installmentAmount: '',
          comments: ''
        })
      })
      .catch(error => {
        console.log(error)
        this.setState({
          msg: error.message
        })
      });
  }

  componentDidMount = () => {
    fetch("/api/v1/money/Account")
      .then(res => res.json())
      .then((data) => {
        this.setState({
          accounts: [{ name: "Select Account", accountId: 0 }, ...data]
        })
      })
  }

  render() {
    return (
      <div className="col-6 container">
        <form onSubmit={this.addTransaction}>
          {
            this.state.msg && (
              <div className="row">
                <div className="col-12 msg"><span>{this.state.msg}</span></div>
              </div>
            )
          }

          <div className="row">
            <div className="col-12">
              <div><h1>Add Account</h1></div>
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <label htmlFor="name">Name</label>
            </div>
            <div className="col-9">
              <input type='text' name='name' onChange={this.setValue} value={this.state.name} placeholder="Enter account name"/>
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <label htmlFor="initialBalance">Initial Balance</label>
            </div>
            <div className="col-9">
              <input type='text' name='initialBalance' onChange={this.setValue} value={this.state.initialBalance} placeholder="Enter initial balance"/>
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <label htmlFor="currentBalance">Current Balance</label>
            </div>
            <div className="col-9">
              <input type='text' name='currentBalance' onChange={this.setValue} value={this.state.currentBalance} placeholder="Enter current balance"/>
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <label htmlFor="accountType">Type of Account</label>
            </div>
            <div className="col-9">
              <select name="accountType" value={this.state.accountType} onChange={this.setValue}>
                <option value="None">Select Type</option>
                <option value="Checking">Checking</option>
                <option value="Saving">Savings</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Certicate of Deposit">Certicate of Deposit</option>
                <option value="401K">401K</option>
                <option value="Loan">Loan</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <label htmlFor="paymentDueDay">Payment Due Day</label>
            </div>
            <div className="col-9">
              <input type='text' name='paymentDueDay' onChange={this.setValue} value={this.state.paymentDueDay} placeholder="MM/DD/YYYY" />
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <label htmlFor="statementClosingDay">Statement Closing Day</label>
            </div>
            <div className="col-9">
              <input type='text' name='statementClosingDay' onChange={this.setValue} value={this.state.statementClosingDay} placeholder="MM/DD/YYYY" />
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <label htmlFor="installmentAmount">Installment Amount</label>
            </div>
            <div className="col-9">
              <input type='text' name='installmentAmount' onChange={this.setValue} value={this.state.installmentAmount} placeholder="Enter installment amount" />
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <label htmlFor="comments">Comments</label>
            </div>
            <div className="col-9">
              <input type='text' name='comments' onChange={this.setValue} value={this.state.comments} placeholder="Enter comments" />
            </div>
          </div>

          <div className="row">
            <div className="col-3"></div>
            <div className="col-9">
              <input type='submit' />
            </div>
          </div>

        </form >
      </div>
    );
  }
}

export default AddAccount