import { execSync } from "child_process";

const VERSION_FORMAT_REGEX = /[0-9]{1,10000}\.[0-9]{1,10000}\.[0-9]{1,10000}/;
const NEW_VERSION = "0.0.0";

/**
 * Returns the latest tag version
 */
export function getLatestTag(): string {
  try {
    execSync("git fetch --tags -f");
    const latestTagHash = execSync("git rev-list --tags --max-count=1")
      .toString()
      .trim();
    const latestTag: string = execSync(`git describe --tags ${latestTagHash}`)
      .toString()
      .trim();
    if (!VERSION_FORMAT_REGEX.test(latestTag)) {
      return NEW_VERSION;
    }
    return latestTag;
  } catch (e) {
    console.log("Unable to retrieve tags");
    return "0.0.0";
  }
}
