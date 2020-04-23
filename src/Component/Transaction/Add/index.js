import React, { Component } from 'react';

const fetchWrapper = (url, method, body, onSuccess, onError) => {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: method,
    headers: myHeaders,
    body: body !== null ? JSON.stringify(body) : ''
  };

  fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw Error("call failed for url", url, response.body);
      }
      return response.text()
    })
    .then(result => {
      console.log(result);
      onSuccess(result);
    })
    .catch(error => {
      console.log(error);
      onError(error);
    });
}

class AddTransaction extends Component {

  state = {
    accounts: [],
    accountId: 0,
    name: '',
    amount: '',
    dueDate: '',
    postDate: '',
    transactionType: '',
    comments: '',
    msg: '',

    accountId1: 0,
    transactionType1: '',
    amount1: '',

    accountId2: 0,
    transactionType2: '',
    amount2: '',

    accountId3: 0,
    transactionType3: '',
    amount3: ''

  }

  setValue = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  setPostDate = (event) => {
    this.setState({
      postDate: event.target.value
    })
  }

  addTransaction = (event) => {

    event.preventDefault();

    var raw = {
      accountId: this.state.accountId,
      name: this.state.name,
      dueDate: new Date(this.state.dueDate),
      postDate: new Date(this.state.postDate),
      amount: this.state.amount,
      transactionType: this.state.transactionType === 'Debit' ? true : false,
      comments: this.state.comments
    }

    fetchWrapper("/api/v1/money/Transaction", "POST", raw, () => {
      this.setState({
        msg: "Transaction created successfully!!",
        accountId: 0,
        name: '',
        amount: '',
        dueDate: '',
        postDate: '',
        transactionType: '',
        comments: '',

        accountId1: 0,
        transactionType1: '',
        amount1: '',

        accountId2: 0,
        transactionType2: '',
        amount2: '',

        accountId3: 0,
        transactionType3: '',
        amount3: ''
      })
    }, (error) => {
      this.setState({
        msg: error.message
      })
    })

    if ((this.state.transactionType1 !== "None" || this.state.transactionType1 !== '') && this.state.accountId1 !== '0' && this.state.amount1 !== '0') {

      var raw1 = {
        accountId: this.state.accountId1,
        name: this.state.name,
        dueDate: new Date(this.state.dueDate),
        postDate: new Date(this.state.postDate),
        amount: this.state.amount1,
        transactionType: this.state.transactionType1 === 'Debit' ? true : false,
        comments: this.state.comments
      }

      fetchWrapper("/api/v1/money/Transaction", "POST", raw1, () => {
        this.setState({
          msg: "Transaction created successfully!!",
          accountId: 0,
          name: '',
          amount: '',
          dueDate: '',
          postDate: '',
          transactionType: '',
          comments: '',

          accountId1: 0,
          transactionType1: '',
          amount1: '',

          accountId2: 0,
          transactionType2: '',
          amount2: '',

          accountId3: 0,
          transactionType3: '',
          amount3: ''

        })
      }, (error) => {
        this.setState({
          msg: error.message
        })
      })
    }

    if ((this.state.transactionType2 !== "None" || this.state.transactionType2 !== '') && this.state.accountId2 !== '0' && this.state.amount2 !== '0') {

      var raw2 = {
        accountId: this.state.accountId2,
        name: this.state.name,
        dueDate: new Date(this.state.dueDate),
        postDate: new Date(this.state.postDate),
        amount: this.state.amount2,
        transactionType: this.state.transactionType2 === 'Debit' ? true : false,
        comments: this.state.comments
      }

      fetchWrapper("/api/v1/money/Transaction", "POST", raw2, () => {
        this.setState({
          msg: "Transaction created successfully!!",
          accountId: 0,
          name: '',
          amount: '',
          dueDate: '',
          postDate: '',
          transactionType: '',
          comments: '',

          accountId1: 0,
          transactionType1: '',
          amount1: '',

          accountId2: 0,
          transactionType2: '',
          amount2: '',

          accountId3: 0,
          transactionType3: '',
          amount3: ''

        })
      }, (error) => {
        this.setState({
          msg: error.message
        })
      })
    }

    if ((this.state.transactionType3 !== "None" || this.state.transactionType3 !== '') && this.state.accountId3 !== '0' && this.state.amount3 !== '0') {

      var raw3 = {
        accountId: this.state.accountId3,
        name: this.state.name,
        dueDate: new Date(this.state.dueDate),
        postDate: new Date(this.state.postDate),
        amount: this.state.amount3,
        transactionType: this.state.transactionType3 === 'Debit' ? true : false,
        comments: this.state.comments
      }

      fetchWrapper("/api/v1/money/Transaction", "POST", raw3, () => {
        this.setState({
          msg: "Transaction created successfully!!",
          accountId: 0,
          name: '',
          amount: '',
          dueDate: '',
          postDate: '',
          transactionType: '',
          comments: '',

          accountId1: 0,
          transactionType1: '',
          amount1: '',

          accountId2: 0,
          transactionType2: '',
          amount2: '',

          accountId3: 0,
          transactionType3: '',
          amount3: ''

        })
      }, (error) => {
        this.setState({
          msg: error.message
        })
      })
    }

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
              <div><h1>Add Transaction</h1></div>
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
              <label htmlFor="name">Name of Transaction</label>
            </div>
            <div className="col-9">
              <input type='text' name='name' onChange={this.setValue} value={this.state.name} placeholder="Enter transaction name" />
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <label htmlFor="amount">Amount</label>
            </div>
            <div className="col-9">
              <input type='text' name='amount' onChange={this.setValue} value={this.state.amount} placeholder="Enter amount" />
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <label htmlFor="dueDate">Due Date</label>
            </div>
            <div className="col-9">
              <input type='text' name='dueDate' onChange={this.setValue} onBlur={this.setPostDate} value={this.state.dueDate} placeholder="MM/DD/YYYY" />
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <label htmlFor="postDate">Post Date</label>
            </div>
            <div className="col-9">
              <input type='text' name='postDate' onChange={this.setValue} value={this.state.postDate} placeholder="MM/DD/YYYY" />
            </div>
          </div>

          <div className="row">

            <div className="row" style={{
              border: '1px solid red',
              borderRadius: '10px'
            }}>
              <div className="col-12">
                1. Account which got debited or credited
            </div>

              <div className="col-4">
                <select name="accountId1" value={this.state.accountId1} onChange={this.setValue}>
                  {
                    this.state.accounts && this.state.accounts.map((account) => {
                      return <option key={account.accountId} value={account.accountId}>{account.name}</option>
                    })
                  }
                </select>
              </div>
              <div className="col-4">
                <select name="transactionType1" value={this.state.transactionType1} onChange={this.setValue}>
                  <option value="None">Select Type</option>
                  <option value="Debit">Debit</option>
                  <option value="Credit">Credit</option>
                </select>
              </div>
              <div className="col-4">
                <input type='text' name='amount1' onChange={this.setValue} value={this.state.amount1} placeholder="Enter amount" />
              </div>
            </div>

            <div className="row" style={{
              border: '1px solid red',
              borderRadius: '10px',
              margin: '2px'
            }}>
              <div className="col-12">
                2. Account which got debited or credited
            </div>

              <div className="col-4">
                <select name="accountId2" value={this.state.accountId2} onChange={this.setValue}>
                  {
                    this.state.accounts && this.state.accounts.map((account) => {
                      return <option key={account.accountId} value={account.accountId}>{account.name}</option>
                    })
                  }
                </select>
              </div>
              <div className="col-4">
                <select name="transactionType2" value={this.state.transactionType2} onChange={this.setValue}>
                  <option value="None">Select Type</option>
                  <option value="Debit">Debit</option>
                  <option value="Credit">Credit</option>
                </select>
              </div>
              <div className="col-4">
                <input type='text' name='amount2' onChange={this.setValue} value={this.state.amount2} placeholder="Enter amount" />
              </div>
            </div>

            <div className="row" style={{
              border: '1px solid red',
              borderRadius: '10px',
              margin: '2px'
            }}>
              <div className="col-12">
                3. Account which got debited or credited
                </div>
              <div className="col-4">
                <select name="accountId3" value={this.state.accountId3} onChange={this.setValue}>
                  {
                    this.state.accounts && this.state.accounts.map((account) => {
                      return <option key={account.accountId} value={account.accountId}>{account.name}</option>
                    })
                  }
                </select>
              </div>
              <div className="col-4">
                <select name="transactionType3" value={this.state.transactionType3} onChange={this.setValue}>
                  <option value="None">Select Type</option>
                  <option value="Debit">Debit</option>
                  <option value="Credit">Credit</option>
                </select>
              </div>
              <div className="col-4">
                <input type='text' name='amount3' onChange={this.setValue} value={this.state.amount3} placeholder="Enter amount" />
              </div>
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
    )
  }
}

export default AddTransaction