import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Problem from './models/Problem.js';

dotenv.config();

// --- Helper Functions ---
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randArr = (size, min = -100, max = 100) => Array.from({ length: size }, () => randInt(min, max));
const randSortedArr = (size, min, max) => randArr(size, min, max).sort((a, b) => a - b);

// --- Solvers ---
const solvers = {
    "Find the Largest Element in an Array": (input) => {
        const lines = input.split('\n');
        const arr = lines[1].trim().split(/\s+/).map(Number);
        return Math.max(...arr).toString();
    },
    "Find the Smallest Element in an Array": (input) => {
        const lines = input.split('\n');
        const arr = lines[1].trim().split(/\s+/).map(Number);
        return Math.min(...arr).toString();
    },
    "Find the Second Largest Element": (input) => {
        const lines = input.split('\n');
        const arr = lines[1].trim().split(/\s+/).map(Number);
        const unique = [...new Set(arr)].sort((a, b) => b - a);
        return (unique.length > 1 ? unique[1] : -1).toString();
    },
    "Check if Array is Sorted": (input) => {
        const lines = input.split('\n');
        const arr = lines[1].trim().split(/\s+/).map(Number);
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) return "false";
        }
        return "true";
    },
    "Reverse an Array": (input) => {
        const lines = input.split('\n');
        const arr = lines[1].trim().split(/\s+/).map(Number);
        return arr.reverse().join(' ');
    },
    "Find Missing Number (0 to N)": (input) => {
        const lines = input.split('\n');
        const n = parseInt(lines[0]);
        const arr = lines[1].trim().split(/\s+/).map(Number);
        const expectedSum = (n * (n + 1)) / 2;
        const actualSum = arr.reduce((a, b) => a + b, 0);
        return (expectedSum - actualSum).toString();
    },
    "Two Sum – Check Pair Exists": (input) => {
        const lines = input.split('\n');
        const [n, target] = lines[0].trim().split(/\s+/).map(Number);
        const arr = lines[1].trim().split(/\s+/).map(Number);
        const seen = new Set();
        for (const num of arr) {
            if (seen.has(target - num)) return "YES";
            seen.add(num);
        }
        return "NO";
    },
    "Sort Array of 0s, 1s and 2s": (input) => {
        const lines = input.split('\n');
        const arr = lines[1].trim().split(/\s+/).map(Number);
        return arr.sort((a, b) => a - b).join(' ');
    },
    "Move All Zeroes to End": (input) => {
        const lines = input.split('\n');
        const arr = lines[1].trim().split(/\s+/).map(Number);
        const nonZero = arr.filter(x => x !== 0);
        const zeros = arr.filter(x => x === 0);
        return [...nonZero, ...zeros].join(' ');
    },
    "Move Zeroes to End": (input) => {
        const lines = input.split('\n');
        const arr = lines[1].trim().split(/\s+/).map(Number);
        const nonZero = arr.filter(x => x !== 0);
        const zeros = arr.filter(x => x === 0);
        return [...nonZero, ...zeros].join(' ');
    },
    "Find All Duplicates": (input) => {
        const lines = input.split('\n');
        const arr = lines[1].trim().split(/\s+/).map(Number);
        const counts = {};
        arr.forEach(x => counts[x] = (counts[x] || 0) + 1);
        const dups = Object.keys(counts).filter(k => counts[k] > 1).map(Number).sort((a, b) => a - b);
        return dups.length ? dups.join(' ') : "-1";
    },
    "Check Palindrome Array": (input) => {
        const lines = input.split('\n');
        const arr = lines[1].trim().split(/\s+/).map(Number);
        const isPal = arr.join(' ') === [...arr].reverse().join(' ');
        return isPal ? "true" : "false";
    },
    "Find the Majority Element": (input) => {
        const lines = input.split('\n');
        const arr = lines[1].trim().split(/\s+/).map(Number);
        const n = arr.length;
        const counts = {};
        for (const x of arr) counts[x] = (counts[x] || 0) + 1;
        for (const x in counts) if (counts[x] > n / 2) return x;
        return "-1";
    },
    "Left Rotate Array by One": (input) => {
        const lines = input.split('\n');
        const arr = lines[1].trim().split(/\s+/).map(Number);
        if (arr.length <= 1) return arr.join(' ');
        const first = arr.shift();
        arr.push(first);
        return arr.join(' ');
    },
    "Rotate Array by K Steps": (input) => {
        const lines = input.split('\n');
        const [n, k] = lines[0].trim().split(/\s+/).map(Number);
        const arr = lines[1].trim().split(/\s+/).map(Number);
        const kMod = k % n;
        const rotated = [...arr.slice(n - kMod), ...arr.slice(0, n - kMod)];
        return rotated.join(' ');
    },
    "Rotate Array by K Positions": (input) => {
        const lines = input.split('\n');
        const [n, k] = lines[0].trim().split(/\s+/).map(Number);
        const arr = lines[1].trim().split(/\s+/).map(Number);
        const kMod = k % n;
        const rotated = [...arr.slice(n - kMod), ...arr.slice(0, n - kMod)];
        return rotated.join(' ');
    },
    "Find Intersection of Two Arrays": (input) => {
        const lines = input.split('\n');
        const arr1 = lines[1].trim().split(/\s+/).map(Number);
        const arr2 = lines[2].trim().split(/\s+/).map(Number);
        const set1 = new Set(arr1);
        const intersection = [...new Set(arr2.filter(x => set1.has(x)))].sort((a, b) => a - b);
        return intersection.length ? intersection.join(' ') : "-1";
    },
    "Check if Two Arrays Are Equal": (input) => {
        const lines = input.split('\n');
        const arr1 = lines[1].trim().split(/\s+/).map(Number).sort((a, b) => a - b);
        const arr2 = lines[2].trim().split(/\s+/).map(Number).sort((a, b) => a - b);
        return JSON.stringify(arr1) === JSON.stringify(arr2) ? "true" : "false";
    },
    "Find the Kth Largest Element": (input) => {
        const lines = input.split('\n');
        const [n, k] = lines[0].trim().split(/\s+/).map(Number);
        const arr = lines[1].trim().split(/\s+/).map(Number);
        const sorted = arr.sort((a, b) => b - a);
        return sorted[k - 1].toString();
    },
    "Find the Kth Smallest Element": (input) => {
        const lines = input.split('\n');
        const [n, k] = lines[0].trim().split(/\s+/).map(Number);
        const arr = lines[1].trim().split(/\s+/).map(Number);
        const sorted = arr.sort((a, b) => a - b);
        return sorted[k - 1].toString();
    },
    "Count Elements Greater Than X": (input) => {
        const lines = input.split('\n');
        const [n, x] = lines[0].trim().split(/\s+/).map(Number);
        const arr = lines[1].trim().split(/\s+/).map(Number);
        return arr.filter(val => val > x).length.toString();
    },
    "Remove Duplicates from Sorted Array": (input) => {
        const lines = input.split('\n');
        const arr = lines[1].trim().split(/\s+/).map(Number);
        const unique = [...new Set(arr)];
        return unique.join(' ');
    },
    "Find All Subarrays with Sum K": (input) => {
        const lines = input.split('\n');
        const [n, k] = lines[0].trim().split(/\s+/).map(Number);
        const arr = lines[1].trim().split(/\s+/).map(Number);
        let count = 0;
        for (let i = 0; i < n; i++) {
            let sum = 0;
            for (let j = i; j < n; j++) {
                sum += arr[j];
                if (sum === k) count++;
            }
        }
        return count.toString();
    },
    "Find Number of Pairs with Difference K": (input) => {
        const lines = input.split('\n');
        const [n, k] = lines[0].trim().split(/\s+/).map(Number);
        const arr = lines[1].trim().split(/\s+/).map(Number);
        let count = 0;
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                if (Math.abs(arr[i] - arr[j]) === k) count++;
            }
        }
        return count.toString();
    },
    "Find Longest Increasing Subarray": (input) => {
        const lines = input.split('\n');
        const arr = lines[1].trim().split(/\s+/).map(Number);
        let maxLen = 1, len = 1;
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > arr[i - 1]) len++;
            else {
                maxLen = Math.max(maxLen, len);
                len = 1;
            }
        }
        maxLen = Math.max(maxLen, len);
        return maxLen.toString();
    },
    "Find Longest Decreasing Subarray": (input) => {
        const lines = input.split('\n');
        const arr = lines[1].trim().split(/\s+/).map(Number);
        let maxLen = 1, len = 1;
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < arr[i - 1]) len++;
            else {
                maxLen = Math.max(maxLen, len);
                len = 1;
            }
        }
        maxLen = Math.max(maxLen, len);
        return maxLen.toString();
    },
    "Find Prefix Sum Array": (input) => {
        const lines = input.split('\n');
        const arr = lines[1].trim().split(/\s+/).map(Number);
        const prefix = [];
        let sum = 0;
        for (const x of arr) {
            sum += x;
            prefix.push(sum);
        }
        return prefix.join(' ');
    },
    "Find Suffix Sum Array": (input) => {
        const lines = input.split('\n');
        const arr = lines[1].trim().split(/\s+/).map(Number);
        const suffix = new Array(arr.length);
        let sum = 0;
        for (let i = arr.length - 1; i >= 0; i--) {
            sum += arr[i];
            suffix[i] = sum;
        }
        return suffix.join(' ');
    },
    "Find Next Greater Element": (input) => {
        const lines = input.split('\n');
        const arr = lines[1].trim().split(/\s+/).map(Number);
        const res = new Array(arr.length).fill(-1);
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[j] > arr[i]) {
                    res[i] = arr[j];
                    break;
                }
            }
        }
        return res.join(' ');
    },
    "Find Next Smaller Element": (input) => {
        const lines = input.split('\n');
        const arr = lines[1].trim().split(/\s+/).map(Number);
        const res = new Array(arr.length).fill(-1);
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[i]) {
                    res[i] = arr[j];
                    break;
                }
            }
        }
        return res.join(' ');
    },
    "Find Elements Appearing Exactly Once": (input) => {
        const lines = input.split('\n');
        const arr = lines[1].trim().split(/\s+/).map(Number);
        const counts = {};
        for (const x of arr) counts[x] = (counts[x] || 0) + 1;
        const res = Object.keys(counts).filter(k => counts[k] === 1).map(Number).sort((a, b) => a - b);
        return res.length ? res.join(' ') : "-1";
    },
    "Find First Repeating Element": (input) => {
        const lines = input.split('\n');
        const arr = lines[1].trim().split(/\s+/).map(Number);
        const counts = {};
        for (const x of arr) counts[x] = (counts[x] || 0) + 1;
        for (const x of arr) if (counts[x] > 1) return x.toString();
        return "-1";
    },
    "Find Last Occurrence of X": (input) => {
        const lines = input.split('\n');
        const [n, x] = lines[0].trim().split(/\s+/).map(Number);
        const arr = lines[1].trim().split(/\s+/).map(Number);
        return arr.lastIndexOf(x).toString();
    },
    "Find the Missing Number from 1 to N": (input) => {
        const lines = input.split('\n');
        const n = parseInt(lines[0]);
        const arr = lines[1].trim().split(/\s+/).map(Number);
        const maxVal = n + 1;
        const expectedSum = (maxVal * (maxVal + 1)) / 2;
        const actualSum = arr.reduce((a, b) => a + b, 0);
        return (expectedSum - actualSum).toString();
    }
};

