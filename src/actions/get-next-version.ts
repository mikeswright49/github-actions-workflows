import { VersionChange } from "../enums/version-change";
import { getLatestVersion } from "./get-latest-version";

/**
 * Looks at the most recent commit message for the key words "MAJOR", "MINOR"
 * If Major is found will  bump major: 1.2.3 => becomes 2.0.0
 * If Minor is found will bump minor: 1.2.3 => becomes 1.3.0
 * If neither are found will bump the patch 1.2.3 => becomes 1.2.4
 * @param currentVersion The current version to work off of
 */
const {VERSION_CHANGE} = process.env

export function getNextVersion(): void {
  let nextVersion: string;
  try {
    let [major, minor, patch] = getLatestVersion();

    switch (VERSION_CHANGE) {
      case VersionChange.Major:
        major++;
        minor = 0;
        patch = 0;
        break;

      case VersionChange.Minor:
        minor++;
        patch = 0;
        break;

      case VersionChange.Patch:
        patch++;
        break;
    }
    nextVersion = `${major}.${minor}.${patch}`;
  } catch (e) {
    nextVersion = "0.0.1";
  }
  console.log(`::set-output name=next_version::${nextVersion}`);
}
