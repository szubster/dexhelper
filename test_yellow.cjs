const https = require('https');

https.get('https://pokeapi.co/api/v2/pokemon/52/encounters', (resp) => {
  let data = '';
  resp.on('data', (chunk) => { data += chunk; });
  resp.on('end', () => {
    const encs = JSON.parse(data);
    const yellow = encs.flatMap(e => e.version_details).filter(v => v.version.name === 'yellow');
    console.log("Meowth in Yellow:", yellow.length > 0 ? "Yes" : "No");
  });
});
