// const sessionIdToUserMap = new Map();

// function setUser(id, user) {
//   sessionIdToUserMap.set(id, user);
// }

// function getUser(id) {
//   return sessionIdToUserMap.get(id);
// }

//StateLess authentication -- token based

const { json } = require("express");
const jwt = require("jsonwebtoken");
const secret = "na*j%i$$r";
function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secret
  );
}
function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.log("error happend");
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
