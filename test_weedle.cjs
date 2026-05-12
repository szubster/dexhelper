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
  const weedle = await get('https://pokeapi.co/api/v2/pokemon/13/encounters');
  const caterpie = await get('https://pokeapi.co/api/v2/pokemon/10/encounters');

  console.log("Weedle:", weedle.flatMap(e => e.version_details).map(v => v.version.name).filter(n => ['gold', 'silver', 'crystal'].includes(n)));
  console.log("Caterpie:", caterpie.flatMap(e => e.version_details).map(v => v.version.name).filter(n => ['gold', 'silver', 'crystal'].includes(n)));
}
main();
