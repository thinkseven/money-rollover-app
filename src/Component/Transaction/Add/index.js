import React, { Component } from 'react';

class AddTransaction extends Component {

    state = {
        accounts: [],
        accountId: 1,
        name: '',
        amount: 0,
        transactionDate: '',
        transactionType: '',
        comments: ''
    }

    setAccount = (event) => {
        this.setState({
            accountId: event.target.value
        })
    }

    setAmount = (event) => {
        this.setState({
            amount: event.target.value
        });
    }

    setName = (event) => {
        this.setState({
            name: event.target.value
        });
    }

    setDate = (event) => {
        this.setState({
            transactionDate: event.target.value
        });
    }

    setType = (event) => {
        this.setState({
            transactionType: event.target.value
        });
    }

    setComments = (event) => {
        this.setState({
            comments: event.target.value
        });
    }

    addTransaction = (event) => {
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = {
            accountId: this.state.accountId,
            name: this.state.name,
            transactionDate: new Date(this.state.transactionDate),
            amount: this.state.amount,
            transactionType: this.state.transactionType === 'Debit' ? true : false,
            comments: this.state.comments
        }

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(raw),
            redirect: 'follow'
        };

        fetch("/Transaction", requestOptions)
            .then(response => response.text())
            .then(result => this.setState({
                msg: "transaction saved succesfully!!"
            }))
            .catch(error => this.setState({
                msg: error.message
            }));
    }

    componentDidMount = () => {
        fetch("/Account")
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    accounts: [{ name: "Select Account", accountId: 0 }, ...data]
                })
            })
    }

    render() {
        return (
            <form onSubmit={this.addTransaction}>
                <div>
                    <div>{this.state.msg}</div>
                    <div>

                        <div>

                            <label htmlFor="selectAccount">Select Account</label>
                            <select name="selectAccount" onChange={this.setAccount}>
                                {
                                    this.state.accounts && this.state.accounts.map((account) => {
                                        return <option key={account.accountId} value={account.accountId}>{account.name}</option>
                                    })
                                }
                            </select>

                        </div>

                        <div>
                            <label htmlFor="txtName">Name of Transaction</label>
                            <input type='text' name='txtName' onChange={this.setName} value={this.state.name} />
                        </div>

                        <div>

                            <label htmlFor="txtAmount">Amount</label>
                            <input type='text' name='txtAmount' onChange={this.setAmount} value={this.state.amount} />
                        </div>

                        <div>
                            <label htmlFor="txtDate">Date</label>
                            <input type='text' name='txtDate' onChange={this.setDate} value={this.state.transactionDate} />
                        </div>

                        <div>
                            <label htmlFor="transactionType">Type of transaction</label>
                            <select name="transactionType" onChange={this.setType}>
                                <option value="None">Select Type</option>
                                <option value="Debit">Debit</option>
                                <option value="Credit">Credit</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="txtComments">Comments</label>
                            <input type='text' name='txtComments' onChange={this.setComments} value={this.state.comments} />
                        </div>

                        <div>
                            <input type='submit' />
                        </div>
                    </div>
                </div>
            </form >
        );
    }
}

export default AddTransaction