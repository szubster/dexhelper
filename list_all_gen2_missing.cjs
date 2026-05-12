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

  for(let i = 1; i <= 251; i++) {
    const encs = await get(`https://pokeapi.co/api/v2/pokemon/${i}/encounters`);
    const inGold = encs.some(e => e.version_details.some(v => v.version.name === 'gold'));
    const inSilver = encs.some(e => e.version_details.some(v => v.version.name === 'silver'));
    const inCrystal = encs.some(e => e.version_details.some(v => v.version.name === 'crystal'));

    // We only care if it's found in AT LEAST ONE of the Gen 2 games (meaning it exists in the generation's wild encounters at all)
    // If it's missing in Gold but present in Silver/Crystal, it's missing from Gold.
    if (!inGold && (inSilver || inCrystal)) missingGold.push(i);
    if (!inSilver && (inGold || inCrystal)) missingSilver.push(i);
    if (!inCrystal && (inGold || inSilver)) missingCrystal.push(i);
  }

  console.log("Missing in Gold:", missingGold);
  console.log("Missing in Silver:", missingSilver);
  console.log("Missing in Crystal:", missingCrystal);
}
main();
