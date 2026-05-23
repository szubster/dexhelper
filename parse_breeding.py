import urllib.request
import urllib.parse
import json

url = "https://bulbapedia.bulbagarden.net/w/api.php?action=parse&page=Pok%C3%A9mon_breeding&prop=text&format=json"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
response = urllib.request.urlopen(req)
data = json.loads(response.read().decode('utf-8'))
content = data['parse']['text']['*']

import re
matches = re.finditer(r'.{0,150}Defense DV.{0,150}', content)
for m in matches:
    print(m.group(0).replace('\n', ' '))
    print('-' * 50)
