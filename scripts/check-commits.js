const fs = require("fs");
const execSync = require("child_process").execSync;

const pathToLint = "packages/ui/";
/**
 * Runs on commit-msg hook via Husky.
 * Verifies if the commit files include the listed path (currently packages/ui/) and exits with code 1 if it does.
 */
(() => {
  const [msgFilePath] = process.env.HUSKY_GIT_PARAMS
    ? process.env.HUSKY_GIT_PARAMS.split(" ")
    : [];
  const currentMessage = fs.readFileSync(msgFilePath, "utf8");
  // If the commit is being ammended, there is a list of paths included in the commit message
  const commitMessageContainsLintPath = new RegExp(pathToLint, "g").test(
    currentMessage
  );
  if (commitMessageContainsLintPath) {
    process.exit(1);
  } else {
    // if this is a new commit, check the staged files
    const stdout = execSync("git diff --name-only --cached");
    const stagedFiles = stdout.toString().trim().split(/\r?\n/);
    const stagedFilesContainLintPath = stagedFiles.some((file) =>
      file.startsWith(pathToLint)
    );
    if (stagedFilesContainLintPath) {
      process.exit(1);
    }
  }
  process.exit(0);
})();
