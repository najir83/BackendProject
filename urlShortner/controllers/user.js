const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });

  // For statefull --->
  // const sessionId = uuidv4();
  // setUser(sessionId, user);
  // res.cookie("uid", sessionId);

  //stateLess --->

  const token = setUser(user);
  // res.cookie('uid', token,{
  //   domain:"www.google.com"
  // });
  // res.cookie('uid', token, {
  //   expires: new Date(Date.now() + 50* 1000),
  // });

  // now use header //---> responcce based for mobile and all

  // return res.json({
  //   token,
  // })

  res.cookie("token", token);
  return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
