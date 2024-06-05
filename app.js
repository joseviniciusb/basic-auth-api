const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
  const auth = { login: "yourlogin", password: "yourpassword" };
  console.log('dasdsadas', req.headers.authorization);
  const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
  const [login, password] = Buffer.from(b64auth, "base64")
    .toString()
    .split(":");

  console.log(login, password);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
