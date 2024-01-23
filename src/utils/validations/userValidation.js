// const validator = require("validator");
const { body } = require("express-validator");

const createAccountValidation = [
  body("firstName")
    .isString()
    .isLength({ min: 3, max: 10 })
    .withMessage("Firstname must be a string with length 3 to 10 characters")
    .trim()
    .escape(),
  body("lastName")
    .isString()
    .isLength({ min: 3, max: 10 })
    .withMessage("Lastname must be a string with length 3 to 10 characters")
    .trim()
    .escape(),
  body("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("email").isEmail().withMessage("Please provide a valid email address").normalizeEmail(),
  body("phoneNumber")
    .optional()
    .isString()
    .isLength({ min: 11, max: 11 })
    .withMessage("Phone number should be 11 digits")
    .trim()
    .escape(),
  body("address").optional().isString().withMessage("Address is empty").trim(),
];

const loginValidation = [
  body("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .trim(),
  body("email").isEmail().withMessage("Please provide a valid email address").normalizeEmail(),
];

const updateProfileValidation = [
  body("firstName")
    .optional()
    .isString()
    .isLength({ min: 3, max: 10 })
    .withMessage("Firstname must be a string with length 3 to 10 characters")
    .trim()
    .escape(),
  body("lastName")
    .optional()
    .isString()
    .isLength({ min: 3, max: 10 })
    .withMessage("Lastname must be a string with length 3 to 10 characters")
    .trim()
    .escape(),
  body("phoneNumber")
    .optional()
    .optional()
    .isString()
    .isLength({ min: 11, max: 11 })
    .withMessage("Phone number should be 11 digits")
    .trim()
    .escape(),
  body("address").optional().isString().withMessage("Address is empty").trim(),
];

const changePasswordValidation = [
  body("newPassword")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .trim(),
];
module.exports = {
  createAccountValidation,
  loginValidation,
  updateProfileValidation,
  changePasswordValidation,
};

// cnsole.log(body);
// const validationErrors = [];
// if (!body.firstName || validator.isLength( body.firstName, {min: 3, max: 10}))
//   validationErrors.push({ msg: "First name cannot be empty" });
// if (validator.isEmpty(body.lastName))
//   validationErrors.push({ msg: "Last name cannot be empty" });
// if (validator.isEmpty(body.userName))
//   validationErrors.push({ msg: "Username cannot be empty" });
// if (!validator.isEmail(body.email))
//   validationErrors.push({ msg: "Please enter a valid email address." });
// if (!validator.isLength(body.password, { min: 6 }))
//   validationErrors.push({
//     msg: "Password must be at least 6 characters long",
//   });
// if (body.password !== body.confirmPassword)
//   validationErrors.push({ msg: "Passwords do not match" });
// if (validationErrors.length) {
//   return validationErrors;
//   // return res.status(400).json({ success: false, msg: validationErrors });
// }
// body.email = validator.normalizeEmail(body.email, {
//   gmail_remove_dots: false,
// });
// console.log(body);
// return null;
//   } catch (err) {
//     console.log(err);
//   }
// ]

// module.exports = createAccountValidation;
