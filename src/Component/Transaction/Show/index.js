import React, { useState, useEffect } from 'react';
import moment from 'moment';

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
      isEditable && (<input type='text' name='txtAmount' onChange={(event) => {
        setAmount(event.target.value)
      }} onBlur={(event) => {
        updateTransaction(event)
      }} value={amount} />)
    }
  </div>
}

const EditName = (props) => {

  const [isEditable, setEditable] = useState(false);
  const [name, setName] = useState(props.transaction.name)

  const updateTransaction = (event) => {
    setEditable(false)
    setName(event.target.value)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = {
      accountId: props.transaction.accountId,
      name: name,
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

  return <div>
    {
      !isEditable && (<span onClick={() => {
        setEditable(true)
      }}>{name}</span>)
    }
    {
      isEditable && (<input type='text' name='txtName' onChange={(event) => {
        setName(event.target.value)
      }} onBlur={(event) => {
        updateTransaction(event)
      }} value={name} />)
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


  return <div>
    {
      !isEditable && (<span onClick={() => {
        setEditable(true)
      }}>{moment(transactionDate).format('MMM DD')}</span>)
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

const EditComments = (props) => {

  const [isEditable, setEditable] = useState(false);
  const [comments, setComents] = useState(props.transaction.comments)

  const updateTransaction = (event) => {
    setEditable(false)
    setComents(event.target.value)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = {
      accountId: props.transaction.accountId,
      name: props.transaction.name,
      transactionDate: new Date(props.transaction.transactionDate),
      amount: props.transaction.amount,
      transactionType: props.transaction.transactionType,
      comments: comments
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
      }}>{comments}</span>)
    }
    {
      isEditable && (<input type='text' name='txtComments' onChange={(event) => {
        setComents(event.target.value)
      }} onBlur={(event) => {
        updateTransaction(event)
      }} value={comments} />)
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
          </tr>
        </thead>
        <tbody>
          {
            !loading && transactions.map((entry, index) => {
              return (
                <tr key={index}>
                  <td>{entry.transactionId}</td>
                  <td><EditName transaction={entry} refreshTransactions={refreshTransactions} /></td>
                  <td><EditDate transaction={entry} refreshTransactions={refreshTransactions} /></td>
                  <td><EditAmount transaction={entry} refreshTransactions={refreshTransactions} /></td>
                  <td><EditAccount transaction={entry} refreshTransactions={refreshTransactions} accounts={accounts} /></td>
                  <td><EditType transaction={entry} refreshTransactions={refreshTransactions} /></td>
                  <td><EditComments transaction={entry} refreshTransactions={refreshTransactions} /></td>
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