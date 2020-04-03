import React, { Component } from 'react';

class AddTransaction extends Component {

    state = {
        accounts: [],
        accountId: 1,
        name: '',
        amount: 0,
        dueDate: '',
        postDate: '',
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
            [event.target.name]: event.target.value
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
            dueDate: new Date(this.state.dueDate),
            postDate: new Date(this.state.postDate),
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
            .then((response) => {
                if (!response.ok) {
                    throw Error("Failed to create transaction due to error!!");
                }
                return response.text()
            })
            .then(response => {
                console.log(response)
                this.setState({
                    msg: "Transaction created successfully!!"
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
                            <div class="font-bold text-xl mb-2">Add Transaction</div>
                        </div>
                    </div>

                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="selectAccount">Select Account</label>
                        </div>
                        <div class="md:w-2/3">
                            <select class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="selectAccount" onChange={this.setAccount}>
                                {
                                    this.state.accounts && this.state.accounts.map((account) => {
                                        return <option key={account.accountId} value={account.accountId}>{account.name}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="txtName">Name of Transaction</label>
                        </div>
                        <div class="md:w-2/3">
                            <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type='text' name='txtName' onChange={this.setName} value={this.state.name} />
                        </div>
                    </div>

                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="txtAmount">Amount</label>
                        </div>
                        <div class="md:w-2/3">
                            <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type='text' name='txtAmount' onChange={this.setAmount} value={this.state.amount} />
                        </div>
                    </div>

                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="txtDate">Due Date</label>
                        </div>
                        <div class="md:w-2/3">
                            <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type='text' name='dueDate' onChange={this.setDate} value={this.state.dueDate} />
                        </div>
                    </div>

                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="txtDate">Post Date</label>
                        </div>
                        <div class="md:w-2/3">
                            <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type='text' name='postDate' onChange={this.setDate} value={this.state.postDate} />
                        </div>
                    </div>

                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="transactionType">Type of transaction</label>
                        </div>
                        <div class="md:w-2/3">
                            <select class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="transactionType" onChange={this.setType}>
                                <option value="None">Select Type</option>
                                <option value="Debit">Debit</option>
                                <option value="Credit">Credit</option>
                            </select>
                        </div>
                    </div>

                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="txtComments">Comments</label>
                        </div>
                        <div class="md:w-2/3">
                            <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type='text' name='txtComments' onChange={this.setComments} value={this.state.comments} />
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

export default AddTransaction