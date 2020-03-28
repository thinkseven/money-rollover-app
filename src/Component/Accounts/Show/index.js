import React, { useState, useEffect } from 'react'
import moment from 'moment';

const Edit = (props) => {

    const [isEditable, setEditable] = useState(false);
    const [account, setAccount] = useState(props.account)

    const updateAccount = (event) => {
        setEditable(false)

        const modifiedAccount = {
            [event.target.name]: event.target.value
        }

        setAccount({ ...account, ...modifiedAccount })

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = {
            name: account.name,
            initialBalance: account.initialBalance,
            currentBalance: account.currentBalance,
            accountType: account.accountType,
            paymentDueDay: account.paymentDueDay,
            statementClosingDay: account.statementClosingDay,
            installmentAmount: account.installmentAmount,
            comments: account.comments
        }

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(raw),
            redirect: 'follow'
        };

        fetch(`/Account/${props.account.accountId}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                props.refreshAccounts()
                console.log(result)
            })
            .catch(error => console.log('error', error));
    }

    return <div>
        {
            !isEditable && (<span onClick={() => {
                setEditable(true)
            }}>{account[props.field]}</span>)
        }
        {
            isEditable && (<input type='text' name={props.field} onChange={(event) => {
                const modifiedAccount = {
                    [event.target.name]: event.target.value
                }
                setAccount({ ...account, ...modifiedAccount })
            }} onBlur={(event) => {
                updateAccount(event)
            }} value={account[props.field]} />)
        }
    </div>
}

const EditType = (props) => {

    const [isEditable, setEditable] = useState(false);
    const [account, setAccount] = useState(props.account)

    const updateAccount = (event) => {
        setEditable(false)

        const modifiedAccount = {
            [event.target.name]: event.target.value
        }

        setAccount({ ...account, ...modifiedAccount })

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = {
            name: account.name,
            initialBalance: account.initialBalance,
            currentBalance: account.currentBalance,
            accountType: account.accountType,
            paymentDueDay: account.paymentDueDay,
            statementClosingDay: account.statementClosingDay,
            installmentAmount: account.installmentAmount,
            comments: account.comments
        }

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(raw),
            redirect: 'follow'
        };

        fetch(`/Account/${props.account.accountId}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                props.refreshAccounts()
                console.log(result)
            })
            .catch(error => console.log('error', error));
    }


    return <div>
        {
            !isEditable && (<span onClick={() => {
                setEditable(true)
            }}>{account[props.field]}</span>)
        }
        {
            isEditable && (
                <select name={props.field} value={account[props.field]} onChange={(event) => {
                    const modifiedAccount = {
                        [event.target.name]: event.target.value
                    }
                    setAccount({ ...account, ...modifiedAccount })
                }} onBlur={(event) => {
                    updateAccount(event)
                }}>
                    <option value="None">Select Type</option>
                    <option value="Checking">Checking</option>
                    <option value="Saving">Savings</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Certicate of Deposit">Certicate of Deposit</option>
                    <option value="401K">401K</option>
                    <option value="Loan">Loan</option>
                </select>
            )
        }
    </div >
}

const ShowAccount = () => {

    const [accounts, setAccounts] = useState([])
    const [loading, setLoading] = useState(true)

    const refreshAccounts = () => {
        fetch("/Account")
            .then(res => res.json())
            .then((data) => {
                setAccounts(data)
                setLoading(false)
            })
    }

    useEffect(() => {
        const fetchAccounts = () => {
            fetch("/Account")
                .then(res => res.json())
                .then((data) => {
                    setAccounts(data)
                    setLoading(false)
                })
        }
        fetchAccounts()
    }, [])

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>
                            Account Id
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Initial Balance
                        </th>
                        <th>
                            Current Balance
                        </th>
                        <th>
                            Account Type
                        </th>
                        <th>
                            Payment Due Day
                        </th>
                        <th>
                            Statement Closing Day
                        </th>
                        <th>
                            Installment Amount
                        </th>
                        <th>
                            Comments
                        </th>
                        <th>
                            Created Date
                        </th>
                        <th>
                            Modified Date
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !loading && accounts.map((account) => {
                            return (
                                <tr key={account.accountId}>
                                    <td>{account.accountId}</td>
                                    <td><Edit field="name" account={account} refreshAccounts={refreshAccounts} /></td>
                                    <td><Edit field="initialBalance" account={account} refreshAccounts={refreshAccounts} /></td>
                                    <td><Edit field="currentBalance" account={account} refreshAccounts={refreshAccounts} /></td>
                                    <td><EditType field="accountType" account={account} refreshAccounts={refreshAccounts} /></td>
                                    <td><Edit field="paymentDueDay" account={account} refreshAccounts={refreshAccounts} /></td>
                                    <td><Edit field="statementClosingDay" account={account} refreshAccounts={refreshAccounts} /></td>
                                    <td><Edit field="installmentAmount" account={account} refreshAccounts={refreshAccounts} /></td>
                                    <td><Edit field="comments" account={account} refreshAccounts={refreshAccounts} /></td>
                                    <td>{moment(account.createdDate).format('MMM DD')}</td>
                                    <td>{moment(account.modifiedDate).format('MMM DD')}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ShowAccount