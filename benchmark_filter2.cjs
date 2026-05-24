const { performance } = require('perf_hooks');

const ownedInstances = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  otName: 'Trainer',
  friendship: i,
  level: i % 10
}));
const displayVersion = 'yellow';
const closestOwnedParentId = 25;
const saveData = { trainerName: 'Trainer' };
const tr = 1;
const min_h = true;

function oldMethod() {
  const evolvableInstances = ownedInstances.filter(
    (inst) => !(displayVersion === 'yellow' && closestOwnedParentId === 25 && inst.otName === saveData.trainerName),
  );

  if (evolvableInstances.length === 0) return;

  let bestInstance = evolvableInstances[0];
  if (!bestInstance) return;
  if (tr === 1 && min_h) {
    bestInstance = evolvableInstances.reduce((prev, current) =>
      (prev.friendship ?? 0) > (current.friendship ?? 0) ? prev : current,
    );
  } else {
    bestInstance = evolvableInstances.reduce((prev, current) => (prev.level > current.level ? prev : current));
  }
}

function newMethod() {
  let bestInstance = null;
  const isLevelUp = tr === 1 && min_h;

  for (let i = 0; i < ownedInstances.length; i++) {
    const inst = ownedInstances[i];
    if (displayVersion === 'yellow' && closestOwnedParentId === 25 && inst.otName === saveData.trainerName) continue;

    if (!bestInstance) {
      bestInstance = inst;
      continue;
    }

    if (isLevelUp) {
      if ((inst.friendship ?? 0) > (bestInstance.friendship ?? 0)) {
        bestInstance = inst;
      }
    } else {
      if (inst.level > bestInstance.level) {
        bestInstance = inst;
      }
    }
  }
}

let start = performance.now();
for (let i = 0; i < 100000; i++) {
  oldMethod();
}
console.log('Old:', performance.now() - start);

start = performance.now();
for (let i = 0; i < 100000; i++) {
  newMethod();
}
console.log('New:', performance.now() - start);
