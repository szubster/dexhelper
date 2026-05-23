const https = require('https');

https.get('https://bulbapedia.bulbagarden.net/w/api.php?action=query&prop=revisions&titles=Pok%C3%A9mon_breeding&rvprop=content&rvslots=main&format=json', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const json = JSON.parse(data);
    const pages = json.query.pages;
    const pageId = Object.keys(pages)[0];
    const content = pages[pageId].revisions[0].slots.main['*'];
    const snippet = content.match(/.{0,200}1\/64.{0,200}/g);
    console.log(snippet);
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
