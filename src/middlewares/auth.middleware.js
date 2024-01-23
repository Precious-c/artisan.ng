const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const reqHeader = req.header("authorization");
    if (!reqHeader) return res.status(401).send({ message: "No authorization header provided" });
    const token = reqHeader.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (!user) return res.status(401).send({ message: "Unauthorized, access denied!" });
    req.userId = user.userID;
    // req.token = token;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send({ success: false, message: err.message });
  }
}

function signToken(id) {
  const expiresIn = "1h";
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn });
  return token;
}

module.exports = { auth, signToken };
