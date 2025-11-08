# Language Switching Demo

## 🎯 What Happens When You Switch Languages

### Before: JavaScript Selected
```javascript
function solution(nums, target) {
  // Write your solution here
  
}

// Test Cases (Do not modify)
console.log(solution([2, 7, 11, 15], 9));      // Expected: [0, 1]
console.log(solution([3, 2, 4], 6));           // Expected: [1, 2]
console.log(solution([3, 3], 6));              // Expected: [0, 1]
```

### After: You Select "Python"
```python
def solution(nums, target):
    # Write your solution here
    pass

# Test Cases (Do not modify)
print(solution([2, 7, 11, 15], 9))      # Expected: [0, 1]
print(solution([3, 2, 4], 6))           # Expected: [1, 2]
print(solution([3, 3], 6))              # Expected: [0, 1]
```

✅ **Automatic Changes:**
- ✅ Syntax highlighting updated
- ✅ Function syntax changed to Python
- ✅ Comments changed to `#`
- ✅ Test cases use `print()` instead of `console.log()`
- ✅ Indentation changed to Python style

---

## 🔄 Step-by-Step Example

### Step 1: Start with JavaScript
```
Editor shows:
┌─────────────────────────────────────┐
│ function solution(nums, target) {   │
│   // Write your solution here       │
│                                     │
│ }                                   │
│                                     │
│ // Test Cases (Do not modify)       │
│ console.log(solution([2,7,11,15],9))│
│ ...                                 │
└─────────────────────────────────────┘
```

### Step 2: Click Language Dropdown
```
┌─────────────────────────────────────┐
│ [JavaScript ▼]                      │ ← Click here
│                                     │
│ Python                              │ ← Select Python
│ C++                                 │
│ Java                                │
│ ...                                 │
└─────────────────────────────────────┘
```

### Step 3: Boilerplate Auto-Updates!
```
Editor now shows:
┌─────────────────────────────────────┐
│ def solution(nums, target):         │
│     # Write your solution here      │
│     pass                            │
│                                     │
│ # Test Cases (Do not modify)        │
│ print(solution([2, 7, 11, 15], 9))  │
│ ...                                 │
└─────────────────────────────────────┘
```

✅ **Everything changed automatically!**

---

## 📋 All Available Languages

### 1. JavaScript
```javascript
function solution(nums, target) {
  // Write your solution here
}
```

### 2. Python
```python
def solution(nums, target):
    # Write your solution here
    pass
```

### 3. C++
```cpp
vector<int> solution(vector<int>& nums, int target) {
    // Write your solution here
    return {};
}
```

### 4. Java
```java
public int[] solution(int[] nums, int target) {
    // Write your solution here
    return new int[]{};
}
```

### 5. C#
```csharp
public int[] Solution(int[] nums, int target) {
    // Write your solution here
    return new int[]{};
}
```

### 6. TypeScript
```typescript
function solution(nums: number[], target: number): number[] {
    // Write your solution here
    return [];
}
```

### 7. Go
```go
func solution(nums []int, target int) []int {
    // Write your solution here
    return []int{}
}
```

### 8. Rust
```rust
fn solution(nums: Vec<i32>, target: i32) -> Vec<i32> {
    // Write your solution here
    vec![]
}
```

---

## 🎯 Key Points

### ✅ What's Automatic
- Language syntax highlighting
- Function signature
- Comment style
- Test case formatting
- Indentation style

### ✅ What You Control
- Your solution code
- Variable names
- Algorithm logic
- Comments you add

### ✅ What's Protected
- Test cases (marked "Do not modify")
- Function signature
- Test data

---

## 🚀 Quick Test

### Try This:

1. **Start with JavaScript**
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

2. **Switch to Python**
   - Boilerplate updates automatically
   - You see Python syntax

3. **Switch to C++**
   - Boilerplate updates again
   - You see C++ syntax

4. **Switch back to JavaScript**
   - Your code is still there!
   - Boilerplate is back to JavaScript

---

## 📝 Important Notes

### ✅ Test Cases Are Separate
```
┌─────────────────────────────────────┐
│ function solution(nums, target) {   │ ← Your code here
│   // YOUR SOLUTION                  │
│ }                                   │
│                                     │
│ // Test Cases (Do not modify)       │ ← Don't touch this
│ console.log(solution(...));         │
│ console.log(solution(...));         │
│ console.log(solution(...));         │
└─────────────────────────────────────┘
```

### ✅ Why Separate?
- Clear what you need to do
- Easy to understand
- Can't accidentally break tests
- Professional coding practice

### ✅ Language-Specific Comments
- JavaScript: `//` and `/* */`
- Python: `#`
- C++: `//` and `/* */`
- Java: `//` and `/* */`
- Go: `//` and `/* */`
- Rust: `//` and `/* */`

---

## 🎉 You're Ready!

Now you can:
1. ✅ Switch between 8 languages
2. ✅ See proper boilerplate for each
3. ✅ Keep test cases separate
4. ✅ Write clean, professional code

**Start coding!** 🚀
