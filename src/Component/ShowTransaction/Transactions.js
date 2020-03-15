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
    {
        ToAccount: 1,
        NameOfTransaction: "Bofa CC",
        DueAmount: 134.66,
        Amount: 134.66,
        DateOfTransaction: "02/09/2020"
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
        ],
        RolloverBalance1: 1116.47,
        RolloverBalance2: 969.85
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
        ],
        RolloverBalance1: 1284.06,
        RolloverBalance2: 1811.65
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
        ],
        RolloverBalance1: 100,
        RolloverBalance2: 627.59
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
        ],
        RolloverBalance1: 100,
        RolloverBalance2: 100
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
        ],
        RolloverBalance1: 1828.49,
        RolloverBalance2: 1600
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
        ],
        RolloverBalance1: 1128.49,
        RolloverBalance2: 1050
    },
    {
        NameOfTransaction: "BOFA CC",
        DueAmount: 134.66,
        DateOfTransaction: "02/09/2020",
        transactions: [
            {
                ToAccount: 1,
                Amount: 134.66
            }
        ],
        RolloverBalance1: 993.83,
        RolloverBalance2: 1050
    },
]

export default mergedTransactions