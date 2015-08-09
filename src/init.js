// Takes care of initialization tasks such as ensuring that the work directory
// exists.

import fs from "fs";
import invariant from "invariant";

function ensureWorkDirectoryPresence() {
  var workDirectory = process.env.WORK_DIRECTORY;

  invariant(
    typeof workDirectory === "string",
    `Location of work directory not given in .env (found '${workDirectory}')`
  );

  try {
    var stats = fs.statSync(workDirectory);

    invariant(
      stats.isDirectory(),
      `'${workDirectory}' found, but it is not a directory.`
    );
  } catch (e) {
    console.log(`'${workDirectory}' does not exist. Creating it now.`);

    fs.mkdirSync(workDirectory);
  }
}

export default function () {
  ensureWorkDirectoryPresence();
}
