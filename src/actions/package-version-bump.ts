import { join } from "path";
import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";

const { NEXT_VERSION, CREATE_GIT_COMMIT } = process.env;

export function createPackageCommit(): void {
  const cwd = process.cwd();

  try {
    const pkg = JSON.parse(
      readFileSync(join(cwd, "package.json"), { encoding: "utf-8" })
    );
    console.log(`Updating package.json to version: ${NEXT_VERSION}`);
    pkg.version = NEXT_VERSION;
    writeFileSync(join(cwd, "package.json"), JSON.stringify(pkg, null, 4));
    if (CREATE_GIT_COMMIT) {
      console.log("Pushing new commit to master for package change");
      execSync('git config user.email "github-actions@mikeswright49.com"');
      execSync('git config user.name "mikeswright49-actions"');
      execSync(
        "git remote set-url origin https://x-access-token:${TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
      );

      execSync(
        `git commit -am "Auto update of package version to: ${NEXT_VERSION}"`
      );
      execSync(`git push`);
    }
  } catch (e) {
    console.error(e, "Error writing to package.json");
    process.exit(1);
  }
}

createPackageCommit();
