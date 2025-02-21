const express = require("express");
const {
  register,
  login,
  refreshToken,
  logout,
} = require("../controllers/auth.controller");
const { validate } = require("../middleware/validate.middleware");
const { registerSchema, loginSchema } = require("../validations/auth.schema");

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

module.exports = router;
