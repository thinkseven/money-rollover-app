import React, { useState, useEffect } from 'react';
import getTransactions from './Transactions'

const EditAmount = (props) => {

  const [isEditable, setEditable] = useState(false);
  const [amount, setAmount] = useState(props.transaction.amount)

  const updateTransaction = (event) => {
    setEditable(false)
    setAmount(event.target.value)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = {
      accountId: props.transaction.accountId,
      name: props.transaction.name,
      transactionDate: new Date(props.transaction.transactionDate),
      amount: amount,
      transactionType: props.transaction.transactionType,
      comments: props.transaction.comments
    }

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(raw),
      redirect: 'follow'
    };

    fetch(`/Transaction/${props.transaction.transactionId}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        props.refreshTransactions()
        console.log(result)
      })
      .catch(error => console.log('error', error));
  }


  return <div>
    {
      !isEditable && (<span onClick={() => {
        setEditable(true)
      }}>{amount}</span>)
    }
    {
      isEditable && (<input type='text' name='txtName' onChange={(event) => {
        setAmount(event.target.value)
      }} onBlur={(event) => {
        updateTransaction(event)
      }} value={amount} />)
    }
  </div>
}

const Transaction = (props) => {
  if (props.accountId === 1) {
    return (
      <React.Fragment>
        <td className={!props.transactionType ? 'credit' : ''}>{props.amount}</td>
        <td></td>
      </React.Fragment>
    )
  }
  if (props.accountId === 9) {
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
  const [loading, setLoading] = useState(true)

  const refreshTransactions = () => {
    fetch("/Transaction")
      .then(res => res.json())
      .then((data) => {
        setTransactions(getTransactions(data))
        setLoading(false)
      })
  }

  useEffect(() => {
    const fetchTransactions = () => {
      fetch("/Transaction")
        .then(res => res.json())
        .then((data) => {
          setTransactions(getTransactions(data))
          setLoading(false)
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
            !loading && transactions.map((entry, index) => {
              return (
                <tr key={index}>
                  <td>{entry.transactionId}</td>
                  <td>{entry.name}</td>
                  <td>{entry.transactionDate}</td>
                  <td><EditAmount transaction={entry} refreshTransactions={refreshTransactions} /></td>
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