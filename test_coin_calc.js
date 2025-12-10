import { calculateDailyPvpCost } from './src/utils/calculateTime.js';

console.log('Testing Tactical Coin Calculation...');

const tests = [
    { refreshes: 1, expected: 45 },
    { refreshes: 2, expected: 100 },
    { refreshes: 3, expected: 155 },
    { refreshes: 4, expected: 210 },
];

let failed = false;
tests.forEach(t => {
    const result = calculateDailyPvpCost(t.refreshes);
    if (result !== t.expected) {
        console.error(`FAIL: Refreshes ${t.refreshes} - Expected ${t.expected}, Got ${result}`);
        failed = true;
    } else {
        console.log(`PASS: Refreshes ${t.refreshes} = ${result}`);
    }
});

if (failed) {
    console.error('Some tests failed!');
    process.exit(1);
} else {
    console.log('All tests passed!');
}
