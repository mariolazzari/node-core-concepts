const fs = require("fs/promises");

(async () => {
  const fileHandler = await fs.open("./command.txt", "r");
  const watcher = fs.watch("./command.txt");

  for await (const event of watcher) {
    if (event.eventType === "change") {
      console.log("command.txt changed");

      const stat = await fileHandler.stat();
      const { size } = stat;
      const buf = Buffer.alloc(size);
      const length = buf.length;
      const offset = 0;
      const pos = 0;

      console.log(stat);
      const content = await fileHandler.read(buf, offset, length, pos);
      console.log(content);
    }
  }
})();
