const fs = require("fs");

fs.copyFile("command.txt", "copied-cb.txt", err => {
  if (err) {
    console.error(err);
  }
});
