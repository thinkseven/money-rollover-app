import React, { Component } from 'react';


const Accounts = [
  {
    Id: 1,
    Name: "Bank of America",
    Bill: false
  },
  {
    Id: 2,
    Name: "Chase",
    Bill: false
  },
  {
    Id: 3,
    Name: "Chase CC",
    Bill: true
  },
  {
    Id: 4,
    Name: "BOFA CC",
    Bill: true
  },
  {
    Id: 5,
    Name: "Electricity",
    Bill: true
  },
  {
    Id: 6,
    Name: "BJ’s CC",
    Bill: true
  },
  {
    Id: 7,
    Name: "Macy’s CC",
    Bill: true
  },
  {
    Id: 8,
    Name: "Honda CC",
    Bill: true
  },
  {
    Id: 9,
    Name: "Banana Republic CC",
    Bill: true
  },
  {
    Id: 10,
    Name: "Apple CC",
    Bill: true
  }
]

const Transactions = [
  {
    ToAccount: 1,
    NameOfTransaction: "balance as of",
    DueAmount: null,
    Amount: 1116.47,
    DateOfTransaction: "01/30/2020"
  },
  {
    ToAccount: 2,
    NameOfTransaction: "balance as of",
    DueAmount: null,
    Amount: 969.85,
    DateOfTransaction: "01/30/2020"
  },
  {
    ToAccount: 1,
    NameOfTransaction: "Adjustments",
    DueAmount: null,
    Amount: 167.59,
    DateOfTransaction: "01/31/2020"
  },
  {
    ToAccount: 2,
    NameOfTransaction: "Adjustments",
    DueAmount: null,
    Amount: 841.8,
    DateOfTransaction: "01/31/2020"
  },
  {
    ToAccount: 1,
    NameOfTransaction: "Rent",
    DueAmount: 2368.12,
    Amount: 1184.06,
    DateOfTransaction: "02/01/2020"
  },
  {
    ToAccount: 2,
    NameOfTransaction: "Rent",
    DueAmount: 2368.12,
    Amount: 1184.06,
    DateOfTransaction: "02/01/2020"
  },
  {
    ToAccount: 2,
    NameOfTransaction: "Chase CC",
    DueAmount: 527.59,
    Amount: 527.59,
    DateOfTransaction: "02/05/2020"
  },
  {
    ToAccount: 1,
    NameOfTransaction: "Salary Credit",
    DueAmount: null,
    Amount: 1728.49,
    DateOfTransaction: "02/07/2020"
  },
  {
    ToAccount: 2,
    NameOfTransaction: "Salary Credit",
    DueAmount: null,
    Amount: 1500,
    DateOfTransaction: "02/07/2020"
  },
  {
    ToAccount: 1,
    NameOfTransaction: "Transfer",
    DueAmount: null,
    Amount: 700,
    DateOfTransaction: "02/07/2020"
  },
  {
    ToAccount: 2,
    NameOfTransaction: "Transfer",
    DueAmount: null,
    Amount: 550,
    DateOfTransaction: "02/07/2020"
  },
]

const mergedTransactions = [
  {
    NameOfTransaction: "balance as of",
    DueAmount: null,
    DateOfTransaction: "01/30/2020",
    transactions: [
      {
        ToAccount: 1,
        Amount: 1116.47
      },
      {
        ToAccount: 2,
        Amount: 969.85
      }
    ]
  },
  {
    NameOfTransaction: "Adjustments",
    DueAmount: null,
    DateOfTransaction: "01/31/2020",
    transactions: [
      {
        ToAccount: 1,
        Amount: 167.59,
      },
      {
        ToAccount: 2,
        Amount: 841.8
      }
    ]
  },
  {
    NameOfTransaction: "Rent",
    DueAmount: 2368.12,
    DateOfTransaction: "02/01/2020",
    transactions: [
      {
        ToAccount: 1,
        Amount: 1184.06
      },
      {
        ToAccount: 2,
        Amount: 1184.06
      }
    ]
  },
  {
    NameOfTransaction: "Chase CC",
    DueAmount: 527.59,
    DateOfTransaction: "02/05/2020",
    transactions: [
      {
        ToAccount: 2,
        Amount: 527.59
      }
    ]
  },
  {
    NameOfTransaction: "Salary Credit",
    DueAmount: null,
    DateOfTransaction: "02/07/2020",
    transactions: [
      {
        ToAccount: 1,
        Amount: 1728.49
      },
      {
        ToAccount: 2,
        Amount: 1500
      }
    ]
  },
  {
    NameOfTransaction: "Transfer",
    DueAmount: null,
    DateOfTransaction: "02/07/2020",
    transactions: [
      {
        ToAccount: 1,
        Amount: 700
      },
      {
        ToAccount: 2,
        Amount: 550
      }
    ]
  }
]

class ShowTransaction extends Component {
  render() {
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
              mergedTransactions.map((entry, index) => {
                return (
                  <tr key={index}>
                    <td>{entry.NameOfTransaction}</td>
                    <td>{entry.DateOfTransaction}</td>
                    <td>{entry.DueAmount}</td>
                    {
                      if (entry.transactions.length === 2)
                      {
                        entry.transactions.map((transaction, index) => {
                          return <td key={index}>{transaction.Amount}</td>
                        })
                      }
                      else 
                      {
                        entry.transactions.map((transaction, index) => {
                          if (transaction.ToAccount && transaction.ToAccount === 1) {
                            return (
                              <React.Fragment>
                                <td key={index}>{transaction.Amount}</td>
                                <td></td>
                              </React.Fragment>
                            )
                          }
                          else if (transaction.ToAccount && transaction.ToAccount === 2) {
                            return (
                              <React.Fragment>
                                <td></td>
                                <td key={index}>{transaction.Amount}</td>
                              </React.Fragment>
                            )
                          }
                        })
                      }
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default ShowTransaction;