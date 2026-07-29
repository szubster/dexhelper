url = 'https://raw.githubusercontent.com/pret/pokeemerald/master/src/pokemon.c'
import urllib.request
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        content = response.read().decode('utf-8')
        for i, line in enumerate(content.split('\n')):
            if 'Substruct' in line or 'gSubstructOrder' in line or 'gSubstruct' in line or 'GAEM' in line:
                print(f"{i}: {line}")
except Exception as e:
    print(e)
