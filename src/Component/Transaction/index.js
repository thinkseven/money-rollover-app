import React, { useState, useEffect } from 'react';
import getTransactions, { processTransaction } from './Transactions'

const Transaction = (props) => {
  if (props.accountId === 1) {
    return (
      <React.Fragment>
        <td className={!props.transactionType ? 'credit' : ''}>{props.amount}</td>
        <td></td>
      </React.Fragment>
    )
  }
  if (props.accountId === 2) {
    return (
      <React.Fragment>
        <td></td>
        <td className={!props.transactionType ? 'credit' : ''}>{props.amount}</td>
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      <td></td>
      <td></td>
    </React.Fragment>
  )
}

const ShowTransaction = () => {

  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const fetchTransactions = () => {
      fetch("/Transaction")
        .then(res => res.json())
        .then((data) => {
          setTransactions(getTransactions(data))
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
              Transaction Id
            </th>
            <th>
              Name
            </th>
            <th>
              Transaction Date
            </th>
            <th>
              Amount
            </th>
            <th>
              Bank of America
            </th>
            <th>
              Chase
            </th>
            <th>
              Rollover Balance
            </th>
            <th>
              Rollover Balance
            </th>
            <th>
              Total
            </th>
            <th>
              Comments
            </th>
          </tr>
        </thead>
        <tbody>
          {
            transactions.map((entry, index) => {
              return (
                <tr key={index}>
                  <td>{entry.transactionId}</td>
                  <td>{entry.name}</td>
                  <td>{entry.transactionDate}</td>
                  <td>{entry.amount}</td>
                  <Transaction accountId={entry.accountId} amount={entry.amount} transactionType={entry.transactionType}></Transaction>
                  <td>{parseFloat(entry.rolloverBalance1).toFixed(2)}</td>
                  <td>{parseFloat(entry.rolloverBalance2).toFixed(2)}</td>
                  <td>{parseFloat(entry.rolloverBalance1 + entry.rolloverBalance2).toFixed(2)}</td>
                  <td>{entry.comments}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default ShowTransaction;