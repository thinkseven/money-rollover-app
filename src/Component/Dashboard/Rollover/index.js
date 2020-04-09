import React, { useState, useEffect } from 'react';
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

  const setBackground = (transaction) => {
    if (moment(transaction.postDate).isBefore(moment()) && moment(transaction.dueDate).isBefore(moment())) {
      return {
        backgroundColor: 'green'
      } // paid and verified
    } else if (moment(transaction.postDate).isBefore(moment(transaction.dueDate))) {
      return {
        backgroundColor: 'yellow'
      } // paid but not verified
    } else if (moment(transaction.dueDate).isAfter(moment()) && moment(transaction.dueDate).isSame(moment(), 'month')) {
      return {
        backgroundColor: 'red'
      } // not yet paid this month transactions
    }
    return {
      backgroundColor: 'gray'
    }
  }

  return (
    <React.Fragment>
      <td>
        {
          props.transactions.reduce((acc, transaction) => { return acc + transaction.amount }, 0)
        }
      </td>
      {
        props.accounts.filter((account) => {
          return account.accountType !== "401K"
        }).map((account) => {
          let transactionFound = getTransactionForThisAccount(account.accountId, props.transactions)
          if (transactionFound) {
            return (<td style={setBackground(transactionFound)}><div><div>{transactionFound.rolloverBalance}</div><div>{transactionFound.amount}</div></div></td>)
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
        {account.name}
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
      fetch("/Account")
        .then(res => res.json())
        .then((accounts) => {
          fetch("/Transaction")
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
    <div>
      <table>
        <thead>
          <tr>
            <th>
              Transaction Date
            </th>
            <th>
              Name
            </th>
            <th>
              Amount
            </th>
            <DisplayAccounts accounts={accounts} />
          </tr>
        </thead>
        <tbody>
          {
            !loading && Object.entries(transactions).map(([dueDate, value, index]) => {
              return value.map((transactionGroup) => {
                return Object.entries(transactionGroup).map(([transactionName, value, index]) => {
                  return (
                    <tr>
                      <td><span style={{ whiteSpace: 'pre' }}>{moment(dueDate).format("ddd[\r\n]MMM D")}</span></td>
                      <td>{transactionName}</td>
                      <Transactions transactions={value} accounts={accounts}></Transactions>
                    </tr>
                  )
                })
              })
            })
          }
        </tbody>
      </table>
    </div >
  )
}

export default ShowTransaction;