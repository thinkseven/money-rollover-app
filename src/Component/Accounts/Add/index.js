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
            <div class="w-full max-w-sm">
                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={this.addTransaction}>

                    {
                        this.state.msg && (
                            <div class="md:flex md:items-center py-4">
                                <p class="text-red-500 text-xs italic">{this.state.msg}</p>
                            </div>
                        )
                    }

                    <div class="md:flex md:items-center">
                        <div class="md:w-1/3"></div>
                        <div class="md:w-2/3">
                            <div class="font-bold text-xl mb-2">Add Account</div>
                        </div>
                    </div>

                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label htmlFor="name" class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Name</label>
                        </div>
                        <div class="md:w-2/3">
                            <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type='text' name='name' onChange={this.setValue} value={this.state.name} />
                        </div>
                    </div>

                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label htmlFor="initialBalance" class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Initial Balance</label>
                        </div>
                        <div class="md:w-2/3">
                            <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type='text' name='initialBalance' onChange={this.setValue} value={this.state.initialBalance} />
                        </div>
                    </div>

                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label htmlFor="currentBalance" class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Current Balance</label>
                        </div>
                        <div class="md:w-2/3">
                            <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type='text' name='currentBalance' onChange={this.setValue} value={this.state.currentBalance} />
                        </div>
                    </div>

                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label htmlFor="accountType" class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Type of Account</label>
                        </div>
                        <div class="md:w-2/3">
                            <select class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="accountType" value={this.state.accountType} onChange={this.setValue}>
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

                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label htmlFor="paymentDueDay" class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Payment Due Day</label>
                        </div>
                        <div class="md:w-2/3">
                            <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type='text' name='paymentDueDay' onChange={this.setValue} value={this.state.paymentDueDay} />
                        </div>
                    </div>

                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label htmlFor="statementClosingDay" class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Statement Closing Day</label>
                        </div>
                        <div class="md:w-2/3">
                            <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type='text' name='statementClosingDay' onChange={this.setValue} value={this.state.statementClosingDay} />
                        </div>
                    </div>

                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label htmlFor="installmentAmount" class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Installment Amount</label>
                        </div>
                        <div class="md:w-2/3">
                            <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type='text' name='installmentAmount' onChange={this.setValue} value={this.state.installmentAmount} />
                        </div>
                    </div>

                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label htmlFor="comments" class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Comments</label>
                        </div>
                        <div class="md:w-2/3">
                            <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type='text' name='comments' onChange={this.setValue} value={this.state.comments} />
                        </div>
                    </div>

                    <div class="md:flex md:items-center">
                        <div class="md:w-1/3"></div>
                        <div class="md:w-2/3">
                            <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type='submit' />
                        </div>
                    </div>

                </form >
            </div>
        );
    }
}

export default AddAccount