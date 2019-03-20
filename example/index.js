const LazyVinLib = require('../dist/lazy-vin-lib.umd');
const myLazyVin = new LazyVinLib()

const iterations = 50;
for (let i = 0; i < iterations; i++) {
  const vin = myLazyVin.getRandomCleanVin();
  const test = myLazyVin.fixCheckDigit(vin);
  console.log({vin, test});
}
