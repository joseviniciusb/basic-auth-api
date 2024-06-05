const express = require("express");
const app = express();
const port = 3000;

const basicAuth = (req, res, next) => {
  // parse login and password from headers
  const auth = { login: "lalaland", password: "123456" };
  console.log("aaaa", req.headers.authorization);
  const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
  const [login, password] = Buffer.from(b64auth, "base64")
    .toString()
    .split(":");

  //verify login and password are set and correct

  if (login && password && login === auth.login && password === auth.password) {
    console.log("verificou");
    return next();
  } else {
    // Access denied...
    res.set("WWW-Authenticate", 'Basic realm="401"'); // change this
    res.status(401).send("Authentication required."); // custom message
  }
};

app.get("/", basicAuth, (req, res) => {
  res.send("Hello, authenticated user!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
