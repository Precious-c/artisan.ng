const { getUser } = require("../services/user.service");

//checks is a logged in user is admin
async function admin(req, res, next) {
  try {
    const user = await getUser(req.userId);
    if (user.role !== "admin")
      return res.status(401).json({ success: false, msg: "Unauthorized: Access not granted" });
    next();
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
}

module.exports = { admin };
