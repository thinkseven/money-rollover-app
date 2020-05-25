import React, { useState } from 'react';

const DisplayBalance = (props) => {
  return <h4>{props.amount}</h4>
}

const Equalizer = () => {

  const [input, setInput] = useState({})
  const [output, setOutput] = useState({})

  const setBalance = (event) => {

    const modifiedInput = {
      [event.target.name]: event.target.value
    }

    const updatedInput = { ...input, ...modifiedInput }

    setInput(updatedInput)

  }

  const setEqualizer = () => {

    let balance = 0
    let transactAmt1 = 0
    let transactAmt2 = 0
    let updateBalance1 = 0
    let updateBalance2 = 0

    if (parseFloat(input.balance1) < (parseFloat(input.amount)/2)) {
      transactAmt2 = parseFloat(input.balance2) - parseFloat(input.amount);
      updateBalance1 = parseFloat(input.balance1) - transactAmt1;
      updateBalance2 = parseFloat(input.balance2) - transactAmt2;
    } else if (parseFloat(input.balance2) < (parseFloat(input.amount)/2)) {
      transactAmt1 = parseFloat(input.balance1) - parseFloat(input.amount);
      updateBalance1 = parseFloat(input.balance1) - transactAmt1;
      updateBalance2 = parseFloat(input.balance2) - transactAmt2;
    }
    else {
      balance = (parseFloat(input.balance1) + parseFloat(input.balance2)) - parseFloat(input.amount);
      transactAmt1 = parseFloat(parseFloat(input.balance1) - (balance / 2));
      transactAmt2 = parseFloat(parseFloat(input.balance2) - (balance / 2));
      updateBalance1 = parseFloat(input.balance1) - transactAmt1;
      updateBalance2 = parseFloat(input.balance2) - transactAmt2;
    }

    setOutput({
      updateBalance1: updateBalance1,
      updateBalance2: updateBalance2,
      transactAmt1: transactAmt1,
      transactAmt2: transactAmt2
    })

  }

  return <div className="col-6 container">

    <div className="row">
      <div className="col-12">
        <div><h1>Equalizer</h1></div>
      </div>
    </div>

    <div className="row">
      <div className="col-3">
        <label htmlFor="balance1">Enter A/C Balance 1</label>
      </div>
      <div className="col-9">
        <input type='text' name='balance1' value={input.balance1} onChange={setBalance} placeholder="Enter Balance" />
      </div>
    </div>

    <div className="row">
      <div className="col-3">
        <label htmlFor="balance2">Enter A/C Balance 2</label>
      </div>
      <div className="col-9">
        <input type='text' name='balance2' value={input.balance2} onChange={setBalance} placeholder="Enter Balance" />
      </div>
    </div>

    <div className="row">
      <div className="col-3">
        <label htmlFor="amount">Enter Amount</label>
      </div>
      <div className="col-9">
        <input type='text' name='amount' value={input.amount} onChange={setBalance} placeholder="Enter Amount" />
      </div>
    </div>

    <div className="row">
      <div className="col-3"></div>
      <div className="col-9">
        <input type="submit" value="Equalize it!!" onClick={setEqualizer} />
      </div>
    </div>

    <div style={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'center',
      alignContent: 'center'
    }}>
      <div style={{
        width: '25%'
      }}>
        <h3>Before</h3>
        <h4>A/C 1</h4>
        <h4>A/C 2</h4>
      </div>
      <div style={{
        width: '25%'
      }}>
        <h3>Before</h3>
        <DisplayBalance amount={input.balance1} />
        <DisplayBalance amount={input.balance2} />
      </div>
      <div style={{
        width: '25%'
      }}>
        <h3>After</h3>
        <DisplayBalance amount={output.updateBalance1} />
        <DisplayBalance amount={output.updateBalance2} />
      </div>
      <div style={{
        width: '25%'
      }}>
        <h3>Transact Amt.</h3>
        <DisplayBalance amount={output.transactAmt1} />
        <DisplayBalance amount={output.transactAmt2} />
      </div>
    </div>

  </div>
}

export default Equalizer
