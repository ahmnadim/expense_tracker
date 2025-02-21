const {
  registerUser,
  authenticateUser,
  refreshAccessToken,
  logoutUser,
} = require("../services/auth.service");

const register = async (req, res, next) => {
  try {
    const user = await registerUser(
      req.body.email,
      req.body.password,
      req.body.name
    );
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await authenticateUser(
      req.body.email,
      req.body.password
    );
    res.json({ user, accessToken, refreshToken });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const tokens = await refreshAccessToken(req.body.refreshToken);
    res.json(tokens);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const logout = async (req, res, next) => {
  try {
    await logoutUser(req.body.refreshToken);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { register, login, refreshToken, logout };
