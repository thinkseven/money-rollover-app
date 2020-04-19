import React, { useState, useEffect } from 'react'
import './index.css';
import moment from 'moment';

const Edit = (props) => {

  const [isEditable, setEditable] = useState(false);
  const [fieldValue, setFieldValue] = useState(props.account[props.field]);

  const updateAccount = (event) => {

    setEditable(false)

    const modifiedAccount = {
      [event.target.name]: event.target.value
    }

    const updateAccount = { ...props.account, ...modifiedAccount }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = {
      name: updateAccount.name,
      initialBalance: updateAccount.initialBalance,
      currentBalance: updateAccount.currentBalance,
      accountType: updateAccount.accountType,
      paymentDueDay: new Date(updateAccount.paymentDueDay),
      statementClosingDay: new Date(updateAccount.statementClosingDay),
      installmentAmount: updateAccount.installmentAmount,
      comments: updateAccount.comments
    }

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(raw),
      redirect: 'follow'
    };

    fetch(`/api/v1/money/Account/${props.account.accountId}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        props.refreshAccounts()
        console.log(result)
      })
      .catch(error => console.log('error', error));
  }

  const highlightDisplay = (name, value, accountType) => {
    if (accountType === "Credit Card" || accountType === "Loan") {
      if (name === "paymentDueDay" || name === "statementClosingDay") {
        if (moment(value).add(30, "days").isAfter(moment())) {
          return {
            color: "green",
            fontSize: "18px",
            whiteSpace: "pre"
          }
        }
      }
    }
    return {
      whiteSpace: "pre"
    }
  }

  const getDate = (date, length) => {
    let nextDate = moment(date).add(length, 'days');
    let currentDay = moment(date).get('date');
    let nextDay = nextDate.get('date');
    let diffDay = nextDay - currentDay;
    if (diffDay > 0) {
      return nextDate.subtract(diffDay, 'days').format("ddd[\r\n]MMM D");
    }
    if (diffDay < 0) {
      return nextDate.add(Math.abs(diffDay), 'days').format("ddd[\r\n]MMM D");
    }
    return nextDate.format("ddd[\r\n]MMM D");
  }

  const formatDisplay = (name, value, accountType) => {
    if (name === "paymentDueDay") {
      if (accountType === "Credit Card" || accountType === "Loan") {
        return (<div>
          <div>{getDate(value,30)}</div>
          <div style={{
            fontSize: '12px',
            fontStyle: 'italic'
          }}>prev: {moment(value).format("ddd MMM D")}</div>
        </div>)
      }
      return moment(value).format("ddd[\r\n]MMM D");
    }
    if (name === "statementClosingDay") {
      if (accountType === "Credit Card" || accountType === "Loan") {
        return (<div>
          <div>{getDate(value,31)}</div>
          <div style={{
            fontSize: '12px',
            fontStyle: 'italic'
          }}>prev: {moment(value).format("ddd MMM D")}</div>
        </div>)
      }
      return moment(value).format("ddd[\r\n]MMM D");
    }
    return value;
  }

  return <div>
    {
      !isEditable && (<span onClick={() => {
        setEditable(true)
      }} style={highlightDisplay(props.field, fieldValue, props.account["accountType"])
      }>{formatDisplay(props.field, fieldValue, props.account["accountType"])}</span>)
    }
    {
      isEditable && (<input type='text' name={props.field} onChange={(event) => {
        setFieldValue(event.target.value)
      }} onBlur={(event) => {
        updateAccount(event)
      }} value={fieldValue} />)
    }
  </div>
}

const EditType = (props) => {

  const [isEditable, setEditable] = useState(false);
  const [fieldValue, setFieldValue] = useState(props.account[props.field])

  const updateAccount = (event) => {
    setEditable(false)

    const modifiedAccount = {
      [event.target.name]: event.target.value
    }

    const updateAccount = { ...props.account, ...modifiedAccount }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = {
      name: updateAccount.name,
      initialBalance: updateAccount.initialBalance,
      currentBalance: updateAccount.currentBalance,
      accountType: updateAccount.accountType,
      paymentDueDay: new Date(updateAccount.paymentDueDay),
      statementClosingDay: new Date(updateAccount.statementClosingDay),
      installmentAmount: updateAccount.installmentAmount,
      comments: updateAccount.comments
    }

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(raw),
      redirect: 'follow'
    };

    fetch(`/api/v1/money/Account/${props.account.accountId}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        props.refreshAccounts()
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
      isEditable && (
        <select name={props.field} value={fieldValue} onChange={(event) => {
          setFieldValue(event.target.value)
        }} onBlur={(event) => {
          updateAccount(event)
        }}>
          <option value="None">Select Type</option>
          <option value="Checking">Checking</option>
          <option value="Saving">Savings</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Certicate of Deposit">Certicate of Deposit</option>
          <option value="401K">401K</option>
          <option value="Loan">Loan</option>
        </select>
      )
    }
  </div >
}

const ShowAccount = () => {

  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)

  const refreshAccounts = () => {
    setLoading(true)
    setAccounts([])
    fetch("/api/v1/money/Account")
      .then(res => res.json())
      .then((data) => {
        setAccounts(data)
        setLoading(false)
      })
  }

  useEffect(() => {
    const fetchAccounts = () => {
      fetch("/api/v1/money/Account")
        .then(res => res.json())
        .then((data) => {
          setAccounts(data)
          setLoading(false)
        })
    }
    fetchAccounts()
  }, [])

  return (
    <div class="col-12">
      <table>
        <thead>
          <tr>
            <th>
              Name
                        </th>
            <th>
              Initial Balance
                        </th>
            <th>
              Current Balance
                        </th>
            <th>
              Account Type
                        </th>
            <th>
              Next Payment
                        </th>
            <th>
              Next Closing
                        </th>
            <th>
              Installment Amount
                        </th>
            <th>
              Comments
                        </th>
          </tr>
        </thead>
        <tbody>
          {
            !loading && accounts.map((account) => {
              return (
                <tr key={account.accountId}>
                  <td><Edit field="name" account={account} refreshAccounts={refreshAccounts} /></td>
                  <td><Edit field="initialBalance" account={account} refreshAccounts={refreshAccounts} /></td>
                  <td><Edit field="currentBalance" account={account} refreshAccounts={refreshAccounts} /></td>
                  <td><EditType field="accountType" account={account} refreshAccounts={refreshAccounts} /></td>
                  <td><Edit field="paymentDueDay" account={account} refreshAccounts={refreshAccounts} /></td>
                  <td><Edit field="statementClosingDay" account={account} refreshAccounts={refreshAccounts} /></td>
                  <td><Edit field="installmentAmount" account={account} refreshAccounts={refreshAccounts} /></td>
                  <td><Edit field="comments" account={account} refreshAccounts={refreshAccounts} /></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default ShowAccount