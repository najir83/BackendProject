const { json, urlencoded } = require("body-parser");
const express = require("express");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
const app = express();
const port = 8001;


app.use(express.json());
app.use(urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.get("/", (req, res) => {
  return res.render("home");
});

app.post("/upload", upload.single("profileImg"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  return res.redirect("/");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
