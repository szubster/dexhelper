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
  const vulpix = await get('https://pokeapi.co/api/v2/pokemon/37/encounters');
  const mankey = await get('https://pokeapi.co/api/v2/pokemon/56/encounters');
  const mareep = await get('https://pokeapi.co/api/v2/pokemon/179/encounters');
  const girafarig = await get('https://pokeapi.co/api/v2/pokemon/203/encounters');
  const remoraid = await get('https://pokeapi.co/api/v2/pokemon/223/encounters');

  console.log("Vulpix Crystal:", vulpix.flatMap(e => e.version_details).some(v => v.version.name === 'crystal'));
  console.log("Mankey Crystal:", mankey.flatMap(e => e.version_details).some(v => v.version.name === 'crystal'));
  console.log("Mareep Crystal:", mareep.flatMap(e => e.version_details).some(v => v.version.name === 'crystal'));
  console.log("Girafarig Crystal:", girafarig.flatMap(e => e.version_details).some(v => v.version.name === 'crystal'));
  console.log("Remoraid Crystal:", remoraid.flatMap(e => e.version_details).some(v => v.version.name === 'crystal'));
}
main();
