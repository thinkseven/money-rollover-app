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
  return (
    <React.Fragment>
      <td class="border px-4 py-2">
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
            return (<td class="border px-4 py-2">{transactionFound.rolloverBalance}</td>)
          }
          else {
            return (<td class="border px-4 py-2"></td>)
          }
        })
      }
    </React.Fragment>
  )
}

const DisplayAccounts = (props) => {
  return props.accounts.map((account) => {
    return account.accountType !== "401K" && (
      <th class="border px-4 py-2" key={account.accountId}>
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
      <table class="table-auto border-collapse border-2 border-gray-500">
        <thead>
          <tr>
            <th class="border px-4 py-2">
              Transaction Date
            </th>
            <th class="border px-4 py-2">
              Name
            </th>
            <th class="border px-4 py-2">
              Amount
            </th>
            <DisplayAccounts accounts={accounts} />
            {/* <th class="border px-4 py-2">
              Rollover Balance
            </th>
            <th class="border px-4 py-2">
              Rollover Balance
            </th>
            <th class="border px-4 py-2">
              Total
            </th> */}
          </tr>
        </thead>
        <tbody>
          {
            !loading && Object.entries(transactions).map(([transactionDate, value, index]) => {
              return value.map((transactionGroup) => {
                return Object.entries(transactionGroup).map(([transactionName, value, index]) => {
                  return (
                    <tr>
                      <td class="border px-4 py-2">{moment(transactionDate).format("MMM DD")}</td>
                      <td class="border px-4 py-2">{transactionName}</td>
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