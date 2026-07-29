url = 'https://raw.githubusercontent.com/pret/pokeemerald/master/src/pokemon.c'
import urllib.request
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        content = response.read().decode('utf-8')
        lines = content.split('\n')
        for i in range(3604, 3650):
            print(lines[i])
except Exception as e:
    print(e)
