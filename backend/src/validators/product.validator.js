import { body, validationResult } from "express-validator";
import { param } from "express-validator";

export const createProductValidator = [
  body("name")
    .exists().withMessage("Name is required").bail()
    .isString().withMessage("Name must be a String").bail()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage("Name length must be between 2 to 100 characters"),

  body("description")
    .exists().withMessage("Description is required").bail()
    .isString().withMessage("Description must be a String").bail()
    .trim()
    .isLength({ min: 20, max: 500 }).withMessage("Description length must be between 20 to 500 characters"),

  body("price")
    .exists().withMessage("Price is required").bail()
    .isNumeric().withMessage("Price must be a Number").bail()
    .isFloat({ min: 0 }).withMessage("Price cannot be negative"),

  body("stock")
    .exists().withMessage("Stock is required").bail()
    .isInt({ min: 0 }).withMessage("Stock must be a non-negative Integer"),

  body("image")
    .exists().withMessage("Image is required").bail()
    .isString().withMessage("Image must be a String").bail()
    .trim()
    .isURL().withMessage("Image must be a valid URL"),

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

export const productIdValidator = [
  param("id")
    .exists().withMessage("Product ID is required").bail()
    .isMongoId().withMessage("Invalid product ID"),

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

export const updateProductValidator = [
  body("name")
    .exists().withMessage("Name is required").bail()
    .isString().withMessage("Name must be a String").bail()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage("Name length must be between 2 to 100 characters"),

  body("description")
    .exists().withMessage("Description is required").bail()
    .isString().withMessage("Description must be a String").bail()
    .trim()
    .isLength({ min: 20, max: 500 }).withMessage("Description length must be between 20 to 500 characters"),

  body("price")
    .exists().withMessage("Price is required").bail()
    .isNumeric().withMessage("Price must be a Number").bail()
    .isFloat({ min: 0 }).withMessage("Price cannot be negative"),

  body("stock")
    .exists().withMessage("Stock is required").bail()
    .isInt({ min: 0 }).withMessage("Stock must be a non-negative Integer"),

  body("image")
    .exists().withMessage("Image is required").bail()
    .isString().withMessage("Image must be a String").bail()
    .trim()
    .isURL().withMessage("Image must be a valid URL"),

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