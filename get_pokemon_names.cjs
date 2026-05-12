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
  const ids = [13, 14, 15, 23, 24, 27, 28, 37, 38, 52, 53, 56, 57, 58, 59, 165, 166, 167, 168, 179, 180, 181, 203, 207, 216, 217, 223, 224, 225, 226, 227, 231, 232];
  for(let id of ids) {
    const data = await get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log(`${id}: ${data.name}`);
  }
}
main();
