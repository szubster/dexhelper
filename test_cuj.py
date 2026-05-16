import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(record_video_dir="/home/jules/verification/videos")
        page = await context.new_page()

        await page.goto("http://localhost:3001/dexhelper/dag")

        # Wait for dag rendering
        await page.wait_for_selector(".tactical-flow", timeout=10000)

        # Let the React Flow graph render fully
        await page.wait_for_timeout(2000)

        # Interact with filters
        # Toggle TASK
        await page.click("text='TASK'")
        await page.wait_for_timeout(500)

        # Toggle IDEA
        await page.click("text='IDEA'")
        await page.wait_for_timeout(500)

        # Toggle READY
        await page.click("text='READY'")
        await page.wait_for_timeout(500)

        # Toggle COMPLETED
        await page.click("text='COMPLETED'")
        await page.wait_for_timeout(500)

        await page.screenshot(path="/home/jules/verification/screenshots/dag_filtered.png")

        await context.close()
        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
