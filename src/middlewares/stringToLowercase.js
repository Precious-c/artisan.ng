// middleware.js

function convertToLowercase(req, res, next) {
  // // Convert params (excluding password) to lowercase
  // for (const param in req.params) {
  //   if (typeof req.params[param] === 'string' && param.toLowerCase() !== 'password') {
  //     req.params[param] = req.params[param].toLowerCase();
  //   }
  // }

  // Convert body (excluding password) to lowercase
  for (const key in req.body) {
    if (typeof req.body[key] === "string" && key.toLowerCase() !== "password") {
      req.body[key] = req.body[key].toLowerCase();
    }
  }

  next();
}

module.exports = { convertToLowercase };

module.exports = { convertToLowercase };
