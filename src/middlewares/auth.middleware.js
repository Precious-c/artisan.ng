const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const token = req.header("authorization");
    if (!token) return res.status(401).send({ message: "No authorization" });
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (!user) return res.status(401).send({ message: "Unauthorized, access denied!" });
    req.user = user.id;

    req.token = token;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send({ success: false, message: err.message });
  }
}
function signToken(id) {
  const expiresIn = "2h";
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn });
  return token;
}

module.exports(auth, signToken);
