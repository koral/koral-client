import path from "path";

import fsmonitor from "fsmonitor";
import _ from "lodash";

import { send } from "./send";

export default function watch() {
  fsmonitor.watch(process.env.WORK_DIRECTORY, null, (change) => {
    if (change.addedFiles.length) {
      let toSend = _.filter(change.addedFiles, file => {
        return path.extname(file) === ".png";
      });

      _.each(toSend, send);
    }
  });
}
