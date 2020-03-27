const getTransactions = (transactions) => {
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
        }, 1702.87);

        let rolloverBalance2 = newTransactions.reduce((accumulator, current, y) => {
            if (y <= x) {
                if (current.accountId === 9 && current.transactionType) {
                    accumulator = accumulator - current.amount;
                }
                if (current.accountId === 9 && !current.transactionType) {
                    accumulator = accumulator + current.amount;
                }
            }
            return accumulator;
        }, 1218.6);

        return Object.assign(entry, {
            rolloverBalance1,
            rolloverBalance2
        });
    })
}

export default getTransactions;