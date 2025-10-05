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

console.log("A");
setTimeout(() => {
  console.log("B");
}, 0);
console.log("C");
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

## Understanding EventEmitter

### EventEmitter Object

[EventEmitter](https://nodejs.org/en/learn/asynchronous-work/the-nodejs-event-emitter)
[Events](https://nodejs.org/api/events.html)

```js
const EventEmitter = require("events"); // or include ./events.js to use the custom implementation

class Emitter extends EventEmitter {}

const myE = new Emitter();

myE.on("foo", () => {
  console.log("An event occurred 1.");
});

myE.on("foo", () => {
  console.log("An event occurred 2.");
});

myE.on("foo", x => {
  console.log("An event with a parameter occurred:");
  console.log(x);
});

myE.once("bar", () => {
  console.log("An event occurred bar.");
});

// myE.emit("foo");
// myE.emit("foo", "some text");

myE.emit("bar");
myE.emit("bar");
myE.emit("bar");
myE.emit("bar");
myE.emit("bar");
myE.emit("bar");
myE.emit("bar");
myE.emit("bar");
myE.emit("bar");
```

```js
// This is the custom implementation of the EventEmitter object.
// The code was grabbed from https://www.freecodecamp.org/news/how-to-code-your-own-event-emitter-in-node-js-a-step-by-step-guide-e13b7e7908e1/

// Make sure to export the class to be able to use it in the app.js file
module.exports = class EventEmitter {
  listeners = {}; // Master object

  addListener(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
    return this;
  }

  on(eventName, fn) {
    return this.addListener(eventName, fn);
  }

  once(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    const onceWrapper = () => {
      fn();
      this.off(eventName, onceWrapper);
    };
    this.listeners[eventName].push(onceWrapper);
    return this;
  }

  off(eventName, fn) {
    return this.removeListener(eventName, fn);
  }

  removeListener(eventName, fn) {
    let lis = this.listeners[eventName];
    if (!lis) return this;
    // We've added an equal sign to make the once method work as expected
    for (let i = lis.length; i >= 0; i--) {
      if (lis[i] === fn) {
        lis.splice(i, 1);
        break;
      }
    }
    return this;
  }

  emit(eventName, ...args) {
    let fns = this.listeners[eventName];
    if (!fns) return false;
    fns.forEach(f => {
      f(...args);
    });
    return true;
  }

  listenerCount(eventName) {
    let fns = this.listeners[eventName] || [];
    return fns.length;
  }

  rawListeners(eventName) {
    return this.listeners[eventName];
  }
};
```

## Understanding Buffers

### Buffers introduction

In **computer science**, a **buffer** is:

> **A temporary memory area used to store data while it is being transferred between two locations or processes.**

#### 🔹 Detailed Explanation

A buffer acts as an **intermediate storage** that helps manage differences in:

* **Speed** (e.g., between a fast CPU and a slow disk)
* **Data rate** (e.g., between a network stream and an application)
* **Processing timing** (e.g., between producer and consumer processes)

#### 🔹 Common Examples

* **I/O buffering:** When reading from or writing to a disk, data is stored in a buffer to reduce the number of direct I/O operations.
* **Network buffering:** Packets received over a network are stored in a buffer before being processed.
* **Keyboard buffer:** Keystrokes are stored temporarily before being read by a program.
* **Video/audio buffering:** Media data is preloaded into a buffer to ensure smooth playback.

#### 🔹 Purpose

* Increases **efficiency** by reducing waiting times.
* Enables **asynchronous operations** (producer and consumer can work independently).
* Helps manage **burst data** or uneven data flow.

#### 🔹 Related Terms

* **Buffer overflow:** When more data is written to a buffer than it can hold, causing potential errors or security vulnerabilities.
* **Circular buffer (ring buffer):** A buffer that wraps around when full, commonly used in streaming data scenarios.

Would you like a diagram or analogy (e.g., a “water bucket” analogy) to visualize how buffering works?

### Binary buffers

### Hexadecimal numbers
