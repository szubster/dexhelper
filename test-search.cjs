const https = require('https');
https.get('https://vitest.dev/guide/browser.html', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => console.log(data.slice(0, 1000)));
});
