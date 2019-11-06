const express = require("express");
const fs = require('fs');
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4040;

app.use("/manifest/dest", express.static('public/videos'));
app.use("/js", express.static("public/js"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res)=>{
  console.log("test");
  // const html = fs.readFileSync(path.resolve(__dirname, "./view/index.html"));
  res.sendFile(path.join(__dirname, "/view/index.html"));
});

app.get("/manifest", (req, res)=>{
  console.log("manifest");

  res.sendFile(path.join(__dirname, "/public/manifest/sample-manifest-full.mpd"));
});

app.post("/test", (req, res)=>{
  console.log(req.body);
  console.log("TEST");
  res.send("OK");
})

app.listen(PORT, ()=>{
  console.log(`Listening on ${PORT}...........`);
});
