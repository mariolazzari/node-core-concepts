const fs = require("fs/promises");

(async () => {
  const fileHandler = await fs.open("./command.txt", "r");

  // on file change event handler
  fileHandler.on("change", async () => {
    const stat = await fileHandler.stat();
    // get file size
    const { size } = stat;
    // allocate a buffer with same size
    const buf = Buffer.alloc(size);
    // byte to read
    const length = buf.length;
    // where to start filling buffer
    const offset = 0;
    // file position
    const pos = 0;

    // read full content
    const content = await fileHandler.read(buf, offset, length, pos);
    console.log(content);
  });

  const watcher = fs.watch("./command.txt");

  for await (const event of watcher) {
    if (event.eventType === "change") {
      // raise event
      fileHandler.emit("change");
    }
  }
})();
