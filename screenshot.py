from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context(
        viewport={"width": 1280, "height": 720},
        record_video_dir="/home/jules/verification/videos/"
    )
    page = context.new_page()
    page.goto('http://localhost:3000/dexhelper/')
    page.wait_for_timeout(3000)

    # upload save
    page.locator('input#init-save-input').set_input_files('tests/fixtures/blue.sav')
    page.wait_for_timeout(2000)

    # resolve version conflict
    page.click('[aria-label="Select Blue version"]')
    page.wait_for_timeout(1000)

    # open settings
    page.click('[aria-label="System Settings"]')
    page.wait_for_timeout(1000)

    # save screenshot
    page.screenshot(path='/home/jules/verification/screenshots/settings_legend.png')

    context.close()
    browser.close()
