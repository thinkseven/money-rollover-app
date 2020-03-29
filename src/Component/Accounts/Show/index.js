import React, { useState, useEffect } from 'react'
import moment from 'moment';

const Edit = (props) => {

    const [isEditable, setEditable] = useState(false);
    const [fieldValue, setFieldValue] = useState(props.account[props.field]);

    const updateAccount = (event) => {

        setEditable(false)

        const modifiedAccount = {
            [event.target.name]: event.target.value
        }

        const updateAccount = { ...props.account, ...modifiedAccount }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = {
            name: updateAccount.name,
            initialBalance: updateAccount.initialBalance,
            currentBalance: updateAccount.currentBalance,
            accountType: updateAccount.accountType,
            paymentDueDay: updateAccount.paymentDueDay,
            statementClosingDay: updateAccount.statementClosingDay,
            installmentAmount: updateAccount.installmentAmount,
            comments: updateAccount.comments
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
            }}>{fieldValue}</span>)
        }
        {
            isEditable && (<input type='text' name={props.field} onChange={(event) => {
                setFieldValue(event.target.value)
            }} onBlur={(event) => {
                updateAccount(event)
            }} value={fieldValue} />)
        }
    </div>
}

const EditType = (props) => {

    const [isEditable, setEditable] = useState(false);
    const [fieldValue, setFieldValue] = useState(props.account[props.field])

    const updateAccount = (event) => {
        setEditable(false)

        const modifiedAccount = {
            [event.target.name]: event.target.value
        }

        const updateAccount = { ...props.account, ...modifiedAccount }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = {
            name: updateAccount.name,
            initialBalance: updateAccount.initialBalance,
            currentBalance: updateAccount.currentBalance,
            accountType: updateAccount.accountType,
            paymentDueDay: updateAccount.paymentDueDay,
            statementClosingDay: updateAccount.statementClosingDay,
            installmentAmount: updateAccount.installmentAmount,
            comments: updateAccount.comments
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
            }}>{fieldValue}</span>)
        }
        {
            isEditable && (
                <select name={props.field} value={fieldValue} onChange={(event) => {
                    setFieldValue(event.target.value)
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
            <table class="table-auto border-collapse border-2 border-gray-500">
                <thead>
                    <tr>
                        <th class="border px-4 py-2">
                            Account Id
                        </th>
                        <th class="border px-4 py-2">
                            Name
                        </th>
                        <th class="border px-4 py-2">
                            Initial Balance
                        </th>
                        <th class="border px-4 py-2">
                            Current Balance
                        </th>
                        <th class="border px-4 py-2">
                            Account Type
                        </th>
                        <th class="border px-4 py-2">
                            Payment Due Day
                        </th>
                        <th class="border px-4 py-2">
                            Statement Closing Day
                        </th>
                        <th class="border px-4 py-2">
                            Installment Amount
                        </th>
                        <th class="border px-4 py-2">
                            Comments
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !loading && accounts.map((account) => {
                            return (
                                <tr key={account.accountId}>
                                    <td class="border px-4 py-2">{account.accountId}</td>
                                    <td class="border px-4 py-2"><Edit field="name" account={account} refreshAccounts={refreshAccounts} /></td>
                                    <td class="border px-4 py-2"><Edit field="initialBalance" account={account} refreshAccounts={refreshAccounts} /></td>
                                    <td class="border px-4 py-2"><Edit field="currentBalance" account={account} refreshAccounts={refreshAccounts} /></td>
                                    <td class="border px-4 py-2"><EditType field="accountType" account={account} refreshAccounts={refreshAccounts} /></td>
                                    <td class="border px-4 py-2"><Edit field="paymentDueDay" account={account} refreshAccounts={refreshAccounts} /></td>
                                    <td class="border px-4 py-2"><Edit field="statementClosingDay" account={account} refreshAccounts={refreshAccounts} /></td>
                                    <td class="border px-4 py-2"><Edit field="installmentAmount" account={account} refreshAccounts={refreshAccounts} /></td>
                                    <td class="border px-4 py-2"><Edit field="comments" account={account} refreshAccounts={refreshAccounts} /></td>
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