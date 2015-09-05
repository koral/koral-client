// Takes care of initialization tasks such as ensuring that the work directory
// exists.

import fs from "fs";
import invariant from "invariant";

import watch from "./watch";

export default function () {
  ensureWorkDirectoryPresence();
  watch();
}

function ensureWorkDirectoryPresence() {
  var workDirectory = process.env.WORK_DIRECTORY;

  invariant(
    typeof workDirectory === "string",
    `Location of work directory not given in .env (found '${workDirectory}')`
  );

  try {
    let stats = fs.statSync(workDirectory);

    invariant(
      stats.isDirectory(),
      `'${workDirectory}' found, but it is not a directory.`
    );
  } catch (e) {
    console.log(`'${workDirectory}' does not exist. Creating it now.`);

    fs.mkdirSync(workDirectory);
  }
}
