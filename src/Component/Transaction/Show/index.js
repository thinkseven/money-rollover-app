import React, { useState, useEffect } from 'react';

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

const ShowTransaction = () => {

  const [transactions, setTransactions] = useState([])
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)

  const refreshTransactions = () => {
    fetch("/Transaction")
      .then(res => res.json())
      .then((data) => {
        setTransactions(data)
        setLoading(false)
      })
  }

  useEffect(() => {
    const fetchTransactions = () => {
      fetch("/Transaction")
        .then(res => res.json())
        .then((data) => {
          setTransactions(data)
          setLoading(false)
        })
    }
    fetchTransactions()
  }, {})

  useEffect(() => {
    const fetchAccounts = () => {
      fetch("/Account")
        .then(res => res.json())
        .then((data) => {
          setAccounts(data)
        })
    }
    fetchAccounts()
  }, {})

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
              Account
            </th>
            <th>
              Type
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
            !loading && transactions.map((entry, index) => {
              return (
                <tr key={index}>
                  <td>{entry.transactionId}</td>
                  <td>{entry.name}</td>
                  <td>{entry.transactionDate}</td>
                  <td><EditAmount transaction={entry} refreshTransactions={refreshTransactions} /></td>
                  <td>{entry.accountId}</td>
                  <td>{entry.transactionType ? "Debit" : "Credit"}</td>
                  <td>{entry.comments}</td>
                  <td>{entry.modifiedDate}</td>
                  <td>{entry.createdDate}</td>
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