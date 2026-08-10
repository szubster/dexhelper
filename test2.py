from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:3000/dexhelper/pokemon/1')
    page.wait_for_timeout(2000)
    page.screenshot(path='screenshot2.png')
    browser.close()
