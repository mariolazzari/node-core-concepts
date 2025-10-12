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

- **Speed** (e.g., between a fast CPU and a slow disk)
- **Data rate** (e.g., between a network stream and an application)
- **Processing timing** (e.g., between producer and consumer processes)

#### 🔹 Common Examples

- **I/O buffering:** When reading from or writing to a disk, data is stored in a buffer to reduce the number of direct I/O operations.
- **Network buffering:** Packets received over a network are stored in a buffer before being processed.
- **Keyboard buffer:** Keystrokes are stored temporarily before being read by a program.
- **Video/audio buffering:** Media data is preloaded into a buffer to ensure smooth playback.

#### 🔹 Purpose

- Increases **efficiency** by reducing waiting times.
- Enables **asynchronous operations** (producer and consumer can work independently).
- Helps manage **burst data** or uneven data flow.

#### 🔹 Related Terms

- **Buffer overflow:** When more data is written to a buffer than it can hold, causing potential errors or security vulnerabilities.
- **Circular buffer (ring buffer):** A buffer that wraps around when full, commonly used in streaming data scenarios.

### Binary numbers

A **binary number** is a number expressed in the **base-2 numeral system**, which uses only two digits: **0** and **1**.

Each digit in a binary number is called a **bit** (short for _binary digit_).

In the binary system:

- Each position represents a power of **2**, starting from the rightmost bit (which is (2^0)).
- Example:
  (1011*2 = (1 \times 2^3) + (0 \times 2^2) + (1 \times 2^1) + (1 \times 2^0) = 8 + 0 + 2 + 1 = 11*{10})

#### Summary

- **Base:** 2
- **Digits used:** 0 and 1
- **Used in:** Computers and digital systems, because electronic circuits can easily represent two states (on/off, true/false, 1/0).

Would you like me to include a short diagram showing how binary numbers work?

### Hexadecimal numbers

A **hexadecimal number** is a number expressed in the **base-16 numeral system**, which uses **16 symbols** to represent values.

#### 🔢 The digits in hexadecimal

- 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
- A, B, C, D, E, F — which represent the decimal values 10 to 15.

#### ⚙️ How it works

Each position in a hexadecimal number represents a **power of 16**, starting from the rightmost digit (which is (16^0)).

**Example:**
[
2AF_{16} = (2 \times 16^2) + (10 \times 16^1) + (15 \times 16^0)
]
[
= (2 \times 256) + (10 \times 16) + (15 \times 1)
]
[
= 512 + 160 + 15 = 687_{10}
]

#### 💡 Uses

- Commonly used in **computer science** and **digital electronics** because it’s more compact than binary.
- Each hexadecimal digit corresponds to **4 binary bits** (since (16 = 2^4)).

  - Example:
    (A3\_{16} = 1010,0011_2)

#### ✅ Summary

| System      | Base | Digits   | Example  |
| ----------- | ---- | -------- | -------- |
| Decimal     | 10   | 0–9      | 245      |
| Binary      | 2    | 0–1      | 11110101 |
| Hexadecimal | 16   | 0–9, A–F | F5       |

### Programming calculator

### Characters coding

#### Character sets

Characters that a system uses for a representation, assigning a numeric value to those symbols.

#### Unicode

Standard for representing characters world wide.
More than 150k characters

#### ASCII

It defines 128 characters, lowercase amd uppercase.

```sh
man ascii
```

#### Encoders

Something meaningful -> 1010 1010 0011....

#### Decoders

0011 1010 0101 ... -> Something meaningful

#### Characters encoding

A system for assigning a sequence of bytes to a character.
UTF-8 is the most common one.

### Concept of buffers

A buffer is a temporary storage area used to hold data while it is being transferred between two locations, that operate at different speeds

#### Buffer use cases

- When you stream a video online, your device downloads a small portion of the video into a buffer before playing it.
  → This helps prevent interruptions if your internet connection fluctuates.
- When a printer prints a document, the computer sends data to a print buffer first, so the printer can access it at its own speed.

### Buffers in action

[NodeJS buffers](https://nodejs.org/api/buffer.html)
[Symbols](https://symbl.cc/)

```js
const { Buffer } = require("buffer");

// 4 bytes buffer allocation
const memoryContainer = Buffer.alloc(4);
console.log("Buffer:", memoryContainer);
console.log("First element:", memoryContainer[0]);

// set fist element
memoryContainer[0] = 0xf4;
console.log("Buffer after setting first element:", memoryContainer);
console.log("First element after setting:", memoryContainer[0]);

// set all elements
memoryContainer[1] = 0x34;
memoryContainer[2] = 0x1b;
memoryContainer[3] = 0x2c;
console.log("Buffer after setting all elements:", memoryContainer);
console.log("Second element:", memoryContainer[1]);

// add negative number
memoryContainer.writeInt8(-5, 0);
console.log("Buffer after setting negative number:", memoryContainer);
console.log(
  "First element after setting negative number:",
  memoryContainer.readInt8(0)
);

// add number greater than 255
memoryContainer[0] = 300;
console.log("Buffer after setting 300:", memoryContainer);
console.log("First element after setting 300:", memoryContainer[0]);

// toString method
console.log("UTF-8 toString:", memoryContainer.toString("utf-8"));
console.log("HEX toString:", memoryContainer.toString("hex"));

// create buffer from array
const arr = [0x48, 0x69, 0x21];
const bufFromArr = Buffer.from(arr);
console.log("Buffer from array:", bufFromArr);
console.log("toString():", bufFromArr.toString());
console.log("toString('hex'):", bufFromArr.toString("hex"));
console.log("toString('utf-8'):", bufFromArr.toString("utf-8"));

// create buffer from string
const str = "Hello";
const bufFromStr = Buffer.from(str, "utf-8");
console.log("Buffer from string:", bufFromStr);
console.log("toString():", bufFromStr.toString());
console.log("toString('hex'):", bufFromStr.toString("hex"));
console.log("toString('base64'):", bufFromStr.toString("base64"));
console.log("toString('utf-8'):", bufFromStr.toString("utf-8"));
```

### Allocating huge buffers

```js
const { Buffer, constants } = require("buffer");

console.log("MAX_LENGTH:", constants.MAX_LENGTH);
console.log("MAX_STRING_LENGTH:", constants.MAX_STRING_LENGTH);

const b = Buffer.alloc(1e9); // 1 GB
console.log("Buffer of 1 GB allocated");

setInterval(() => {
  // Slow
  //   for (let i = 0; i < b.length; i++) {
  //     b[i] = 0x22;
  //   }

  // Faster
  b.fill(0x22);
  console.log("Buffer initialized");
}, 5000);
```
