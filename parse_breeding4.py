import urllib.request
import json
import re

url = "https://bulbapedia.bulbagarden.net/w/api.php?action=parse&page=Pok%C3%A9mon_breeding&prop=text&format=json"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    response = urllib.request.urlopen(req)
    data = json.loads(response.read().decode('utf-8'))
    content = data['parse']['text']['*']

    content_no_html = re.sub('<[^<]+>', '', content)

    match = re.search(r'.{0,300}Shiny carrier.{0,300}', content_no_html, re.IGNORECASE)
    if match:
        print("Found Shiny Carrier:")
        print(match.group(0).replace('\n', ' '))
    else:
        print("No match for Shiny Carrier")
except Exception as e:
    print(f"Error: {e}")
