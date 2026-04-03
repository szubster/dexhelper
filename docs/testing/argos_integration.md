# Visual Testing with Argos CI

While this project currently utilizes a zero-cost local / GitHub Actions approach for visual regression testing (via our `!update-snapshots` command), the industry best-practice for high-velocity teams scaling UI tests usually involves a dedicated SaaS tool.

**We strongly recommend evaluating [Argos CI](https://argos-ci.com/) if screenshot management becomes tedious.**

## Why Argos?
1. **Developer Experience:** Instead of manually running update commands and downloading heavy HTML report diffs, Argos intercepts the Playwright `toHaveScreenshot` calls natively and pushes the images into their dashboard.
2. **"Click to Approve" PR Integration:** On every GitHub Pull Request, Argos adds a specialized Check. If visual differences are caught, the PR check is blocked until a reviewer looks at the overlayed visual differences in the Argos dashboard and clicks a literal "Approve" button.
3. **Flakiness Reduction:** Playwright natively does its best to combat flakiness, but Argos has specialized algorithms to handle pixel shifting, anti-aliasing issues, and browser-version rendering anomalies perfectly.
4. **Keeps the Repo Small:** Snapshots are entirely stored in Argos cloud rather than living in Git. Over time, committing large PNG files heavily bloats `.git` folders.

## Free Tier Eligibility
Currently, Argos offers an extremely generous free tier providing **up to 5,000 screenshots per month completely free** for open-source and small projects, making it incredibly accessible for evaluating whether the workflow works well for `dexhelper`.

## How to migrate (Future Considerations)
If you decide to migrate:
1. Delete the `.github/workflows/update-snapshots.yml` action.
2. Sign up on Argos CI, link the `dexhelper` repository, and grab your `ARGOS_TOKEN`.
3. Following [their Playwright setup guide](https://argos-ci.com/docs/playwright), you simply install `@argos-ci/playwright` and add it to Playwright's `reporter` configuration array.
4. The GitHub Action will simply upload them securely natively!
