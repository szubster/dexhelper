import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = await context.new_page()

        # Hydrate app state with a save fixture using local dev server
        await page.goto("http://localhost:3000/dexhelper/")
        # Wait for the app to initialize
        await page.wait_for_selector('text=INITIALIZE.SYS', state='visible', timeout=10000)

        # Intercept the file input and upload the save
        file_input = page.locator("input[type='file']")
        await file_input.set_input_files("tests/fixtures/crystal.sav")

        # Wait for import completion / sync
        await page.wait_for_selector('text=Bulbasaur', timeout=10000)

        # Take screenshot of Pokedex grid showing the new tags
        await page.screenshot(path="/home/jules/verification/screenshots/pokedex_grid.png")

        # Type in the search input to trigger empty state (it has a generic placeholder or no placeholder, let's just click it or find the input)
        search_input = page.locator("input[type='text']").first
        await search_input.fill("MissingNo")
        await page.wait_for_selector('text=[ SYS.QUERY_FAILED ]', timeout=10000)

        # Take screenshot of the empty state
        await page.screenshot(path="/home/jules/verification/screenshots/pokedex_empty.png")

        # Clear search
        await search_input.fill("")

        # Navigate to Storage
        await page.click("text=SYS.STRG")
        await page.wait_for_selector('text=[ SYS.DIR ]', timeout=10000)

        # Take screenshot of Storage Grid
        await page.screenshot(path="/home/jules/verification/screenshots/storage_grid.png")

        await context.close()
        await browser.close()

asyncio.run(run())
