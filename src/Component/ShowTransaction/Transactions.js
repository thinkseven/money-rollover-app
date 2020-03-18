const transactions = [
    {
        nameOfTransaction: "balance as of",
        dueAmount: null,
        dateOfTransaction: "01/30/2020",
        transactions: [
            {
                toAccount: 1,
                amount: 1116.47,
                type: "Credit"
            },
            {
                toAccount: 2,
                amount: 969.85,
                type: "Credit"
            }
        ]
    },
    {
        nameOfTransaction: "Adjustments",
        dueAmount: null,
        dateOfTransaction: "01/31/2020",
        transactions: [
            {
                toAccount: 1,
                amount: 167.59,
                type: "Credit"
            },
            {
                toAccount: 2,
                amount: 841.8,
                type: "Credit"
            }
        ]
    },
    {
        nameOfTransaction: "Rent",
        dueAmount: 2368.12,
        dateOfTransaction: "02/01/2020",
        transactions: [
            {
                toAccount: 1,
                amount: 1184.06,
                type: "Debit"
            },
            {
                toAccount: 2,
                amount: 1184.06,
                type: "Debit"
            }
        ]
    },
    {
        nameOfTransaction: "Chase CC",
        dueAmount: 527.59,
        dateOfTransaction: "02/05/2020",
        transactions: [
            {
                toAccount: 2,
                amount: 527.59,
                type: "Debit"
            }
        ]
    },
    {
        nameOfTransaction: "Salary Credit",
        dueAmount: null,
        dateOfTransaction: "02/07/2020",
        transactions: [
            {
                toAccount: 1,
                amount: 1728.49,
                type: "Credit"
            },
            {
                toAccount: 2,
                amount: 1500,
                type: "Credit"
            }
        ]
    },
    {
        nameOfTransaction: "Transfer",
        dueAmount: null,
        dateOfTransaction: "02/07/2020",
        transactions: [
            {
                toAccount: 1,
                amount: 700,
                type: "Debit"
            },
            {
                toAccount: 2,
                amount: 550,
                type: "Debit"
            }
        ]
    },
    {
        nameOfTransaction: "BOFA CC",
        dueAmount: 134.66,
        dateOfTransaction: "02/09/2020",
        transactions: [
            {
                toAccount: 1,
                amount: 134.66,
                type: "Debit"
            }
        ]
    },
    {
        nameOfTransaction: "Electricity",
        dueAmount: 149.40,
        dateOfTransaction: "02/09/2020",
        transactions: [
            {
                toAccount: 2,
                amount: 149.40,
                type: "Debit"
            }
        ]
    },
    {
        nameOfTransaction: "BJ’s CC",
        dueAmount: 551.90,
        dateOfTransaction: "02/10/2020",
        transactions: [
            {
                toAccount: 2,
                amount: 275.95,
                type: "Debit"
            },
            {
                toAccount: 1,
                amount: 275.95,
                type: "Debit"
            }
        ]
    },
    {
        nameOfTransaction: "Macy’s CC",
        dueAmount: 3.57,
        dateOfTransaction: "02/13/2020",
        transactions: [
            {
                toAccount: 2,
                amount: 3.57,
                type: "Debit"
            }
        ]
    },
    {
        nameOfTransaction: "Honda CC",
        dueAmount: 476.49,
        dateOfTransaction: "02/15/2020",
        transactions: [
            {
                toAccount: 2,
                amount: 238.49,
                type: "Debit"
            },
            {
                toAccount: 1,
                amount: 238,
                type: "Debit"
            }
        ]
    },
    {
        nameOfTransaction: "Banana Republic CC",
        dueAmount: 100.91,
        dateOfTransaction: "02/20/2020",
        transactions: [
            {
                toAccount: 1,
                amount: 100.91,
                type: "Debit"
            }
        ]
    }
]

const getTransactions = () => {
    const newTransactions = [...transactions];
    return newTransactions.map((entry, x) => {

        let rolloverBalance1 = newTransactions.reduce((accumulator, current, y) => {
            current.transactions.forEach((trans) => {
                if (y <= x) {
                    if (trans.toAccount === 1 && trans.type === "Debit") {
                        accumulator = accumulator - trans.amount
                    }
                    if (trans.toAccount === 1 && trans.type === "Credit") {
                        accumulator = accumulator + trans.amount
                    }
                }
            })
            return accumulator;
        }, 0);

        let rolloverBalance2 = newTransactions.reduce((accumulator, current, y) => {
            current.transactions.forEach((trans) => {
                if (y <= x) {
                    if (trans.toAccount === 2 && trans.type === "Debit") {
                        debugger;
                        accumulator = accumulator - trans.amount;
                    }
                    if (trans.toAccount === 2 && trans.type === "Credit") {
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

export default getTransactions();