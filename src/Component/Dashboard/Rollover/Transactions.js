import moment from 'moment';

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

const subGroupByAnyProperty = (objectArray, property) => {
    let keys = Object.keys(objectArray);
    keys.forEach((element) => {
        let groupByTransactions = groupByAnyProperty(objectArray[element], property);
        objectArray[element] = [];
        Object.entries(groupByTransactions).forEach(([key, value]) => {
            objectArray[element].push({
                [key]: value.map((item) => {
                    return item
                })
            });
        })
    });
    return objectArray;
}

const getTransactions = (accounts, transactions) => {
    return transactions.map((transaction, x) => {

        const transactionAccount = accounts.filter((account) => {
            return account.accountId === transaction.accountId
        })

        if (transactionAccount && transactionAccount.length > 0) {

            const [account] = transactionAccount

            const updatedTransaction = {
                rolloverBalance: transactions.reduce((acc, trans, y) => {
                    let balance = acc + 0;
                    if (account.accountId === trans.accountId) {
                        if (y <= x) {
                            switch (account.accountType) {
                                case "Credit Card":
                                case "Loan":
                                    balance = trans.transactionType ? (acc + trans.amount) : (acc - trans.amount)
                                    break;
                                case "Checking":
                                case "Saving":
                                    balance = trans.transactionType ? (acc - trans.amount) : (acc + trans.amount)
                                    break;
                                default:
                                    balance = acc + 0;
                            }
                        }
                    }
                    return parseFloat(parseFloat(balance).toFixed(2))
                }, account.currentBalance)
            }

            return { ...transaction, ...updatedTransaction }
        }

        return transaction
    })
}

const groupTransactionsByProperties = (accounts, transactions) => {
    let firstGrouping = groupByAnyProperty(sanitize(getTransactions(accounts, transactions)), "dueDate");
    let secondGrouping = subGroupByAnyProperty(firstGrouping, "name");
    return secondGrouping;
}

export default groupTransactionsByProperties;