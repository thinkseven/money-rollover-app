import moment from 'moment';

let balanceMap = [];

const sanitize = (transactions) => {
  return transactions.map((transaction) => {
    const modifiedTransaction = {
      dueDate: moment(transaction.dueDate).format("MM/DD/YYYY")
    }
    return { ...transaction, ...modifiedTransaction }
  })
}

const groupByAnyProperty = (objectArray, property) => {
  return objectArray.reduce(function (acc, obj, index) {
    let key = obj[property]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(obj);
    return acc
  }, {})
}

const getRolloverBalance = (account, transactions) => {

  let balance = 0.0;

  let accountFound = balanceMap.filter((acc) => {
    return acc.accountId === account.accountId
  })

  if (accountFound && accountFound.length > 0) {
    balance = accountFound[0].currentBalance;
  }

  let transactionFound = transactions.filter((trans) => {
    return trans.accountId === account.accountId
  })

  if (transactionFound && transactionFound.length > 0 && accountFound && accountFound.length > 0) {
    // console.log(accountFound[0], transactionFound[0])
    switch (accountFound[0].accountType) {
      case "Credit Card":
      case "Loan":
        balance = transactionFound[0].transactionType ? (accountFound[0].currentBalance + transactionFound[0].amount) : (accountFound[0].currentBalance - transactionFound[0].amount)
        break;
      case "Checking":
      case "Saving":
        balance = transactionFound[0].transactionType ? (accountFound[0].currentBalance - transactionFound[0].amount) : (accountFound[0].currentBalance + transactionFound[0].amount)
        break;
      default:
        balance = accountFound[0].currentBalance;
    }

    // update balanceMap

    balanceMap = balanceMap.filter((acc) => {
      return acc.accountId !== account.accountId
    })

    balanceMap.push({
      accountId: accountFound[0].accountId,
      currentBalance: balance,
      accountType: accountFound[0].accountType
    });

  }

  return parseFloat(balance).toFixed(2);
}

const getTransaction = (account, transactions, fieldName) => {

  let transactionFound = transactions.filter((trans) => {
    return trans.accountId === account.accountId
  })

  if (transactionFound && transactionFound.length > 0) {
    return transactionFound[0][fieldName];
  }

  return null;

}

const subGroupByAnyProperty = (accounts, objectArray, property) => {
  let keys = Object.keys(objectArray);
  keys.forEach((element) => {
    let groupByTransactions = groupByAnyProperty(objectArray[element], property);
    objectArray[element] = [];
    Object.entries(groupByTransactions).forEach(([key, transactions]) => {
      objectArray[element].push({
        [key]: {
          amount: parseFloat(transactions.reduce((acc, transaction) => { return acc + transaction.amount }, 0)).toFixed(2),
          accountBalance: accounts.filter((account) => {
            return account.accountType !== "401K"
          }).map((account) => {
            return {
              accountId: account.accountId,
              currentBalance: getRolloverBalance(account, transactions),
              amount: getTransaction(account, transactions, "amount"),
              dueDate: getTransaction(account, transactions, "dueDate"),
              postDate: getTransaction(account, transactions, "postDate")
            }
          })
        }
      });
    })
  });
  return objectArray;
}

// const getTransactions = (accounts, transactions) => {
//   return transactions.map((transaction, x) => {

//     const transactionAccount = accounts.filter((account) => {
//       return account.accountId === transaction.accountId
//     })

//     if (transactionAccount && transactionAccount.length > 0) {

//       const [account] = transactionAccount

//       const updatedTransaction = {
//         rolloverBalance: transactions.reduce((acc, trans, y) => {
//           let balance = acc + 0;
//           if (account.accountId === trans.accountId) {
//             if (y <= x) {
//               switch (account.accountType) {
//                 case "Credit Card":
//                 case "Loan":
//                   balance = trans.transactionType ? (acc + trans.amount) : (acc - trans.amount)
//                   break;
//                 case "Checking":
//                 case "Saving":
//                   balance = trans.transactionType ? (acc - trans.amount) : (acc + trans.amount)
//                   break;
//                 default:
//                   balance = acc + 0;
//               }
//             }
//           }
//           return parseFloat(parseFloat(balance).toFixed(2))
//         }, account.currentBalance)
//       }

//       return { ...transaction, ...updatedTransaction }
//     }

//     return transaction
//   })
// }

const groupTransactionsByProperties = (accounts, transactions) => {
  balanceMap = accounts.map((account) => {
    return {
      accountId: account.accountId,
      currentBalance: account.currentBalance,
      accountType: account.accountType
    }
  })
  // console.log(balanceMap);
  let firstGrouping = groupByAnyProperty(sanitize(transactions), "dueDate");
  let secondGrouping = subGroupByAnyProperty(accounts, firstGrouping, "name");
  console.log(secondGrouping);
  return secondGrouping;
}

export default groupTransactionsByProperties;