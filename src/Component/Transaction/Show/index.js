import React, { useState, useEffect } from 'react';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './index.css';
import moment from 'moment';

const fetchWrapper = (url, method, body, onSuccess, onError) => {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: method,
    headers: myHeaders,
    body: body !== null ? JSON.stringify(body) : ''
  };

  fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw Error("call failed for url", url, response.body);
      }
      return response.text()
    })
    .then(result => {
      console.log(result);
      onSuccess(result);
    })
    .catch(error => {
      console.log(error);
      onError(error);
    });
}

const Edit = (props) => {

  const [isEditable, setEditable] = useState(false);
  const [fieldValue, setFieldValue] = useState(props.transaction[props.field])

  const updateTransaction = (event) => {

    setEditable(false)

    const modifiedTransaction = {
      [event.target.name]: event.target.value
    }

    const updateTransaction = { ...props.transaction, ...modifiedTransaction }

    var raw = {
      accountId: updateTransaction.accountId,
      name: updateTransaction.name,
      dueDate: new Date(updateTransaction.dueDate),
      postDate: new Date(updateTransaction.postDate),
      amount: updateTransaction.amount,
      transactionType: updateTransaction.transactionType,
      comments: updateTransaction.comments
    }

    fetchWrapper(`/api/v1/money/Transaction/${props.transaction.transactionId}`, 'PUT', raw, () => {
      props.updateTransaction(updateTransaction);
    }, () => {
      props.updateTransaction(props.transaction);
    })
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
  const [someDate, setDate] = useState(props.transaction[props.field])

  const updateTransaction = (event) => {
    setEditable(false)

    const modifiedTransaction = {
      [event.target.name]: event.target.value
    }

    const updateTransaction = { ...props.transaction, ...modifiedTransaction }

    var raw = {
      accountId: updateTransaction.accountId,
      name: updateTransaction.name,
      dueDate: new Date(updateTransaction.dueDate),
      postDate: new Date(updateTransaction.postDate),
      amount: updateTransaction.amount,
      transactionType: updateTransaction.transactionType,
      comments: updateTransaction.comments
    }

    fetchWrapper(`/api/v1/money/Transaction/${props.transaction.transactionId}`, 'PUT', raw, () => {
      props.updateTransaction(updateTransaction);
    }, () => {
      props.updateTransaction(props.transaction);
    })

  }

  return <div>
    {
      !isEditable && (<span style={{ whiteSpace: 'pre' }} onClick={() => {
        setEditable(true)
      }}>{moment(someDate).format('ddd[\r\n]MMM D')}</span>)
    }
    {
      isEditable && (<input type='text' name={props.field} onChange={(event) => {
        setDate(event.target.value)
      }} onBlur={(event) => {
        updateTransaction(event)
      }} value={someDate} />)
    }
  </div>
}

const EditAccount = (props) => {

  const [isEditable, setEditable] = useState(false);
  const [accountId, setAccount] = useState(props.transaction[props.field])

  const updateTransaction = (event) => {
    setEditable(false)

    const modifiedTransaction = {
      [event.target.name]: event.target.value
    }

    const updateTransaction = { ...props.transaction, ...modifiedTransaction }

    var raw = {
      accountId: updateTransaction.accountId,
      name: updateTransaction.name,
      dueDate: new Date(updateTransaction.dueDate),
      postDate: new Date(updateTransaction.postDate),
      amount: updateTransaction.amount,
      transactionType: updateTransaction.transactionType,
      comments: updateTransaction.comments
    }

    fetchWrapper(`/api/v1/money/Transaction/${props.transaction.transactionId}`, 'PUT', raw, () => {
      props.updateTransaction(updateTransaction);
    }, () => {
      props.updateTransaction(props.transaction);
    })

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
  const [transactionType, setType] = useState(props.transaction[props.field] ? 'Debit' : 'Credit')

  const updateTransaction = (event) => {
    setEditable(false)

    const modifiedTransaction = {
      [event.target.name]: event.target.value === "Debit" ? true : false,
    }

    const updateTransaction = { ...props.transaction, ...modifiedTransaction }

    var raw = {
      accountId: updateTransaction.accountId,
      name: updateTransaction.name,
      dueDate: new Date(updateTransaction.dueDate),
      postDate: new Date(updateTransaction.postDate),
      amount: updateTransaction.amount,
      transactionType: updateTransaction.transactionType,
      comments: updateTransaction.comments
    }

    fetchWrapper(`/api/v1/money/Transaction/${props.transaction.transactionId}`, 'PUT', raw, () => {
      props.updateTransaction(updateTransaction);
    }, () => {
      props.updateTransaction(props.transaction);
    })

  }

  return <div>
    {
      !isEditable && (<span onClick={() => {
        setEditable(true)
      }}>{transactionType}</span>)
    }
    {
      isEditable && (
        <select name={props.field} value={transactionType} onChange={(event) => {
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
    fetchWrapper(`/api/v1/money/Transaction/${props.transaction.transactionId}`, 'DELETE', null, () => {
      props.deleteTransaction(props.transaction.transactionId);
    }, () => {
      props.updateTransaction(props.transaction);
    })
  }

  return <div>
    <button onClick={handlerClick}><FontAwesomeIcon icon={faTrash} /> </button>
  </div>
}

const ShowTransaction = () => {

  const [transactions, setTransactions] = useState([])
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)

  const updateTransaction = (updatedTransaction) => {
    setTransactions(transactions.map((transaction) => {
      return updatedTransaction.transactionId === transaction.transactionId ? updatedTransaction : transaction;
    }))
  }

  const deleteTransaction = (transactionId) => {
    setLoading(true)
    setTransactions(transactions.filter((transaction) => {
      return transaction.transactionId !== transactionId
    }))
    setLoading(false)
  }

  useEffect(() => {
    const fetchAccounts = () => {
      fetch("/api/v1/money/Account")
        .then(res => res.json())
        .then((data) => {
          setAccounts(data)
        })
    }
    fetchAccounts()
  }, [])

  useEffect(() => {
    const fetchTransactions = () => {
      fetch("/api/v1/money/Transaction")
        .then(res => res.json())
        .then((data) => {
          setTransactions(data)
          setLoading(false)
        })
    }
    fetchTransactions()
  }, [])

  return (
    <div class="col-12">
      <h1>Today's {moment().format("MM/DD/YYYY")}</h1>
      <table>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Due Date
            </th>
            <th>
              Post Date
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
              Trash
            </th>
          </tr>
        </thead>
        <tbody>
          {
            !loading && transactions.filter((entry, index) => {
              return moment().startOf('day').isSame(moment(entry.dueDate));
            }).map((entry, index) => {
              return (
                <tr key={index}>
                  <td><Edit field="name" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><EditDate field="dueDate" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><EditDate field="postDate" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><Edit field="amount" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><EditAccount field="accountId" transaction={entry} updateTransaction={updateTransaction} accounts={accounts} /></td>
                  <td><EditType field="transactionType" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><Edit field="comments" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><DeleteTransaction transaction={entry} deleteTransaction={deleteTransaction} updateTransaction={updateTransaction} >Delete</DeleteTransaction></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <h1>Upcoming in next 2 days</h1>
      <table>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Due Date
            </th>
            <th>
              Post Date
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
              Trash
            </th>
          </tr>
        </thead>
        <tbody>
          {
            !loading && transactions.filter((entry, index) => {
              return moment(entry.dueDate).isBetween(moment().add(1, 'day'), moment().add(2, "days"));
            }).map((entry, index) => {
              return (
                <tr key={index}>
                  <td><Edit field="name" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><EditDate field="dueDate" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><EditDate field="postDate" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><Edit field="amount" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><EditAccount field="accountId" transaction={entry} updateTransaction={updateTransaction} accounts={accounts} /></td>
                  <td><EditType field="transactionType" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><Edit field="comments" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><DeleteTransaction transaction={entry} deleteTransaction={deleteTransaction} updateTransaction={updateTransaction} >Delete</DeleteTransaction></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <h1>Current month</h1>
      <table>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Due Date
            </th>
            <th>
              Post Date
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
              Trash
            </th>
          </tr>
        </thead>
        <tbody>
          {
            !loading && transactions.filter((entry, index) => {
              return ((moment(entry.dueDate).month() === moment().month()) && (moment(entry.dueDate).isAfter(moment().add(2, 'days'))))
            }).map((entry, index) => {
              return (
                <tr key={index}>
                  <td><Edit field="name" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><EditDate field="dueDate" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><EditDate field="postDate" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><Edit field="amount" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><EditAccount field="accountId" transaction={entry} updateTransaction={updateTransaction} accounts={accounts} /></td>
                  <td><EditType field="transactionType" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><Edit field="comments" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><DeleteTransaction transaction={entry} deleteTransaction={deleteTransaction} updateTransaction={updateTransaction} >Delete</DeleteTransaction></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <h1>Next month</h1>
      <table>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Due Date
            </th>
            <th>
              Post Date
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
              Trash
            </th>
          </tr>
        </thead>
        <tbody>
          {
            !loading && transactions.filter((entry, index) => {
              return (moment(entry.dueDate).month() === moment().add(1, 'month').month())
            }).map((entry, index) => {
              return (
                <tr key={index}>
                  <td><Edit field="name" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><EditDate field="dueDate" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><EditDate field="postDate" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><Edit field="amount" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><EditAccount field="accountId" transaction={entry} updateTransaction={updateTransaction} accounts={accounts} /></td>
                  <td><EditType field="transactionType" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><Edit field="comments" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><DeleteTransaction transaction={entry} deleteTransaction={deleteTransaction} updateTransaction={updateTransaction} >Delete</DeleteTransaction></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <h1>Completed transactions</h1>
      <table>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Due Date
            </th>
            <th>
              Post Date
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
              Trash
            </th>
          </tr>
        </thead>
        <tbody>
          {
            !loading && transactions.filter((entry, index) => {
              return moment(entry.dueDate).isBefore(moment().startOf('day'));
            }).map((entry, index) => {
              return (
                <tr key={index}>
                  <td><Edit field="name" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><EditDate field="dueDate" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><EditDate field="postDate" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><Edit field="amount" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><EditAccount field="accountId" transaction={entry} updateTransaction={updateTransaction} accounts={accounts} /></td>
                  <td><EditType field="transactionType" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><Edit field="comments" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><DeleteTransaction transaction={entry} deleteTransaction={deleteTransaction} updateTransaction={updateTransaction} >Delete</DeleteTransaction></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <h1>All transactions</h1>
      <table>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Due Date
            </th>
            <th>
              Post Date
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
              Trash
            </th>
          </tr>
        </thead>
        <tbody>
          {
            !loading && transactions.map((entry, index) => {
              return (
                <tr key={index}>
                  <td><Edit field="name" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><EditDate field="dueDate" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><EditDate field="postDate" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><Edit field="amount" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><EditAccount field="accountId" transaction={entry} updateTransaction={updateTransaction} accounts={accounts} /></td>
                  <td><EditType field="transactionType" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><Edit field="comments" transaction={entry} updateTransaction={updateTransaction} /></td>
                  <td><DeleteTransaction transaction={entry} deleteTransaction={deleteTransaction} updateTransaction={updateTransaction} >Delete</DeleteTransaction></td>
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