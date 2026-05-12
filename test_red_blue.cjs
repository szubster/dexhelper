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
  const missingRed = [];
  const missingBlue = [];
  for(let i = 1; i <= 151; i++) {
    const encs = await get(`https://pokeapi.co/api/v2/pokemon/${i}/encounters`);
    const inRed = encs.some(e => e.version_details.some(v => v.version.name === 'red'));
    const inBlue = encs.some(e => e.version_details.some(v => v.version.name === 'blue'));
    if (!inRed) missingRed.push(i);
    if (!inBlue) missingBlue.push(i);
  }
  console.log("Missing in Red (Blue exclusives):", missingRed);
  console.log("Missing in Blue (Red exclusives):", missingBlue);
}
main();
