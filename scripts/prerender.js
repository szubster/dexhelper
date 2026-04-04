import { chromium } from 'playwright';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const routesToPrerender = ['/', '/pokemon']; // Add more static routes if needed

async function startServer() {
  return new Promise((resolve, reject) => {
    // Determine the base path based on environment variables (same as vite.config.ts)
    // For local prerendering, we often serve at root and then adjust links, or serve at the correct base.
    // Sirv serves the folder content at root. If CF_PAGES is false, base is /dexhelper/
    const isCFPages = process.env.CF_PAGES === 'true';
    const basePath = isCFPages ? '/' : '/dexhelper/';

    const server = spawn('npx', ['vite', 'preview', '--port', '4173'], {
      stdio: 'pipe',
      shell: true
    });

    server.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Local:')) {
        resolve({ server, url: `http://localhost:4173${basePath}` });
      }
    });

    server.stderr.on('data', (data) => {
      console.error(`Server error: ${data}`);
    });

    server.on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  if (!fs.existsSync(distDir)) {
    console.error('dist directory not found. Please run "npm run build" first.');
    process.exit(1);
  }

  console.log('Starting preview server...');
  const { server, url } = await startServer();

  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });

  try {
    for (const route of routesToPrerender) {
      const page = await browser.newPage();

      // Navigate to the route
      const fullUrl = url.replace(/\/$/, '') + (route === '/' ? '/' : route);
      console.log(`Prerendering ${fullUrl}...`);

      await page.goto(fullUrl, { waitUntil: 'networkidle' });

      // Wait for any specific selector that indicates the app is fully hydrated
      // Assuming pokemonList finishes loading and the main layout is visible
      await page.waitForSelector('main', { timeout: 10000 }).catch(() => console.warn('main selector not found, proceeding anyway'));

      // Clean up any dynamic injections we don't want in the static HTML
      await page.evaluate(() => {
        // Remove Vite injected scripts if any
        document.querySelectorAll('script[type="module"]').forEach(s => s.remove());
        // Specifically we might want to keep the entry module though! Let's just grab the HTML
      });

      // Get the full HTML content
      let html = await page.content();

      // The content might have hydration mismatches if we just save it raw,
      // but for a purely static shell approach, it acts as a very fast FCP.
      // React 19 handles hydration gracefully even if HTML is slightly different.

      // Determine save path
      const savePath = route === '/'
        ? path.join(distDir, 'index.html')
        : path.join(distDir, `${route.substring(1)}.html`);

      fs.writeFileSync(savePath, html);
      console.log(`Saved ${savePath}`);
      await page.close();
    }
  } catch (err) {
    console.error('Error during prerendering:', err);
  } finally {
    console.log('Cleaning up...');
    await browser.close();
    server.kill();
    process.exit(0);
  }
}

run();