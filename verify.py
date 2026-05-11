from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:3000/dexhelper/")
    page.wait_for_timeout(2000)

    # Click on the first pokemon in the grid
    page.click("button[data-testid='pokedex-card']")
    page.wait_for_timeout(1000)

    # Take screenshot of the Details view (contains TacticalPanel)
    page.screenshot(path="/home/jules/verification/screenshots/verification.png")
    page.wait_for_timeout(1000)

    # Click an HP segment in the Catch Probability section
    # Based on the text "Set HP to 50%"
    page.get_by_label("Set HP to 50%").click()
    page.wait_for_timeout(1000)

    # Take another screenshot
    page.screenshot(path="/home/jules/verification/screenshots/verification-hp.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos",
            viewport={'width': 1280, 'height': 800}
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
