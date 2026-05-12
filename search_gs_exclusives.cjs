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
  const encs = await get('https://pokeapi.co/api/v2/pokemon/10/encounters');
  console.log("Caterpie:", encs.flatMap(e => e.version_details).map(v => v.version.name).filter(n => n === 'gold' || n === 'silver'));

  const weedle = await get('https://pokeapi.co/api/v2/pokemon/13/encounters');
  console.log("Weedle:", weedle.flatMap(e => e.version_details).map(v => v.version.name).filter(n => n === 'gold' || n === 'silver'));
}
main();
