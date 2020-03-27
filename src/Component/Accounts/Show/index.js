import React, { useState, useEffect } from 'react'

const ShowAccount = () => {

    const [accounts, setAccounts] = useState([])

    useEffect(() => {
        const fetchAccounts = () => {
            fetch("/Account")
                .then(res => res.json())
                .then(setAccounts)
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
                        accounts.map((account) => {
                            return (
                                <tr key={account.accountId}>
                                    <td>{account.accountId}</td>
                                    <td>{account.name}</td>
                                    <td>{account.initialBalance}</td>
                                    <td>{account.currentBalance}</td>
                                    <td>{account.accountType}</td>
                                    <td>{account.paymentDueDay}</td>
                                    <td>{account.statementClosingDay}</td>
                                    <td>{account.installmentAmount}</td>
                                    <td>{account.comments}</td>
                                    <td>{account.createdDate}</td>
                                    <td>{account.modifiedDate}</td>
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