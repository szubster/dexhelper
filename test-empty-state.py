import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Navigate to a dashboard which has an empty state if no save is loaded
        await page.goto("http://localhost:3000/dexhelper/dashboard")
        await page.wait_for_timeout(2000)

        # Take a screenshot
        await page.screenshot(path="empty-state-redesign.png", full_page=True)
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
