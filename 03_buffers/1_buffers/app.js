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
