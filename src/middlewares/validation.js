const validator = require("validator");

function createAccountValidation(body) {
  try {
    console.log(body);
    const validationErrors = [];
    if (validator.isEmpty(body.firstName))
      validationErrors.push({ msg: "First name cannot be empty" });
    if (validator.isEmpty(body.lastName))
      validationErrors.push({ msg: "Last name cannot be empty" });
    if (validator.isEmpty(body.userName))
      validationErrors.push({ msg: "Username cannot be empty" });
    if (!validator.isEmail(body.email))
      validationErrors.push({ msg: "Please enter a valid email address." });
    if (!validator.isLength(body.password, { min: 6 }))
      validationErrors.push({
        msg: "Password must be at least 6 characters long",
      });
    if (body.password !== body.confirmPassword)
      validationErrors.push({ msg: "Passwords do not match" });
    if (validationErrors.length) {
      return res.status(400).json({ success: false, msg: validationErrors });
    }
    body.email = validator.normalizeEmail(body.email, {
      gmail_remove_dots: false,
    });
    console.log(body);
    return;
  } catch (err) {}
}

module.exports = createAccountValidation;
