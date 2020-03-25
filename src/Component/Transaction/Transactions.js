const getTransactions = (transactions) => {
    console.log(transactions)
    const newTransactions = [...transactions];
    return newTransactions.map((entry, x) => {

        let rolloverBalance1 = newTransactions.reduce((accumulator, current, y) => {
            if (y <= x) {
                if (current.accountId === 1 && current.transactionType) {
                    accumulator = accumulator - current.amount
                }
                if (current.accountId === 1 && !current.transactionType) {
                    accumulator = accumulator + current.amount
                }
            }
            return accumulator;
        }, 0);

        let rolloverBalance2 = newTransactions.reduce((accumulator, current, y) => {
            if (y <= x) {
                if (current.accountId === 2 && current.transactionType) {
                    accumulator = accumulator - current.amount;
                }
                if (current.accountId === 2 && !current.transactionType) {
                    accumulator = accumulator + current.amount;
                }
            }
            return accumulator;
        }, 0);

        return Object.assign(entry, {
            rolloverBalance1,
            rolloverBalance2
        });
    })
}

export const processTransaction = (transactions) => {
    const newTransactions = [...transactions];
    return newTransactions.map((entry, x) => {

        let rolloverBalance1 = newTransactions.reduce((accumulator, current, y) => {
            current.transactions.forEach((trans) => {
                if (y <= x) {
                    if (trans.accountId === 1 && trans.transactionType === "Debit") {
                        accumulator = accumulator - trans.amount
                    }
                    if (trans.accountId === 1 && trans.transactionType === "Credit") {
                        accumulator = accumulator + trans.amount
                    }
                }
            })
            return accumulator;
        }, 0);

        let rolloverBalance2 = newTransactions.reduce((accumulator, current, y) => {
            current.transactions.forEach((trans) => {
                if (y <= x) {
                    if (trans.accountId === 2 && trans.transactionType === "Debit") {
                        accumulator = accumulator - trans.amount;
                    }
                    if (trans.accountId === 2 && trans.transactionType === "Credit") {
                        accumulator = accumulator + trans.amount;
                    }
                }
            })
            return accumulator;
        }, 0);

        return Object.assign(entry, {
            rolloverBalance1,
            rolloverBalance2
        });
    })
}

export default getTransactions;