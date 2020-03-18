import React from 'react';

const Transaction = (props) => {
  if (props.transactions.length === 2) {
    return props.transactions.map((transaction, index) => {
      return <td key={index} className={transaction.type === 'Credit' ? 'credit' : ''}>{transaction.amount}</td>
    })
  } else if (props.transactions.length === 1) {
    return props.transactions.map((transaction, index) => {
      if (transaction.toAccount === 1) {
        return (
          <React.Fragment key={index}>
            <td className={transaction.type === 'Credit' ? 'credit' : ''}>{transaction.amount}</td>
            <td></td>
          </React.Fragment>
        )
      }
      if (transaction.toAccount === 2) {
        return (
          <React.Fragment key={index}>
            <td></td>
            <td className={transaction.type === 'Credit' ? 'credit' : ''}>{transaction.amount}</td>
          </React.Fragment>
        )
      }
      return (
        <React.Fragment>
          <td></td>
          <td></td>
        </React.Fragment>
      )
    })
  }
  return (
    <React.Fragment>
      <td></td>
      <td></td>
    </React.Fragment>
  )
}

const ShowTransaction = (props) => {
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
            props.transactions.map((entry, index) => {
              return (
                <tr key={index}>
                  <td>{entry.nameOfTransaction}</td>
                  <td>{entry.dateOfTransaction}</td>
                  <td>{entry.dueAmount}</td>
                  <Transaction transactions={entry.transactions}></Transaction>
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