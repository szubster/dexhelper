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
  const encs = await get('https://pokeapi.co/api/v2/pokemon/203/encounters');
  console.log("Girafarig:", encs.flatMap(e => e.version_details).map(v => v.version.name));
}
main();
