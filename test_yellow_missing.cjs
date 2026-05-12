const https = require('https');

function get(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Node' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    });
  });
}

async function main() {
  const missing = [];
  for(let i = 1; i <= 151; i++) {
    const encs = await get(`https://pokeapi.co/api/v2/pokemon/${i}/encounters`);
    const inY = encs.some(e => e.version_details.some(v => v.version.name === 'yellow'));
    if (!inY) {
      missing.push(i);
    }
  }
  console.log("Missing in Yellow:", missing);
}
main();
