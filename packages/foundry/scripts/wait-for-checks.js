import { execSync } from "node:child_process";

const commitSha = process.env.COMMIT_SHA;
const currentRunId = process.env.CURRENT_RUN_ID;
const jobName = process.env.JOB_NAME;
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
  const isCurrentRun = (r) =>
    String(r.id) === currentRunId ||
    String(r.run_id) === currentRunId ||
    (jobName && r.name === jobName);

  const pending = runs.filter(
    (r) => !isCurrentRun(r) && r.status !== "completed"
  );
  const failed = runs.filter(
    (r) =>
      !isCurrentRun(r) &&
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
