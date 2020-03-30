import React, { useState, useEffect } from 'react';
import moment from 'moment';

const Edit = (props) => {

  const [isEditable, setEditable] = useState(false);
  const [fieldValue, setFieldValue] = useState(props.transaction[props.field])

  const updateTransaction = (event) => {

    setEditable(false)

    const modifiedTransaction = {
      [event.target.name]: event.target.value
    }

    const updateTransaction = { ...props.transaction, ...modifiedTransaction }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = {
      accountId: updateTransaction.accountId,
      name: updateTransaction.name,
      transactionDate: new Date(updateTransaction.transactionDate),
      amount: updateTransaction.amount,
      transactionType: updateTransaction.transactionType,
      comments: updateTransaction.comments
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
      }}>{fieldValue}</span>)
    }
    {
      isEditable && (<input type='text' name={props.field} onChange={(event) => {
        setFieldValue(event.target.value)
      }} onBlur={(event) => {
        updateTransaction(event)
      }} value={fieldValue} />)
    }
  </div>
}

const EditDate = (props) => {

  const [isEditable, setEditable] = useState(false);
  const [transactionDate, setDate] = useState(props.transaction.transactionDate)

  const updateTransaction = (event) => {
    setEditable(false)
    setDate(event.target.value)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = {
      accountId: props.transaction.accountId,
      name: props.transaction.name,
      transactionDate: new Date(transactionDate),
      amount: props.transaction.amount,
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

  const highlightDisplay = (value) => {
    if (moment(value).isAfter(moment())) {
      return {
        color: "green",
        fontSize: "20px"
      }
    }
    return {}
  }

  return <div>
    {
      !isEditable && (<span onClick={() => {
        setEditable(true)
      }} style={highlightDisplay(transactionDate)}>{moment(transactionDate).format('MMM DD')}</span>)
    }
    {
      isEditable && (<input type='text' name='txtDate' onChange={(event) => {
        setDate(event.target.value)
      }} onBlur={(event) => {
        updateTransaction(event)
      }} value={transactionDate} />)
    }
  </div>
}

const EditAccount = (props) => {

  const [isEditable, setEditable] = useState(false);
  const [accountId, setAccount] = useState(props.transaction.accountId)

  const updateTransaction = (event) => {
    setEditable(false)
    setAccount(event.target.value)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = {
      accountId: accountId,
      name: props.transaction.name,
      transactionDate: new Date(props.transaction.transactionDate),
      amount: props.transaction.amount,
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

  const getAccountName = () => {
    let filteredAccount = props.accounts && props.accounts.filter((account) => {
      return account.accountId === parseInt(accountId)
    })
    if (filteredAccount && filteredAccount.length > 0) {
      return filteredAccount[0].name
    }
  }

  return <div>
    {
      !isEditable && (<span onClick={() => {
        setEditable(true)
      }}>{getAccountName()}</span>)
    }
    {
      isEditable && (
        <select name="selectAccount" value={accountId} onChange={(event) => {
          setAccount(event.target.value)
        }} onBlur={(event) => {
          updateTransaction(event)
        }}>
          {
            props.accounts && props.accounts.map((account) => {
              return <option key={account.accountId} value={account.accountId}>{account.name}</option>
            })
          }
        </select>
      )
    }
  </div>
}

const EditType = (props) => {

  const [isEditable, setEditable] = useState(false);
  const [transactionType, setType] = useState(props.transaction.transactionType ? 'Debit' : 'Credit')

  const updateTransaction = (event) => {
    setEditable(false)
    setType(event.target.value)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = {
      accountId: props.transaction.accountId,
      name: props.transaction.name,
      transactionDate: new Date(props.transaction.transactionDate),
      amount: props.transaction.amount,
      transactionType: transactionType === "Debit" ? true : false,
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
      }}>{transactionType}</span>)
    }
    {
      isEditable && (
        <select name="transactionType" value={transactionType} onChange={(event) => {
          setType(event.target.value)
        }} onBlur={(event) => {
          updateTransaction(event)
        }}>
          <option value="Debit">Debit</option>
          <option value="Credit">Credit</option>
        </select>
      )
    }
  </div >
}

const DeleteTransaction = (props) => {

  const handlerClick = () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = "";

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`/Transaction/${props.transactionId}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        props.refreshTransactions()
        console.log(result)
      })
      .catch(error => console.log('error', error));

  }

  return <div>
    <button onClick={handlerClick}>Delete </button>
  </div>
}

const ShowTransaction = () => {

  const [transactions, setTransactions] = useState([])
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)

  const refreshTransactions = () => {
    setLoading(true)
    setTransactions([])
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
  }, [])

  useEffect(() => {
    const fetchAccounts = () => {
      fetch("/Account")
        .then(res => res.json())
        .then((data) => {
          setAccounts(data)
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
              Transaction Id
            </th>
            <th class="border px-4 py-2">
              Name
            </th>
            <th class="border px-4 py-2">
              Transaction Date
            </th>
            <th class="border px-4 py-2">
              Amount
            </th>
            <th class="border px-4 py-2">
              Account
            </th>
            <th class="border px-4 py-2">
              Type
            </th>
            <th class="border px-4 py-2">
              Comments
            </th>
          </tr>
        </thead>
        <tbody>
          {
            !loading && transactions.map((entry, index) => {
              return (
                <tr key={index}>
                  <td class="border px-4 py-2">{entry.transactionId}</td>
                  <td class="border px-4 py-2"><Edit field="name" transaction={entry} refreshTransactions={refreshTransactions} /></td>
                  <td class="border px-4 py-2"><EditDate field="transactionDate" transaction={entry} refreshTransactions={refreshTransactions} /></td>
                  <td class="border px-4 py-2"><Edit field="amount" transaction={entry} refreshTransactions={refreshTransactions} /></td>
                  <td class="border px-4 py-2"><EditAccount field="accountId" transaction={entry} refreshTransactions={refreshTransactions} accounts={accounts} /></td>
                  <td class="border px-4 py-2"><EditType field="transactionType" transaction={entry} refreshTransactions={refreshTransactions} /></td>
                  <td class="border px-4 py-2"><Edit field="comments" transaction={entry} refreshTransactions={refreshTransactions} /></td>
                  <td class="border px-4 py-2"><DeleteTransaction transactionId={entry.transactionId} refreshTransactions={refreshTransactions}>Delete</DeleteTransaction></td>
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