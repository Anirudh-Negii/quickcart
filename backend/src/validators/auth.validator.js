import { body, validationResult } from "express-validator";

export const registerValidator = [
  body("name")
    .exists().withMessage("Name is required").bail()
    .isString().withMessage("Name must be a String").bail()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage("Name length must be between 2 to 50 characters"),

  body("email")
    .exists().withMessage("Email is required").bail()
    .isString().withMessage("Email must be a String").bail()
    .trim()
    .isEmail().withMessage("Enter a valid email address"),

  body("password")
    .exists().withMessage("Password is required").bail()
    .isString().withMessage("Password must be a String").bail()
    .isLength({ min: 6 })
    .withMessage("Password must be minimum 6 characters long").bail()
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter").bail()
    .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter").bail()
    .matches(/[^A-Za-z0-9]/).withMessage("Password must contain at least one special character"),

  body("confirmPassword")
    .exists().withMessage("Confirm password is required").bail()
    .isString().withMessage("Confirm password must be a String").bail()
    .custom((value, { req }) => value === req.body.password).withMessage("Passwords do not match"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Request",
        errors: errors.array(),
      });
    }

    next();
  },
];