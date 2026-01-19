const express = require("express");
const { DataStream } = require("scramjet");

const app = express();
const PORT = process.env.PORT || 3000;

// Example Scramjet usage: reverse incoming text
app.get("/proxy", async (req, res) => {
  const { input } = req.query;

  if (!input) return res.send("Send ?input=YOURTEXT");

  const stream = DataStream.from([input])
    .map(str => str.split("").reverse().join(""));

  const result = await stream.toArray();
  res.send(result[0]);
});

app.listen(PORT, () => console.log(`PRTY Scramjet Proxy running on port ${PORT}`));
