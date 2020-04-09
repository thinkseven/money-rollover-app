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
            <div>
                <form onSubmit={this.addTransaction}>
                    {
                        this.state.msg && (
                            <div>
                                <p>{this.state.msg}</p>
                            </div>
                        )
                    }

                    <div>
                        <div></div>
                        <div>
                            <div>Add Transaction</div>
                        </div>
                    </div>

                    <div>
                        <div>
                            <label htmlFor="selectAccount">Select Account</label>
                        </div>
                        <div>
                            <select name="selectAccount" onChange={this.setAccount}>
                                {
                                    this.state.accounts && this.state.accounts.map((account) => {
                                        return <option key={account.accountId} value={account.accountId}>{account.name}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    <div>
                        <div>
                            <label htmlFor="txtName">Name of Transaction</label>
                        </div>
                        <div>
                            <input type='text' name='txtName' onChange={this.setName} value={this.state.name} />
                        </div>
                    </div>

                    <div>
                        <div>
                            <label htmlFor="txtAmount">Amount</label>
                        </div>
                        <div>
                            <input type='text' name='txtAmount' onChange={this.setAmount} value={this.state.amount} />
                        </div>
                    </div>

                    <div>
                        <div>
                            <label htmlFor="txtDate">Due Date</label>
                        </div>
                        <div>
                            <input type='text' name='dueDate' onChange={this.setDate} value={this.state.dueDate} />
                        </div>
                    </div>

                    <div>
                        <div>
                            <label htmlFor="txtDate">Post Date</label>
                        </div>
                        <div>
                            <input type='text' name='postDate' onChange={this.setDate} value={this.state.postDate} />
                        </div>
                    </div>

                    <div>
                        <div>
                            <label htmlFor="transactionType">Type of transaction</label>
                        </div>
                        <div>
                            <select name="transactionType" onChange={this.setType}>
                                <option value="None">Select Type</option>
                                <option value="Debit">Debit</option>
                                <option value="Credit">Credit</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <div>
                            <label htmlFor="txtComments">Comments</label>
                        </div>
                        <div>
                            <input type='text' name='txtComments' onChange={this.setComments} value={this.state.comments} />
                        </div>
                    </div>

                    <div>
                        <div></div>
                        <div>
                            <input type='submit' />
                        </div>
                    </div>
                </form >
            </div>
        );
    }
}

export default AddTransaction