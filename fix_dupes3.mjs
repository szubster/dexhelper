import fs from 'fs';
const data = fs.readFileSync('data/db/pokemon.jsonl', 'utf-8');
const lines = data.split('\n').filter(Boolean);

const newLines = lines.map(line => {
    const obj = JSON.parse(line);

    // Dedup det array
    if (obj.det) {
        const seen = new Set();
        obj.det = obj.det.filter(d => {
            const str = JSON.stringify(d);
            if (seen.has(str)) return false;
            seen.add(str);
            return true;
        });
    }

    if (obj.eto) {
        obj.eto = obj.eto.map(etoObj => {
            if (etoObj.det) {
                const seen = new Set();
                etoObj.det = etoObj.det.filter(d => {
                    const str = JSON.stringify(d);
                    if (seen.has(str)) return false;
                    seen.add(str);
                    return true;
                });
            }
            if (etoObj.eto) {
               etoObj.eto = etoObj.eto.map(etoObj2 => {
                   if (etoObj2.det) {
                       const seen = new Set();
                       etoObj2.det = etoObj2.det.filter(d => {
                           const str = JSON.stringify(d);
                           if (seen.has(str)) return false;
                           seen.add(str);
                           return true;
                       });
                   }
                   return etoObj2;
               });
            }
            return etoObj;
        });
    }

    return JSON.stringify(obj);
});

fs.writeFileSync('data/db/pokemon.jsonl', newLines.join('\n') + '\n');
