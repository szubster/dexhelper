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
  const magmar = await get('https://pokeapi.co/api/v2/pokemon/126/encounters');
  const electabuzz = await get('https://pokeapi.co/api/v2/pokemon/125/encounters');

  console.log("Magmar:", magmar.flatMap(e => e.version_details).map(v => v.version.name).filter(n => n==='red'||n==='blue'));
  console.log("Electabuzz:", electabuzz.flatMap(e => e.version_details).map(v => v.version.name).filter(n => n==='red'||n==='blue'));
}
main();
