# Solution Template - Copy & Paste Ready

## 🎯 For Two Sum Problem

### ✅ COPY THIS EXACT CODE:

```javascript
function solution(nums, target) {
  // Problem: Two Sum
  // Find indices of two numbers that add up to target
  // Time: O(n), Space: O(n)
  
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

// Test Cases - These are examples from the problem
console.log(solution([2, 7, 11, 15], 9));      // Expected: [0, 1]
console.log(solution([3, 2, 4], 6));           // Expected: [1, 2]
console.log(solution([3, 3], 6));              // Expected: [0, 1]
```

## 📋 Steps to Use

### Step 1: Open Code Editor
- Go to Problems section
- Click on "Two Sum" problem
- You'll see the code editor on the right

### Step 2: Clear the Existing Code
- Select all text (Ctrl+A or Cmd+A)
- Delete it

### Step 3: Paste the Template
- Copy the code above
- Paste into the editor (Ctrl+V or Cmd+V)

### Step 4: Click "Run Code"
- Click the blue **"▶ Run Code"** button
- Wait for output

### Step 5: See the Results
You should see:
```
[0,1]
[1,2]
[0,1]
```

## 🎨 What Each Part Does

```javascript
function solution(nums, target) {
  // ↑ Function takes two parameters:
  //   - nums: array of numbers
  //   - target: the sum we're looking for
  
  const map = new Map();
  // ↑ Create a map to store numbers we've seen
  
  for (let i = 0; i < nums.length; i++) {
    // ↑ Loop through each number
    
    const complement = target - nums[i];
    // ↑ Calculate what number we need to find
    
    if (map.has(complement)) {
      // ↑ Check if we've seen that number before
      
      return [map.get(complement), i];
      // ↑ If yes, return the indices!
    }
    
    map.set(nums[i], i);
    // ↑ If no, remember this number for later
  }
  
  return [];
  // ↑ If no solution found, return empty array
}

// Test Cases
console.log(solution([2, 7, 11, 15], 9));
// ↑ Calls the function with test data
// ↑ Prints the result to console
```

## 🧪 Understanding Test Cases

Each test case has:
- **Input**: The numbers to test
- **Expected Output**: What we should get

```javascript
console.log(solution([2, 7, 11, 15], 9));
//                    ↑ nums array      ↑ target
//                    Expected: [0, 1] because nums[0] + nums[1] = 2 + 7 = 9
```

## ✅ Expected Output

When you click "Run Code", you should see:
```
[0,1]
[1,2]
[0,1]
```

Each line is the output of one test case.

## ❌ If You See an Error

### Error: "nums is not defined"
**Problem:** You removed the parameters from the function
**Solution:** Make sure your function looks like:
```javascript
function solution(nums, target) {  // ← Keep these parameters!
  // ...
}
```

### Error: "Cannot read property 'length' of undefined"
**Problem:** You're not passing the test data
**Solution:** Make sure you have:
```javascript
console.log(solution([2, 7, 11, 15], 9));  // ← Pass the data!
```

### No Output Showing
**Problem:** You forgot console.log
**Solution:** Make sure you have:
```javascript
console.log(solution([2, 7, 11, 15], 9));  // ← Use console.log!
```

## 🚀 Try It Now!

1. Copy the template above
2. Paste into your editor
3. Click "Run Code"
4. You should see: `[0,1]` `[1,2]` `[0,1]`

---

**That's it! You're ready to code!** 🎉
