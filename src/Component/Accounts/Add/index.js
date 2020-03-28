import React, { Component } from 'react';

class AddAccount extends Component {

    state = {
        name: null,
        initialBalance: 0,
        currentBalance: 0,
        accountType: 'None',
        paymentDueDay: 1,
        statementClosingDay: 1,
        installmentAmount: 0,
        comments: null,
        msg: null
    }

    setValue = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // setAccount = (event) => {
    //     this.setState({
    //         accountId: event.target.value
    //     })
    // }

    // setAmount = (event) => {
    //     this.setState({
    //         amount: event.target.value
    //     });
    // }

    // setName = (event) => {
    //     this.setState({
    //         name: event.target.value
    //     });
    // }

    // setDate = (event) => {
    //     this.setState({
    //         transactionDate: event.target.value
    //     });
    // }

    // setType = (event) => {
    //     this.setState({
    //         transactionType: event.target.value
    //     });
    // }

    // setComments = (event) => {
    //     this.setState({
    //         comments: event.target.value
    //     });
    // }

    addTransaction = (event) => {
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = {
            name: this.state.name,
            initialBalance: this.state.initialBalance,
            currentBalance: this.state.currentBalance,
            accountType: this.state.accountType,
            paymentDueDay: this.state.paymentDueDay,
            statementClosingDay: this.state.statementClosingDay,
            installmentAmount: this.state.installmentAmount,
            comments: this.state.comments
        }

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(raw),
            redirect: 'follow'
        };

        fetch("/Account", requestOptions)
            .then(response => response.text())
            .then(result => this.setState({
                msg: "account saved succesfully!!"
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
                            <label htmlFor="name">Name</label>
                            <input type='text' name='name' onChange={this.setValue} value={this.state.name} />
                        </div>

                        <div>
                            <label htmlFor="initialBalance">Initial Balance</label>
                            <input type='text' name='initialBalance' onChange={this.setValue} value={this.state.initialBalance} />
                        </div>

                        <div>
                            <label htmlFor="currentBalance">Current Balance</label>
                            <input type='text' name='currentBalance' onChange={this.setValue} value={this.state.currentBalance} />
                        </div>

                        <div>
                            <label htmlFor="accountType">Type of Account</label>
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

                        <div>
                            <label htmlFor="paymentDueDay">Payment Due Day</label>
                            <input type='text' name='paymentDueDay' onChange={this.setValue} value={this.state.paymentDueDay} />
                        </div>

                        <div>
                            <label htmlFor="statementClosingDay">Statement Closing Day</label>
                            <input type='text' name='statementClosingDay' onChange={this.setValue} value={this.state.statementClosingDay} />
                        </div>

                        <div>
                            <label htmlFor="installmentAmount">Installment Amount</label>
                            <input type='text' name='installmentAmount' onChange={this.setValue} value={this.state.installmentAmount} />
                        </div>

                        <div>
                            <label htmlFor="comments">Comments</label>
                            <input type='text' name='comments' onChange={this.setValue} value={this.state.comments} />
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

export default AddAccount