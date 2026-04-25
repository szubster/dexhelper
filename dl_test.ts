import DataLoader from 'dataloader';

const dl = new DataLoader(async (keys) => {
    console.log("Batch function called with keys:", keys);
    return keys.map(k => "val_" + k);
});

async function run() {
    await Promise.all([
        dl.load(1),
        dl.load(1),
        dl.load(2),
        dl.load(1)
    ]);
}
run();
