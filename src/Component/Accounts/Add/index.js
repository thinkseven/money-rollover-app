import React, { Component } from 'react';

class AddAccount extends Component {

    state = {
        name: null,
        initialBalance: 0,
        currentBalance: 0,
        accountType: 'None',
        paymentDueDay: null,
        statementClosingDay: null,
        installmentAmount: 0,
        comments: null,
        msg: null
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
            body: JSON.stringify(raw),
            redirect: 'follow'
        };

        fetch("/Account", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw Error("Failed to create account due to error!!");
                }
                return response.text()
            })
            .then(response => {
                console.log(response)
                this.setState({
                    msg: "Account created successfully!!"
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
            <div class="col-9 container">
                <form onSubmit={this.addTransaction}>
                    {
                        this.state.msg && (
                            <div class="row">
                                <div class="col-12"><span>{this.state.msg}</span></div>
                            </div>
                        )
                    }

                    <div class="row">
                        <div class="col-12">
                            <div>Add Account</div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-3">
                            <label htmlFor="name">Name</label>
                        </div>
                        <div class="col-9">
                            <input type='text' name='name' onChange={this.setValue} value={this.state.name} />
                        </div>
                    </div>

                    <div class="row">
                        <div  class="col-3">
                            <label htmlFor="initialBalance">Initial Balance</label>
                        </div>
                        <div  class="col-9">
                            <input type='text' name='initialBalance' onChange={this.setValue} value={this.state.initialBalance} />
                        </div>
                    </div>

                    <div class="row">
                        <div  class="col-3">
                            <label htmlFor="currentBalance">Current Balance</label>
                        </div>
                        <div  class="col-9">
                            <input type='text' name='currentBalance' onChange={this.setValue} value={this.state.currentBalance} />
                        </div>
                    </div>

                    <div class="row">
                        <div  class="col-3">
                            <label htmlFor="accountType">Type of Account</label>
                        </div>
                        <div  class="col-9">
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

                    <div class="row">
                        <div  class="col-3">
                            <label htmlFor="paymentDueDay">Payment Due Day</label>
                        </div>
                        <div  class="col-9">
                            <input type='text' name='paymentDueDay' onChange={this.setValue} value={this.state.paymentDueDay} />
                        </div>
                    </div>

                    <div class="row">
                        <div  class="col-3">
                            <label htmlFor="statementClosingDay">Statement Closing Day</label>
                        </div>
                        <div  class="col-9">
                            <input type='text' name='statementClosingDay' onChange={this.setValue} value={this.state.statementClosingDay} />
                        </div>
                    </div>

                    <div class="row">
                        <div  class="col-3">
                            <label htmlFor="installmentAmount">Installment Amount</label>
                        </div>
                        <div  class="col-9">
                            <input type='text' name='installmentAmount' onChange={this.setValue} value={this.state.installmentAmount} />
                        </div>
                    </div>

                    <div class="row">
                        <div  class="col-3">
                            <label htmlFor="comments">Comments</label>
                        </div>
                        <div  class="col-9">
                            <input type='text' name='comments' onChange={this.setValue} value={this.state.comments} />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-3"></div>
                        <div  class="col-9">
                            <input type='submit' />
                        </div>
                    </div>

                </form >
            </div>
        );
    }
}

export default AddAccount