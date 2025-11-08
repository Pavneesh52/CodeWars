# How to Write Solutions in CodeWars

## ❓ Why Do We Use `nums` and `target`?

Great question! Let me explain:

### In Real Coding Challenges (LeetCode, HackerRank, etc.)

The **test system automatically provides** the input variables. You don't type them - they're passed to your function!

```javascript
// What YOU write:
function solution() {
  // nums and target are provided by the test system
  // You just use them!
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

// What the test system does:
// 1. Defines: const nums = [2, 7, 11, 15];
// 2. Defines: const target = 9;
// 3. Calls your solution()
// 4. Checks if result === [0, 1]
```

## 📝 How to Write Solutions in Our Editor

### Method 1: Using Test Cases (Recommended)

Write code that uses the variables provided:

```javascript
function solution() {
  // Problem: Two Sum
  // The test system provides: nums, target
  
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}

// For testing, add this at the bottom:
const nums = [2, 7, 11, 15];
const target = 9;
console.log(solution()); // Output: [0, 1]
```

**Steps:**
1. Write your solution function
2. Add test data at the bottom
3. Call `console.log(solution())`
4. Click **Run Code**

### Method 2: Hardcoded Test Cases (For Quick Testing)

```javascript
function solution() {
  // Test case 1
  const nums = [2, 7, 11, 15];
  const target = 9;
  
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

console.log(solution()); // [0, 1]
```

### Method 3: Multiple Test Cases

```javascript
function solution(nums, target) {
  // Now it's a proper function that takes parameters
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  
  return [];
}

// Test multiple cases
console.log(solution([2, 7, 11, 15], 9));      // [0, 1]
console.log(solution([3, 2, 4], 6));           // [1, 2]
console.log(solution([3, 3], 6));              // [0, 1]
```

## ✅ Complete Working Example

Here's what to paste into your editor:

```javascript
function solution(nums, target) {
  // Problem: Two Sum
  // Find indices of two numbers that add up to target
  
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}

// Test cases
console.log(solution([2, 7, 11, 15], 9));      // Expected: [0, 1]
console.log(solution([3, 2, 4], 6));           // Expected: [1, 2]
console.log(solution([3, 3], 6));              // Expected: [0, 1]
```

**Click Run Code** → You'll see:
```
[0,1]
[1,2]
[0,1]
```

## 🎯 Step-by-Step Guide

### Step 1: Copy the Solution Template
```javascript
function solution(nums, target) {
  // Write your code here
}
```

### Step 2: Write Your Logic
```javascript
function solution(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
```

### Step 3: Add Test Cases
```javascript
// At the bottom of your code:
console.log(solution([2, 7, 11, 15], 9));
```

### Step 4: Click "Run Code"
You'll see the output!

## 🔍 Understanding the Problem

### What the Problem Gives You

**Input:**
- `nums` - Array of integers
- `target` - Target sum

**Output:**
- Indices of two numbers that add up to target

**Example:**
```
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
Explanation: nums[0] + nums[1] = 2 + 7 = 9
```

## ❌ Common Mistakes

### ❌ Mistake 1: Not Defining Variables
```javascript
// WRONG - nums and target not defined
function solution() {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) { // ERROR: nums is undefined
    // ...
  }
}
```

### ✅ Fix: Define Variables or Pass as Parameters
```javascript
// RIGHT - Option 1: Pass as parameters
function solution(nums, target) {
  // ...
}

// RIGHT - Option 2: Define them
function solution() {
  const nums = [2, 7, 11, 15];
  const target = 9;
  // ...
}
```

### ❌ Mistake 2: Not Calling the Function
```javascript
// WRONG - Function defined but not called
function solution(nums, target) {
  return [0, 1];
}
// Nothing printed!
```

### ✅ Fix: Call the Function and Log Output
```javascript
// RIGHT
function solution(nums, target) {
  return [0, 1];
}

console.log(solution([2, 7, 11, 15], 9)); // Prints: [0, 1]
```

### ❌ Mistake 3: Forgetting console.log
```javascript
// WRONG - No output shown
function solution(nums, target) {
  return [0, 1];
}

solution([2, 7, 11, 15], 9); // Runs but doesn't show output
```

### ✅ Fix: Use console.log
```javascript
// RIGHT
function solution(nums, target) {
  return [0, 1];
}

console.log(solution([2, 7, 11, 15], 9)); // Shows: [0, 1]
```

## 📋 Template for Any Problem

```javascript
// 1. Define the function
function solution(input1, input2, ...) {
  // 2. Write your logic
  // 3. Return the result
  return result;
}

// 4. Test with examples
console.log(solution(testInput1, testInput2, ...)); // Expected: output1
console.log(solution(testInput3, testInput4, ...)); // Expected: output2
```

## 🚀 Ready to Code?

1. **Go to Problems** section
2. **Click on a problem**
3. **Copy the template** above
4. **Write your solution**
5. **Add test cases**
6. **Click "Run Code"**
7. **See the output!**

---

**Remember:** In real coding challenges, the test system provides the inputs. You just write the logic! 🎯
