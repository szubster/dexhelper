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
  const growlithe = await get('https://pokeapi.co/api/v2/pokemon/58/encounters');
  const meowth = await get('https://pokeapi.co/api/v2/pokemon/52/encounters');
  const mankey = await get('https://pokeapi.co/api/v2/pokemon/56/encounters');
  const bellsprout = await get('https://pokeapi.co/api/v2/pokemon/69/encounters');
  const oddish = await get('https://pokeapi.co/api/v2/pokemon/43/encounters');
  const ekans = await get('https://pokeapi.co/api/v2/pokemon/23/encounters');
  const sandshrew = await get('https://pokeapi.co/api/v2/pokemon/27/encounters');

  console.log("Vulpix:", vulpix.flatMap(e => e.version_details).map(v => v.version.name).filter(n => n==='red'||n==='blue'));
  console.log("Growlithe:", growlithe.flatMap(e => e.version_details).map(v => v.version.name).filter(n => n==='red'||n==='blue'));
  console.log("Meowth:", meowth.flatMap(e => e.version_details).map(v => v.version.name).filter(n => n==='red'||n==='blue'));
  console.log("Mankey:", mankey.flatMap(e => e.version_details).map(v => v.version.name).filter(n => n==='red'||n==='blue'));
  console.log("Bellsprout:", bellsprout.flatMap(e => e.version_details).map(v => v.version.name).filter(n => n==='red'||n==='blue'));
  console.log("Oddish:", oddish.flatMap(e => e.version_details).map(v => v.version.name).filter(n => n==='red'||n==='blue'));
  console.log("Ekans:", ekans.flatMap(e => e.version_details).map(v => v.version.name).filter(n => n==='red'||n==='blue'));
  console.log("Sandshrew:", sandshrew.flatMap(e => e.version_details).map(v => v.version.name).filter(n => n==='red'||n==='blue'));
}
main();
