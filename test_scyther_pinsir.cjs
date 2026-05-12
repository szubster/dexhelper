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
  const scyther = await get('https://pokeapi.co/api/v2/pokemon/123/encounters');
  const pinsir = await get('https://pokeapi.co/api/v2/pokemon/127/encounters');

  console.log("Scyther:", scyther.flatMap(e => e.version_details).map(v => v.version.name).filter(n => n==='red'||n==='blue'));
  console.log("Pinsir:", pinsir.flatMap(e => e.version_details).map(v => v.version.name).filter(n => n==='red'||n==='blue'));
}
main();
