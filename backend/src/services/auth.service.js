const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE,
  });

  return { accessToken, refreshToken };
};

const registerUser = async (email, password, name) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { email, password: hashedPassword, name },
    select: { id: true, email: true, name: true },
  });
};

const authenticateUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }

  const tokens = generateTokens(user.id);
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: tokens.refreshToken },
  });

  return {
    user: { id: user.id, email: user.email, name: user.name },
    ...tokens,
  };
};

const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) throw new Error("Refresh token required");

  const user = await prisma.user.findFirst({ where: { refreshToken } });
  if (!user) throw new Error("Invalid refresh token");

  try {
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: null },
    });
    throw new Error("Invalid refresh token");
  }

  const tokens = generateTokens(user.id);
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: tokens.refreshToken },
  });

  return tokens;
};

const logoutUser = async (refreshToken) => {
  await prisma.user.update({
    where: { refreshToken },
    data: { refreshToken: null },
  });
};

module.exports = {
  generateTokens,
  registerUser,
  authenticateUser,
  refreshAccessToken,
  logoutUser,
};
