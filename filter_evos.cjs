const missingGold = [13, 14, 15, 24, 37, 47, 52, 53, 82, 110, 165, 166, 172, 173, 174, 178, 210, 225, 227, 231, 232, 238, 239, 240, 247, 251];
const missingSilver = [10, 11, 12, 28, 47, 56, 57, 58, 82, 110, 167, 168, 172, 173, 174, 178, 207, 210, 216, 217, 226, 238, 239, 240, 247, 251];

// we want to list just the base form or evolutionary line IDs for what's exclusive
console.log("Missing Gold:", missingGold.filter(x => ![14,15,53,166,232,47,82,110,172,173,174,178,210,238,239,240,247,251].includes(x)));
// 47 is Parasect, 82 is Magneton, 110 is Weezing, 172 is Pichu, 173 is Cleffa, 174 is Igglybuff, 178 is Xatu, 210 is Granbull, 238 is Smoochum, 239 is Elekid, 240 is Magby, 247 is Pupitar, 251 is Celebi
