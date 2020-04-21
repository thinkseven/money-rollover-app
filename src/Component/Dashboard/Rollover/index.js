import React, { useState, useEffect } from 'react';
import './index.css';
import moment from 'moment'
import getTransactions from './Transactions'

const getTransactionForThisAccount = (accountId, transactions) => {
  let arrTransaction = transactions.filter((transaction) => {
    return transaction.accountId === accountId
  })
  if (arrTransaction && arrTransaction.length > 0)
    return arrTransaction[0]
  else
    return undefined
}

const Transactions = (props) => {

  return (
    <React.Fragment>
      {/* <td>{props.transactions.amount}</td> */}
      {
        props.accounts.filter((account) => {
          return account.accountType !== "401K"
        }).map((account) => {
          let accountFound = getTransactionForThisAccount(account.accountId, props.transactions.accountBalance)
          if (accountFound && accountFound.amount) {
            return (<td><div><div style={{ fontWeigh: 'bold', fontSize: '18px' }} >{accountFound.currentBalance}</div><div style={{ fontSize: '12px', fontStyle: 'italic' }}>{accountFound.amount}</div></div></td>)
          }
          else if (accountFound && accountFound.amount === null) {
            return (<td><div>{accountFound.currentBalance}</div></td>)
          }
          else {
            return (<td></td>)
          }
        })
      }
    </React.Fragment>
  )
}

const DisplayAccounts = (props) => {
  return props.accounts.map((account) => {
    return account.accountType !== "401K" && (
      <th key={account.accountId}>
        <div>{account.name}</div>
        <div style={{ fontSize: '12px', fontStyle: 'italic' }}>{account.currentBalance}</div>
      </th>
    )
  })
}

const ShowTransaction = () => {

  const [loading, setLoading] = useState(true)
  const [accounts, setAccounts] = useState([])
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const fetchTransactions = () => {
      fetch("/api/v1/money/Account")
        .then(res => res.json())
        .then((accounts) => {
          fetch("/api/v1/money/Transaction")
            .then(res => res.json())
            .then((transactions) => {
              setAccounts(accounts)
              setTransactions(getTransactions(accounts, transactions))
              setLoading(false)
            })
        })
    }
    fetchTransactions()
  }, [])

  return (
    <div className="col-12">
      <h1>Current Month</h1>
      <table>
        <thead>
          <tr>
            <th>
              Date
            </th>
            <th>
              Name
            </th>
            {/* <th>
              Amount
            </th> */}
            <DisplayAccounts accounts={accounts} />
          </tr>
        </thead>
        <tbody>
          {
            !loading && Object.entries(transactions).map(([dueDate, value, index]) => {
              if (moment().month() === moment(dueDate).month()) {
                return value.map((transactionGroup) => {
                  return Object.entries(transactionGroup).map(([transactionName, groupedAccountBalance, index]) => {
                    return (
                      <tr>
                        <td><span style={{ whiteSpace: 'pre' }}>{moment(dueDate).format("ddd[\r\n]MMM D")}</span></td>
                        <td>{transactionName}</td>
                        <Transactions transactions={groupedAccountBalance} accounts={accounts}></Transactions>
                      </tr>
                    )
                  })
                })
              }
            })
          }
        </tbody>
      </table>
      <h1>Next Month</h1>
      <table>
        <thead>
          <tr>
            <th>
              Date
            </th>
            <th>
              Name
            </th>
            {/* <th>
              Amount
            </th> */}
            <DisplayAccounts accounts={accounts} />
          </tr>
        </thead>
        <tbody>
          {
            !loading && Object.entries(transactions).map(([dueDate, value, index]) => {
              if (moment().add(1, 'month').month() === moment(dueDate).month()) {
                return value.map((transactionGroup) => {
                  return Object.entries(transactionGroup).map(([transactionName, groupedAccountBalance, index]) => {
                    return (
                      <tr>
                        <td><span style={{ whiteSpace: 'pre' }}>{moment(dueDate).format("ddd[\r\n]MMM D")}</span></td>
                        <td>{transactionName}</td>
                        <Transactions transactions={groupedAccountBalance} accounts={accounts}></Transactions>
                      </tr>
                    )
                  })
                })
              }
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default ShowTransaction;