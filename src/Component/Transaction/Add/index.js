import React, { Component } from 'react';

class AddTransaction extends Component {

  state = {
    accounts: [],
    accountId: 0,
    name: '',
    amount: 0,
    dueDate: '',
    postDate: '',
    transactionType: '',
    comments: '',
    msg: ''
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
      accountId: this.state.accountId,
      name: this.state.name,
      dueDate: new Date(this.state.dueDate),
      postDate: new Date(this.state.postDate),
      amount: this.state.amount,
      transactionType: this.state.transactionType === 'Debit' ? true : false,
      comments: this.state.comments
    }

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(raw)
    };

    fetch("/api/v1/money/Transaction", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw Error("Failed to create transaction due to error!!");
        }
        return response.text()
      })
      .then(response => {
        console.log(response)
        this.setState({
          msg: "Transaction created successfully!!",
          accountId: 0,
          name: '',
          amount: 0,
          dueDate: '',
          postDate: '',
          transactionType: '',
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
      <div className="col-9 container">
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
              <div>Add Transaction</div>
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <label htmlFor="accountId">Select Account</label>
            </div>
            <div className="col-9">
              <select name="accountId" value={this.state.accountId} onChange={this.setValue}>
                {
                  this.state.accounts && this.state.accounts.map((account) => {
                    return <option key={account.accountId} value={account.accountId}>{account.name}</option>
                  })
                }
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <label htmlFor="name">Name of Transaction</label>
            </div>
            <div className="col-9">
              <input type='text' name='name' onChange={this.setValue} value={this.state.name} />
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <label htmlFor="amount">Amount</label>
            </div>
            <div className="col-9">
              <input type='text' name='amount' onChange={this.setValue} value={this.state.amount} />
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <label htmlFor="dueDate">Due Date</label>
            </div>
            <div className="col-9">
              <input type='text' name='dueDate' onChange={this.setValue} value={this.state.dueDate} />
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <label htmlFor="postDate">Post Date</label>
            </div>
            <div className="col-9">
              <input type='text' name='postDate' onChange={this.setValue} value={this.state.postDate} />
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <label htmlFor="transactionType">Type of transaction</label>
            </div>
            <div className="col-9">
              <select name="transactionType" value={this.state.transactionType} onChange={this.setValue}>
                <option value="None">Select Type</option>
                <option value="Debit">Debit</option>
                <option value="Credit">Credit</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <label htmlFor="comments">Comments</label>
            </div>
            <div className="col-9">
              <input type='text' name='comments' onChange={this.setValue} value={this.state.comments} />
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

export default AddTransaction