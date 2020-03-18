const Accounts = [
    {
        id: 1,
        name: "Bank of America",
        bill: false
    },
    {
        id: 2,
        name: "Chase",
        bill: false
    },
    {
        id: 3,
        name: "Rent",
        billingDay: 1,
        billedTo: [1, 2]
    },
    {
        id: 4,
        name: "Chase CC",
        billedTo: 2,
        billingDay: 5
    },
    {
        id: 5,
        name: "BOFA CC",
        billedTo: 1,
        billingDay: 9
    },
    {
        id: 6,
        name: "Electricity",
        billingDay: 9,
        billedTo: [1, 2]
    },
    {
        id: 7,
        name: "BJ’s CC",
        billingDay: 10,
        billedTo: [1, 2]
    },
    {
        id: 8,
        name: "Macy’s CC",
        billingDay: 13,
        billedTo: [1, 2]
    },
    {
        id: 9,
        name: "Honda CC",
        billingDay: 15,
        billedTo: [1, 2]
    },
    {
        id: 10,
        name: "Banana Republic CC",
        billingDay: 20,
        billedTo: [1, 2]
    },
    {
        id: 11,
        name: "Apple CC",
        billingDay: 30,
        billedTo: [1, 2]
    },
    {
        id: 12,
        name: "Salary Credit",
        biweekly: true,
        monthly: false,
        billedTo: [1, 2]
    },
    {
        id: 13,
        name: "Transfer",
        biweekly: true,
        monthly: false,
        billedTo: [1, 2]
    }
]

export default Accounts.map((account) => {
    return Object.assign({
        biweekly: false,
        bill: true,
        monthly: true,
    }, account);
})