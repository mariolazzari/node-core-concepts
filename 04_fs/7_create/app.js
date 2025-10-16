const fs = require("fs/promises");

(async () => {
  const createFile = async path => {
    try {
      const existingFileHandler = await fs.open(path, "r");
      existingFileHandler.close();
      return console.log(`File ${path} already exists`);
    } catch (_ex) {
      const newFileHandler = await fs.open(path, "w");
      console.log("New file created");
      newFileHandler.close();
    } finally {
    }
  };

  const CREATE_FILE = "create a file";
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
    await fileHandler.read(buf, offset, length, pos);
    const content = buf.toString("utf-8");

    // create file
    if (content.includes(CREATE_FILE)) {
      const filePath = content.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }
  });

  const watcher = fs.watch("./command.txt");

  for await (const event of watcher) {
    if (event.eventType === "change") {
      // raise event
      fileHandler.emit("change");
    }
  }
})();
