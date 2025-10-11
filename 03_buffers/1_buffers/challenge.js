const { Buffer } = require("buffer");

// 0100 1000 0110 1001 0010 0001
const myBuf = Buffer.alloc(3); // 3 bytes = 24 bits
myBuf[0] = 0x48;
myBuf[1] = 0x69;
myBuf[2] = 0x21;

console.log("Buffer:", myBuf);
console.log("toString():", myBuf.toString());
console.log("toString('hex'):", myBuf.toString("hex"));
console.log("toString('base64'):", myBuf.toString("base64"));
