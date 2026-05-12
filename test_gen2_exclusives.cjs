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
  const missingGold = [];
  const missingSilver = [];
  const missingCrystal = [];

  // Checking Gen 1 and Gen 2 mons (1 to 251)
  for(let i = 1; i <= 251; i++) {
    const encs = await get(`https://pokeapi.co/api/v2/pokemon/${i}/encounters`);
    const inGold = encs.some(e => e.version_details.some(v => v.version.name === 'gold'));
    const inSilver = encs.some(e => e.version_details.some(v => v.version.name === 'silver'));
    const inCrystal = encs.some(e => e.version_details.some(v => v.version.name === 'crystal'));

    if (!inGold && (inSilver || inCrystal)) missingGold.push(i);
    if (!inSilver && (inGold || inCrystal)) missingSilver.push(i);
    if (!inCrystal && (inGold || inSilver)) missingCrystal.push(i);
  }

  console.log("Missing in Gold (found in S/C):", missingGold);
  console.log("Missing in Silver (found in G/C):", missingSilver);
  console.log("Missing in Crystal (found in G/S):", missingCrystal);
}
main();
