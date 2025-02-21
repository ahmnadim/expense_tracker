const { PrismaClient, TransactionType } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  // Create a sample user (if needed)
  const user = await prisma.user.create({
    data: {
      name: "Nadim",
      email: "nadim@gmail.com",
      password: await bcrypt.hash("111111", 10),
      // add any additional fields required by your User model
    },
  });

  // Prepare an array of sample transactions
  const transactions = [
    {
      amount: 1000.0,
      type: TransactionType.INCOME,
      date: new Date("2025-01-01"),
      category: "salary",
      description: "Monthly salary payment",
      paymentMethod: "bank",
      userId: user.id,
    },
    {
      amount: 75.5,
      type: TransactionType.EXPENSE,
      date: new Date("2025-01-05"),
      category: "food",
      description: "Supermarket shopping",
      paymentMethod: "credit",
      userId: user.id,
    },
    {
      amount: 50.0,
      type: TransactionType.EXPENSE,
      date: new Date("2025-01-07"),
      category: "transportation",
      description: "Bus fare",
      paymentMethod: "cash",
      userId: user.id,
    },

    {
      amount: 500.0,
      type: "INCOME",
      date: new Date("2025-01-01"),
      category: "salary",
      description: "Monthly salary received",
      paymentMethod: "bank",
      userId: user.id,
    },
    {
      amount: 50.0,
      type: "EXPENSE",
      date: new Date("2025-01-02"),
      category: "food",
      description: "Bought groceries from supermarket",
      paymentMethod: "credit",
      userId: user.id,
    },
    {
      amount: 30.5,
      type: "EXPENSE",
      date: new Date("2025-01-03"),
      category: "transportation",
      description: "Taxi fare to office",
      paymentMethod: "cash",
      userId: user.id,
    },
    {
      amount: 100.0,
      type: "INCOME",
      date: new Date("2025-01-04"),
      category: "salary",
      description: "Payment from freelance project",
      paymentMethod: "credit",
      userId: user.id,
    },
    {
      amount: 20.0,
      type: "EXPENSE",
      date: new Date("2025-01-05"),
      category: "entertainment",
      description: "Movie ticket",
      paymentMethod: "debit",
      userId: user.id,
    },
    {
      amount: 250.0,
      type: "INCOME",
      date: new Date("2025-01-06"),
      category: "utilitiess",
      description: "Stock market profit",
      paymentMethod: "bank",
      userId: user.id,
    },
    {
      amount: 75.0,
      type: "EXPENSE",
      date: new Date("2025-01-07"),
      category: "food",
      description: "Dinner at a restaurant",
      paymentMethod: "credit",
      userId: user.id,
    },
    {
      amount: 150.0,
      type: "INCOME",
      date: new Date("2025-01-08"),
      category: "other",
      description: "Year-end bonus",
      paymentMethod: "bank",
      userId: user.id,
    },
    {
      amount: 40.0,
      type: "EXPENSE",
      date: new Date("2025-01-09"),
      category: "utilities",
      description: "Electricity bill",
      paymentMethod: "cash",
      userId: user.id,
    },
    {
      amount: 60.0,
      type: "EXPENSE",
      date: new Date("2025-01-10"),
      category: "entertainment",
      description: "Monthly internet bill",
      paymentMethod: "credit",
      userId: user.id,
    },
    {
      amount: 500.0,
      type: "INCOME",
      date: new Date("2025-01-11"),
      category: "salary",
      description: "Client project payment",
      paymentMethod: "bank",
      userId: user.id,
    },
    {
      amount: 80.0,
      type: "EXPENSE",
      date: new Date("2025-01-12"),
      category: "utilities",
      description: "Bought new shoes",
      paymentMethod: "debit",
      userId: user.id,
    },
    {
      amount: 35.0,
      type: "EXPENSE",
      date: new Date("2025-01-13"),
      category: "transportation",
      description: "Gas refill for car",
      paymentMethod: "cash",
      userId: user.id,
    },
    {
      amount: 200.0,
      type: "INCOME",
      date: new Date("2025-01-14"),
      category: "other",
      description: "Gift received from a friend",
      paymentMethod: "cash",
      userId: user.id,
    },
    {
      amount: 120.0,
      type: "EXPENSE",
      date: new Date("2025-01-15"),
      category: "other",
      description: "Doctor consultation",
      paymentMethod: "credit",
      userId: user.id,
    },
    {
      amount: 20.0,
      type: "EXPENSE",
      date: new Date("2025-01-16"),
      category: "entertainment",
      description: "Netflix monthly entertainment",
      paymentMethod: "bank",
      userId: user.id,
    },
    {
      amount: 300.0,
      type: "INCOME",
      date: new Date("2025-01-17"),
      category: "salary",
      description: "Website development payment",
      paymentMethod: "credit",
      userId: user.id,
    },
    {
      amount: 15.0,
      type: "EXPENSE",
      date: new Date("2025-01-18"),
      category: "food",
      description: "Bought coffee from Starbucks",
      paymentMethod: "cash",
      userId: user.id,
    },
    {
      amount: 50.0,
      type: "EXPENSE",
      date: new Date("2025-01-19"),
      category: "utilities",
      description: "Bought programming books",
      paymentMethod: "debit",
      userId: user.id,
    },
    {
      amount: 400.0,
      type: "INCOME",
      date: new Date("2025-01-20"),
      category: "salary",
      description: "Mobile app development payment",
      paymentMethod: "bank",
      userId: user.id,
    },
  ];

  // Insert the transactions into the database
  for (const tx of transactions) {
    await prisma.transaction.create({
      data: tx,
    });
  }

  console.log("Seeding complete.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Seeding error: ", error);
    await prisma.$disconnect();
    process.exit(1);
  });
