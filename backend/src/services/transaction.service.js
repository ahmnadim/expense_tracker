const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createTransaction = async (userId, data) => {
  return prisma.transaction.create({
    data: {
      ...data,
      amount: parseFloat(data.amount),
      date: new Date(data.date),
      userId,
    },
  });
};

const getTransactions = async (userId, filters) => {
  const {
    page = 1,
    limit = 10,
    category,
    startDate,
    endDate,
    payment,
    type,
    search,
  } = filters;

  const where = {
    userId,
    ...(type && { type }),
    ...(category && { category }),
    ...(payment && { paymentMethod: payment }),
    ...(startDate &&
      endDate && {
        date: { gte: new Date(startDate), lte: new Date(endDate) },
      }),
    ...(search && { description: { contains: search, mode: "insensitive" } }),
  };

  const transactions = await prisma.transaction.findMany({
    where,
    take: parseInt(limit),
    skip: (parseInt(page) - 1) * parseInt(limit),
    orderBy: { date: "desc" },
  });

  const total = await prisma.transaction.count({ where });
  const pages = Math.ceil(total / limit);

  return {
    transactions,
    pagination: {
      total,
      pageSize: parseInt(limit),
      page: parseInt(page),
      pages,
      hasNext: page < pages,
      hasPrev: page > 1,
      next: page < pages ? page + 1 : null,
      prev: page > 1 ? page - 1 : null,
    },
  };
};

const getDashboardStats = async (userId) => {
  const transactions = await prisma.transaction.groupBy({
    by: ["type"],
    _sum: { amount: true },
    where: { userId },
  });

  const incomeGroup = transactions.find((t) => t.type === "INCOME");
  const expenseGroup = transactions.find((t) => t.type === "EXPENSE");

  const totalIncome = incomeGroup ? incomeGroup._sum.amount : 0;
  const totalExpense = expenseGroup ? expenseGroup._sum.amount : 0;

  return { totalIncome, totalExpense, balance: totalIncome - totalExpense };
};

const updateTransaction = async (userId, transactionId, data) => {
  return prisma.transaction.update({
    where: { id: transactionId, userId },
    data: {
      ...data,
      amount: parseFloat(data.amount),
      date: new Date(data.date),
    },
  });
};

const deleteTransaction = async (userId, transactionId) => {
  return prisma.transaction.delete({ where: { id: transactionId, userId } });
};

module.exports = {
  createTransaction,
  getTransactions,
  getDashboardStats,
  updateTransaction,
  deleteTransaction,
};
