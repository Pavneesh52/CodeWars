# Two Sum - Solution

## Problem
Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.

## Solution Approaches

### Approach 1: Hash Map (Optimal - O(n) time)
```javascript
function solution() {
  // Problem: Two Sum
  // Using Hash Map for O(n) time complexity
  
  const nums = [2, 7, 11, 15];
  const target = 9;
  
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    // Check if complement exists in map
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    // Store current number and its index
    map.set(nums[i], i);
  }
  
  return []; // No solution found
}

console.log(solution()); // Output: [0, 1]
```

### Approach 2: Brute Force (O(n²) time)
```javascript
function solution() {
  // Problem: Two Sum
  // Brute Force approach - check all pairs
  
  const nums = [2, 7, 11, 15];
  const target = 9;
  
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  
  return []; // No solution found
}

console.log(solution()); // Output: [0, 1]
```

### Approach 3: Two Pointers (O(n log n) time - requires sorted array)
```javascript
function solution() {
  // Problem: Two Sum
  // Two Pointers approach (requires tracking original indices)
  
  const nums = [2, 7, 11, 15];
  const target = 9;
  
  // Create array with original indices
  const indexed = nums.map((num, index) => [num, index]);
  
  // Sort by value
  indexed.sort((a, b) => a[0] - b[0]);
  
  let left = 0;
  let right = indexed.length - 1;
  
  while (left < right) {
    const sum = indexed[left][0] + indexed[right][0];
    
    if (sum === target) {
      return [indexed[left][1], indexed[right][1]];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  
  return []; // No solution found
}

console.log(solution()); // Output: [0, 1]
```

## Comparison

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| Hash Map | O(n) | O(n) | **Best** - Optimal solution |
| Brute Force | O(n²) | O(1) | Simple but slow |
| Two Pointers | O(n log n) | O(n) | Good if array is sorted |

## Recommended Solution (Use This!)

```javascript
function solution() {
  // Problem: Two Sum
  // Optimal solution using Hash Map
  // Time: O(n), Space: O(n)
  
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

// Test cases
console.log(solution()); // [0, 1] - nums[0] + nums[1] = 2 + 7 = 9
```

## How It Works

1. **Create a Map** to store numbers we've seen and their indices
2. **Loop through array** with index `i`
3. **Calculate complement** = target - current number
4. **Check if complement exists** in the map
   - If YES: Return the indices [complement's index, current index]
   - If NO: Add current number to map and continue
5. **Return empty array** if no solution found

## Example Walkthrough

```
nums = [2, 7, 11, 15], target = 9

i=0: num=2, complement=7, map={}, add 2 → map={2:0}
i=1: num=7, complement=2, map has 2! → return [0, 1] ✓

Result: [0, 1]
Verification: nums[0] + nums[1] = 2 + 7 = 9 ✓
```

## Complexity Analysis

### Time Complexity: O(n)
- Single pass through the array
- Hash Map operations (get, set) are O(1)

### Space Complexity: O(n)
- Hash Map stores up to n elements

## Edge Cases

```javascript
// Edge case 1: Minimum array
[3, 3], target = 6 → [0, 1]

// Edge case 2: Negative numbers
[-1, -2, -3, 5, 6], target = 1 → [2, 4] (-3 + 5 = 1)

// Edge case 3: Large numbers
[1000000, 2000000], target = 3000000 → [0, 1]
```

---

**Use the Hash Map approach for interviews and production code!** 🚀