// --- Input Generators ---
const generators = {
    "default": () => {
        const n = randInt(5, 20);
        const arr = randArr(n);
        return `${n}\n${arr.join(' ')}`;
    },
    "Two Sum – Check Pair Exists": () => {
        const n = randInt(5, 20);
        const arr = randArr(n);
        const target = Math.random() > 0.5 ? (arr[0] + arr[1]) : 9999;
        return `${n} ${target}\n${arr.join(' ')}`;
    },
    "Find Missing Number (0 to N)": () => {
        const n = randInt(5, 20);
        const arr = Array.from({ length: n + 1 }, (_, i) => i);
        const missing = randInt(0, n);
        arr.splice(missing, 1);
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return `${n}\n${arr.join(' ')}`;
    },
    "Rotate Array by K Steps": () => {
        const n = randInt(5, 20);
        const k = randInt(1, n);
        const arr = randArr(n);
        return `${n} ${k}\n${arr.join(' ')}`;
    },
    "Rotate Array by K Positions": () => {
        const n = randInt(5, 20);
        const k = randInt(1, n);
        const arr = randArr(n);
        return `${n} ${k}\n${arr.join(' ')}`;
    },
    "Find Intersection of Two Arrays": () => {
        const n = randInt(5, 15);
        const m = randInt(5, 15);
        const arr1 = randArr(n, 0, 20);
        const arr2 = randArr(m, 0, 20);
        return `${n} ${m}\n${arr1.join(' ')}\n${arr2.join(' ')}`;
    },
    "Check if Two Arrays Are Equal": () => {
        const n = randInt(5, 15);
        const arr1 = randArr(n);
        const arr2 = Math.random() > 0.5 ? [...arr1] : randArr(n);
        if (Math.random() > 0.5) arr2.sort(() => Math.random() - 0.5);
        return `${n}\n${arr1.join(' ')}\n${arr2.join(' ')}`;
    },
    "Find the Kth Largest Element": () => {
        const n = randInt(5, 20);
        const k = randInt(1, n);
        const arr = randArr(n);
        return `${n} ${k}\n${arr.join(' ')}`;
    },
    "Find the Kth Smallest Element": () => {
        const n = randInt(5, 20);
        const k = randInt(1, n);
        const arr = randArr(n);
        return `${n} ${k}\n${arr.join(' ')}`;
    },
    "Count Elements Greater Than X": () => {
        const n = randInt(5, 20);
        const x = randInt(-50, 50);
        const arr = randArr(n);
        return `${n} ${x}\n${arr.join(' ')}`;
    },
    "Find All Subarrays with Sum K": () => {
        const n = randInt(5, 15);
        const k = randInt(-20, 20);
        const arr = randArr(n, -10, 10);
        return `${n} ${k}\n${arr.join(' ')}`;
    },
    "Find Number of Pairs with Difference K": () => {
        const n = randInt(5, 15);
        const k = randInt(1, 20);
        const arr = randArr(n);
        return `${n} ${k}\n${arr.join(' ')}`;
    },
    "Find Last Occurrence of X": () => {
        const n = randInt(5, 20);
        const arr = randArr(n);
        const x = Math.random() > 0.3 ? arr[randInt(0, n - 1)] : 999;
        return `${n} ${x}\n${arr.join(' ')}`;
    },
    "Find the Missing Number from 1 to N": () => {
        const n = randInt(5, 20);
        const maxVal = n + 1;
        const arr = Array.from({ length: maxVal }, (_, i) => i + 1);
        const missing = randInt(0, n);
        arr.splice(missing, 1);
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return `${n}\n${arr.join(' ')}`;
    }
};

const generate = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    const problems = await Problem.find({});

    for (const problem of problems) {
        const solver = solvers[problem.title];
        const generator = generators[problem.title] || generators["default"];

        if (solver) {
            console.log(`Generating for: ${problem.title}`);
            const newCases = [];
            for (let i = 0; i < 10; i++) {
                try {
                    const input = generator();
                    const output = solver(input);
                    newCases.push({ input, output });
                } catch (e) {
                    console.error(`   Error generating case for ${problem.title}: ${e.message}`);
                }
            }

            // Deduplicate: Filter out cases that already exist
            const existingInputs = new Set(problem.testCases.map(tc => tc.input));
            const uniqueNewCases = newCases.filter(tc => !existingInputs.has(tc.input));

            if (uniqueNewCases.length > 0) {
                problem.testCases = [...problem.testCases, ...uniqueNewCases];
                await problem.save();
                console.log(`   ✅ Added ${uniqueNewCases.length} cases.`);
            } else {
                console.log(`   ℹ️ No new unique cases generated.`);
            }
        } else {
            console.log(`   ⚠️ No solver for: ${problem.title}`);
        }
    }

    await mongoose.disconnect();
};

generate();
