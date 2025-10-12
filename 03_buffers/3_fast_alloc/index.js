const { Buffer } = require("buffer");

// Safe: zero-filled buffer
const buf = Buffer.alloc(10000, 0);
console.log("Safe buffer example (should contain only zeros):");
for (let i = 0; i < buf.length; i++) {
  if (buf[i] > 0) {
    console.log(`buf[${i}] = ${buf[i].toString(2)}`);
  }
}

// Unsafe: may contain old memory data
const unsafeBuf = Buffer.allocUnsafe(10000);
console.log("\nUnsafe buffer example (may contain random values):");
for (let i = 0; i < 10; i++) {
  console.log(`unsafeBuf[${i}] = ${unsafeBuf[i].toString(2)}`);
}

console.log("Buffer poolsize = ", Buffer.poolSize); // 8k
console.log("Buffer poolsize shifted = ", Buffer.poolSize >>> 1); // 4k

// allocate slow: small sizes
const bufSlow = Buffer.allocUnsafeSlow(10);
console.log("bufSlow", bufSlow.toString());
