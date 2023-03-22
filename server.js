const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3000;

const app = express();

app.use('/static', express.static(path.join(__dirname, "build/static")));
app.use('/manifest.json', express.static(path.join(__dirname, "build", "manifest.json")));





app.get("/listing/:id", (req, res) => {
  let listingId = req.params.id
  const filePath = path.resolve(process.cwd(), "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

     data = data
      .replace(/__TITLE__/g, "Piece - Turn Tweets into collectibles")
      .replace(/__DESCRIPTION__/g, "Collect a piece of any moment. Making digital moments better.")
      .replace(/__IMAGE__/g, process.env.REACT_APP_BACKEND_URL+"piece/previewImage/"+listingId);

    res.send(data)
  });
});
app.get("*", (req, res) => {

  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    data = data
    .replace(/__TITLE__/g, "Piece - Turn Tweets into collectibles")
    .replace(/__DESCRIPTION__/g, "Collect a piece of any moment. Making digital moments better.")

    res.send(data)
  });
});
 
app.use(express.static(path.resolve(__dirname, "./build")))

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})