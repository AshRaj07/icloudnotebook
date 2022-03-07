const jwt = require("jsonwebtoken");
const JWt_SECRET = process.env.JWt_SECRET;

const fetchuser = (req, res, next) => {
  //Get the user from jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send("Access Denied Invalid Token");
  }
  try {
    const data = jwt.verify(token, JWt_SECRET);
    //As we are extracting from token so it is assured that which one was actually signed in

    //whenever someone try to validate login information we just send user*validate data info*:{user.id *Database user id*} to request body so that upon request we can verify easily
    
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send("Access Denied Invalid Token");
  }
};

module.exports = fetchuser;
