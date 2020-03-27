import React, { useState } from 'react';
import './App.css';
import Rollover from './Component/Dashboard/Rollover'
import ShowTransaction from './Component/Transaction/Show'
import ShowAccount from './Component/Accounts/Show'
import AddTransaction from './Component/Transaction/Add';

function App() {

  const [currentSelection, setSelection] = useState('0');

  return (
    <div>
      <div>
        <label>
          <input
            type="radio"
            name="selection"
            value="0"
            checked={currentSelection === "0"}
            onChange={(event) => {
              setSelection(event.target.value)
            }}
          />
          Dashboard
        </label>
        <label>
          <input
            type="radio"
            name="selection"
            value="1"
            checked={currentSelection === "1"}
            onChange={(event) => {
              setSelection(event.target.value)
            }}
          />
          Show Transaction
        </label>
        <label>
          <input
            type="radio"
            name="selection"
            value="2"
            checked={currentSelection === "2"}
            onChange={(event) => {
              setSelection(event.target.value)
            }}
          />
          Add Transaction
        </label>
        <label>
          <input
            type="radio"
            name="selection"
            value="3"
            checked={currentSelection === "3"}
            onChange={(event) => {
              setSelection(event.target.value)
            }}
          />
          Show Account
        </label>
      </div>
      {
        currentSelection === "0" && (
          <div>
            <Rollover />
          </div>
        )
      }
      {
        currentSelection === "1" && (
          <div>
            <ShowTransaction />
          </div>
        )
      }
      {
        currentSelection === "2" && (
          <div>
            <AddTransaction />
          </div>
        )
      }
      {
        currentSelection === "3" && (
          <div>
            <ShowAccount />
          </div>
        )
      }
    </div>
  );
}

export default App;
