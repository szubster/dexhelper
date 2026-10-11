import { execSync } from "node:child_process";

const commitSha = process.env.COMMIT_SHA;
const currentRunId = process.env.CURRENT_RUN_ID;
const repo = process.env.GITHUB_REPOSITORY;

if (!commitSha || !currentRunId || !repo) {
  console.error("Missing required environment variables.");
  process.exit(1);
}

console.log("Waiting for all other checks/actions to complete successfully...");

while (true) {
  let checkRunsJson = "";
  try {
    checkRunsJson = execSync(
      `gh api "repos/${repo}/commits/${commitSha}/check-runs" --paginate`,
      { encoding: "utf-8" }
    );
  } catch (error) {
    console.error("Error fetching check runs via gh api:", error);
    process.exit(1);
  }

  let data;
  try {
    data = JSON.parse(checkRunsJson);
  } catch (error) {
    console.error("Failed to parse check runs JSON:", error);
    process.exit(1);
  }

  const runs = data.check_runs || [];
  const pending = runs.filter(
    (r) => String(r.id) !== currentRunId && r.status !== "completed"
  );
  const failed = runs.filter(
    (r) =>
      String(r.id) !== currentRunId &&
      r.status === "completed" &&
      !["success", "skipped", "neutral"].includes(r.conclusion)
  );

  if (failed.length > 0) {
    console.error(`One or more checks failed (${failed.length}). Aborting auto-merge.`);
    process.exit(1);
  }

  if (pending.length === 0) {
    console.log("All other checks have completed successfully.");
    break;
  }

  console.log(`Waiting for ${pending.length} check(s) to complete...`);
  execSync("sleep 15");
}
