const { check, body } = require("express-validator");
const db = require("../../database/models");
const { getUserByEmail } = require("../../services/user.service");

const userRegisterValidationRules = () => {
  return [
    check("name").notEmpty().withMessage("Name is required"),
    check("last_name").notEmpty().withMessage("Last name is required"),
    check("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format"),
    body("email").custom(async (value) => {
      const user = await getUserByEmail(value);
      if (user) {
        return Promise.reject("This email is already registered");
      }
    }),
    check("pass")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({
        min: 6,
        max: 12,
      })
      .withMessage("Password must be between 6 and 12 characters"),
    body("pass2")
      .custom((value, { req }) => (value !== req.body.pass ? false : true))
      .withMessage("Passwords do not match"),
    check("terms")
      .isString("on")
      .withMessage("You must accept the bases and conditions"),
    check("phone")
      .optional()
      .isMobilePhone()
      .withMessage("Invalid phone number format"),
    check("rol").isInt().withMessage("Invalid role"),
    check("avatar").optional().isURL().withMessage("Invalid avatar URL"),
  ];
};

module.exports = {
  userRegisterValidationRules,
};
