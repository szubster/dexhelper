import urllib.request
import urllib.parse
import json

url = "https://bulbapedia.bulbagarden.net/w/api.php?action=query&list=search&srsearch=Shiny+Carrier+DVs&format=json&srlimit=50"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
response = urllib.request.urlopen(req)
data = json.loads(response.read().decode('utf-8'))
for res in data['query']['search']:
    print(f"Title: {res['title']}")
    print(f"Snippet: {res['snippet']}")
    print("-" * 50)
