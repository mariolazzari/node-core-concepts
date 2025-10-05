# Node core concepts

## Introduction

### Setup

```sh
# Installing Xcode Command Line Tools
xcode-select --install
# Installing Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
# Switching to Zsh
chsh -s /bin/zsh
```

### First app

```js
const http = require("node:http");
const fs = require("fs");

const server = http.createServer();

server.on("request", (_req, res) => {
  const result = fs.readFileSync("text.txt");
  res.setHeader("Content-Type", "text/plain");

  res.end(result);
});

server.listen(4000, "127.0.0.1", () => {
  console.log("Server started on", server.address());
});
```

### Node vesion manager

```sh
nvm ls
which node
nvm install 24
nvm use 22
nvm alias default 24
nvm uninstall 20
cat .nvmrc
nvm use 24
node -v > .nvmrc
```

### NodeJS under the hood

[V8](https://v8.dev/)
[libuv](https://libuv.org/)
