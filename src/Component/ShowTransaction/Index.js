import React, { Component } from 'react';
import transactions from './Transactions'

const Transaction = (props) => {
  if (props.transactions.length == 2) {
    return props.transactions.map((transaction, index) => {
      return <td>{transaction.Amount}</td>
    })
  } else if (props.transactions.length == 1) {
    return props.transactions.map((transaction, index) => {
      if (transaction.ToAccount == 1) {
        return (
          <React.Fragment>
            <td>{transaction.Amount}</td>
            <td></td>
          </React.Fragment>
        )
      }
      if (transaction.ToAccount == 2) {
        return (
          <React.Fragment>
            <td></td>
            <td>{transaction.Amount}</td>
          </React.Fragment>
        )
      }
    })
  }
  return (
    <React.Fragment>
      <td></td>
      <td></td>
    </React.Fragment>
  )
}

const ShowTransaction = () => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              Name of Transaction
            </th>
            <th>
              Due Date
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
                  <td>{entry.NameOfTransaction}</td>
                  <td>{entry.DateOfTransaction}</td>
                  <td>{entry.DueAmount}</td>
                  <Transaction transactions={entry.transactions}></Transaction>
                  <td>{entry.RolloverBalance1}</td>
                  <td>{entry.RolloverBalance2}</td>
                  <td>{entry.RolloverBalance1 + entry.RolloverBalance2}</td>
                  <td>{entry.Comments}</td>
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