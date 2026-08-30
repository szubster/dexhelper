import fs from 'fs';
import { parseGen2 } from './src/engine/saveParser/parsers/gen2';

try {
  const buf = fs.readFileSync('extracted_save/Egg Shiny Living Dex.sav');
  const arr = new Uint8Array(buf);
  const data = parseGen2(new DataView(arr.buffer), true);
  const partyEggs = data.partyDetails?.filter(p => p.eggSteps !== undefined);
  const pcEggs = data.pcDetails?.filter(p => p.eggSteps !== undefined);
  console.log('daycareHasEgg:', data.daycareHasEgg, 'party eggs:', partyEggs?.length, 'pc eggs:', pcEggs?.length);
  if (pcEggs?.length > 0) {
    console.log('first pc egg steps:', pcEggs[0].eggSteps);
  }
} catch(e) {
  console.log(e);
}
