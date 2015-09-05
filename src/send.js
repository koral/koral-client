// Temporary code to test sending files to the server

import fs from "fs";
import net from "net";
import path from "path";

const { SERVER_PORT, SERVER_ADDRESS } = process.env;

const SERVER_OPTIONS = { port: SERVER_PORT, address: SERVER_ADDRESS };

export function send(name) {
  console.log("About to send", name);

  var encodedName = new Buffer(name, "utf8");

  var size = new Buffer(2);

  size.writeUInt16BE(Buffer.byteLength(name, "utf8"), 0);

  fs.readFile(path.join(process.env.WORK_DIRECTORY, name), (err, data) => {
    if (err) throw err;

    var payload = Buffer.concat([size, encodedName, data]);

    var client = net.connect(SERVER_OPTIONS, () => {
      console.log("Connected, sending...");
      client.end(payload, "utf8");
    });
  });

}
