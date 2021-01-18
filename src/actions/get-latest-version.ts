import { readFileSync } from "fs";
import { join } from "path";
import { getLatestTag } from "./get-latest-tag";

export function getVersion(version: string): number[] {
  const versionElements = version.split(".");
  let major = parseInt(versionElements[0], 10) || 0;
  let minor = parseInt(versionElements[1], 10) || 0;
  let patch = parseInt(versionElements[2], 10) || 0;

  return [major, minor, patch];
}

/**
 * Will compare 2 versions and will return the highest of the 2
 * @param versionA Version A to be compared
 * @param versionB Version B to be compared
 */
export function getHighestVersion(
  versionA: string,
  versionB: string
): number[] {
  const parsedA = getVersion(versionA);
  const parsedB = getVersion(versionB);

  for (let i = 0; i < parsedA.length; i++) {
    if (parsedA[i] > parsedB[i]) {
      return parsedA;
    } else if (parsedB[i] > parsedA[i]) {
      return parsedB;
    }
  }
  return parsedA;
}

/**
 * Returns the latest version based on a node configuration
 */
export function getLatestVersion(): number[] {
  const latestTag = getLatestTag();
  const cwd = process.cwd();
  try {
    const pkg = JSON.parse(
      readFileSync(join(cwd, "package.json"), { encoding: "utf-8" })
    );
    console.log(
      `Latest Tag: ${latestTag} package.json version: ${pkg.version}`
    );
    const highest = getHighestVersion(latestTag, pkg.version);
    console.log(`Highest version: ${highest.join(".")}`);
    return highest;
  } catch (e) {
    return getVersion(latestTag);
  }
}
