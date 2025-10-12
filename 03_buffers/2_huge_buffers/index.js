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
