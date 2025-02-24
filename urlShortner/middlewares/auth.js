const { getUser } = require("../service/auth");
function checkForAuthentication(req, res, next) {
  // const authorizationHeaderValue = req.headers["authorization"];
  // const token = authorizationHeaderValue.split("Bearer ")[1];

  // for Cookie
  const authorizationHeaderValue = req.cookies?.token;

  req.user = null;
  if (!authorizationHeaderValue) return next();
  const token = authorizationHeaderValue;
  const user = getUser(token);
  req.user = user;
  return next();
}

//--- > diffrernt authentication
// async function restrictToLoggedinUserOnly(req, res, next) {
//   // const userUid = req.cookies?.uid;
//   const userUid = req.headers['authorization'];

//   if (!userUid) return res.redirect("/login");
//   const token=userUid.split('Bearer ')[1];
//   const user = getUser(token);
//   if (!user) return res.redirect("/login");

//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   // const userUid = req.cookies?.uid;
//   const userUid = req.headers['authorization'];
//   const token=userUid.split('Bearer ')[1];
//   const user = getUser(token);

//   req.user = user;
//   next();
// }

//with Authorization
function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("./login");
    if (!roles.includes(req.user.role)) return res.end("UnAuthorised");

    return next();
  };
}

module.exports = {
  checkForAuthentication,
  restrictTo,
};
