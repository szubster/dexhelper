import urllib.request
import json
import re

url = "https://bulbapedia.bulbagarden.net/w/api.php?action=parse&page=Pok%C3%A9mon_breeding&prop=text&format=json"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    response = urllib.request.urlopen(req)
    data = json.loads(response.read().decode('utf-8'))
    content = data['parse']['text']['*']

    # Strip HTML tags
    content_no_html = re.sub('<[^<]+>', '', content)

    matches = re.finditer(r'.{0,150}Defense DV.{0,150}', content_no_html, re.IGNORECASE)
    for m in matches:
        print(m.group(0).replace('\n', ' '))
        print('-' * 50)
except Exception as e:
    print(f"Error: {e}")
