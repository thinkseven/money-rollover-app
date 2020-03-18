import React, { Component } from 'react'

class AddTransaction extends Component {

    state = {
        account: {},
        amount1: null,
        amount2: null
    }

    setAccount = (event) => {
        let val = event.target.value;
        const account = this.props.accounts.find((acc) => {
            return acc.id === parseInt(val)
        })
        if (account) {
            this.setState({
                account: account,
                amount1: null,
                amount2: null
            })
        }
    }

    setAmount = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({
            [nam]: val
        });
    }

    addTransaction = (event) => {
        event.preventDefault();

        let transaction = {
            nameOfTransaction: this.state.account.name,
            dueAmount: this.state.amount1,
            dateOfTransaction: "02/01/2020"
        }

        if (typeof (this.state.account.billedTo) === 'object') {
            const transactions = this.state.account.billedTo.map((accountNo) => {
                if (accountNo === 1) {
                    return {
                        toAccount: 1,
                        amount: this.state.amount1,
                        type: this.state.account.billingDay ? 'Debit' : 'Credit'
                    }
                }
                if (accountNo === 2) {
                    return {
                        toAccount: 2,
                        amount: this.state.amount2,
                        type: this.state.account.billingDay ? 'Debit' : 'Credit'
                    }
                }
                return []
            })
            transaction = Object.assign({
                transactions: [...transactions]
            }, transaction)
        }
        else {
            const transactions = [{
                toAccount: this.state.account.billedTo,
                amount: this.state.amount1,
                type: this.state.account.billingDay ? 'Debit' : 'Credit'
            }]
            transaction = Object.assign({
                transactions: [...transactions]
            }, transaction)
        }
        this.props.setTransaction(transaction);
    }

    componentDidMount = () => {
        const account = this.props.accounts.find((acc) => {
            return acc.bill === true
        });
        if (account) {
            this.setState({
                account: account,
                amount1: null,
                amount2: null
            })
        }
    }

    render() {
        return (
            <form onSubmit={this.addTransaction}>
                <div>{JSON.stringify(this.state)}</div>
                <div>
                    <div style={{
                        display: 'inline'
                    }}>
                        <label>
                            Name of Transaction
                            <select onChange={this.setAccount}>
                                {
                                    this.props.accounts.map((account) => {
                                        if (account.bill) {
                                            return <option key={account.id} value={account.id}>{account.name}</option>
                                        }
                                        return ''
                                    })
                                }
                            </select>
                        </label>

                    </div>
                    <div style={{
                        display: 'inline'
                    }}>
                        <label>
                            Amount
                            <input type='text' name='amount1' onChange={this.setAmount}
                            />
                        </label>
                    </div>
                    <div style={{
                        display: (typeof (this.state.account.billedTo) === 'object' ? 'inline' : 'none')
                    }}>
                        <label>
                            Amount
                            <input type='text' name='amount2' onChange={this.setAmount} />
                        </label>
                    </div>
                    <div style={{
                        display: 'inline'
                    }}>
                        <input type='submit' />
                    </div>
                </div>
            </form>
        );
    }
}

export default AddTransaction