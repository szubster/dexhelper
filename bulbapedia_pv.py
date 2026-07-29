import urllib.request
url = 'https://raw.githubusercontent.com/pret/pokeemerald/master/include/pokemon.h'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        content = response.read().decode('utf-8')
        for line in content.split('\n'):
            if 'GAEM' in line or 'GAME' in line:
                print(line)
except Exception as e:
    print(e)
