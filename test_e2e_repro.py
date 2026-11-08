from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:3000/dexhelper/")
    page.wait_for_timeout(2000)
    print("Page title:", page.title())
    file_input = page.locator('input[type="file"]')
    print("File input count:", file_input.count())
    file_input.first.set_input_files("tests/fixtures/yellow.sav")
    page.wait_for_timeout(3000)
    cards = page.locator('[data-testid="pokedex-card"]')
    print("Cards count:", cards.count())
    query_failed = page.locator('text=SYS.QUERY_FAILED')
    print("Query failed count:", query_failed.count())
    browser.close()
