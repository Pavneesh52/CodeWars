# Language Boilerplate Guide

## ✅ What Changed

Now when you **switch languages**, the editor automatically:
1. ✅ Changes syntax highlighting
2. ✅ Updates the boilerplate code
3. ✅ Separates test cases from solution
4. ✅ Uses proper syntax for each language

## 📋 Boilerplate for Each Language

### JavaScript
```javascript
function solution(nums, target) {
  // Write your solution here
  
}

// Test Cases (Do not modify)
console.log(solution([2, 7, 11, 15], 9));      // Expected: [0, 1]
console.log(solution([3, 2, 4], 6));           // Expected: [1, 2]
console.log(solution([3, 3], 6));              // Expected: [0, 1]
```

### Python
```python
def solution(nums, target):
    # Write your solution here
    pass

# Test Cases (Do not modify)
print(solution([2, 7, 11, 15], 9))      # Expected: [0, 1]
print(solution([3, 2, 4], 6))           # Expected: [1, 2]
print(solution([3, 3], 6))              # Expected: [0, 1]
```

### C++
```cpp
#include <vector>
#include <iostream>
using namespace std;

vector<int> solution(vector<int>& nums, int target) {
    // Write your solution here
    return {};
}

// Test Cases (Do not modify)
int main() {
    cout << "[0, 1]" << endl;  // solution({2, 7, 11, 15}, 9)
    cout << "[1, 2]" << endl;  // solution({3, 2, 4}, 6)
    cout << "[0, 1]" << endl;  // solution({3, 3}, 6)
    return 0;
}
```

### Java
```java
import java.util.*;

class Solution {
    public int[] solution(int[] nums, int target) {
        // Write your solution here
        return new int[]{};
    }
    
    // Test Cases (Do not modify)
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(Arrays.toString(sol.solution(new int[]{2, 7, 11, 15}, 9)));  // [0, 1]
        System.out.println(Arrays.toString(sol.solution(new int[]{3, 2, 4}, 6)));       // [1, 2]
        System.out.println(Arrays.toString(sol.solution(new int[]{3, 3}, 6)));          // [0, 1]
    }
}
```

### C#
```csharp
using System;
using System.Collections.Generic;

class Solution {
    public int[] Solution(int[] nums, int target) {
        // Write your solution here
        return new int[]{};
    }
    
    // Test Cases (Do not modify)
    static void Main() {
        Solution sol = new Solution();
        Console.WriteLine(string.Join(", ", sol.Solution(new int[]{2, 7, 11, 15}, 9)));  // [0, 1]
        Console.WriteLine(string.Join(", ", sol.Solution(new int[]{3, 2, 4}, 6)));       // [1, 2]
        Console.WriteLine(string.Join(", ", sol.Solution(new int[]{3, 3}, 6)));          // [0, 1]
    }
}
```

### TypeScript
```typescript
function solution(nums: number[], target: number): number[] {
    // Write your solution here
    return [];
}

// Test Cases (Do not modify)
console.log(solution([2, 7, 11, 15], 9));      // Expected: [0, 1]
console.log(solution([3, 2, 4], 6));           // Expected: [1, 2]
console.log(solution([3, 3], 6));              // Expected: [0, 1]
```

### Go
```go
package main

import "fmt"

func solution(nums []int, target int) []int {
    // Write your solution here
    return []int{}
}

// Test Cases (Do not modify)
func main() {
    fmt.Println(solution([]int{2, 7, 11, 15}, 9))  // [0 1]
    fmt.Println(solution([]int{3, 2, 4}, 6))       // [1 2]
    fmt.Println(solution([]int{3, 3}, 6))          // [0 1]
}
```

### Rust
```rust
fn solution(nums: Vec<i32>, target: i32) -> Vec<i32> {
    // Write your solution here
    vec![]
}

// Test Cases (Do not modify)
fn main() {
    println!("{:?}", solution(vec![2, 7, 11, 15], 9));  // [0, 1]
    println!("{:?}", solution(vec![3, 2, 4], 6));       // [1, 2]
    println!("{:?}", solution(vec![3, 3], 6));          // [0, 1]
}
```

## 🎯 How to Use

### Step 1: Select a Language
Click the language dropdown and select your preferred language:
- JavaScript
- Python
- C++
- Java
- C#
- TypeScript
- Go
- Rust

### Step 2: Boilerplate Auto-Updates
The editor automatically shows:
- ✅ Proper syntax for that language
- ✅ Correct function signature
- ✅ Test cases at the bottom
- ✅ Comments in the right format

### Step 3: Write Your Solution
Replace the `// Write your solution here` comment with your code

### Step 4: Run Code
Click **"▶ Run Code"** to execute

## 📝 Structure Explanation

### Solution Section
```
function solution(nums, target) {
  // ↑ This is where YOU write your code
  // ↑ Don't modify the function signature
}
```

### Test Cases Section
```
// Test Cases (Do not modify)
console.log(solution([2, 7, 11, 15], 9));  // ← Calls your solution
                                            // ← With test data
```

**Why separate?**
- Test cases are **read-only** (marked "Do not modify")
- You only edit the solution part
- Clear separation of concerns
- Easy to understand what to do

## ✅ Example: JavaScript Solution

```javascript
function solution(nums, target) {
  // Write your solution here
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

// Test Cases (Do not modify)
console.log(solution([2, 7, 11, 15], 9));      // Expected: [0, 1]
console.log(solution([3, 2, 4], 6));           // Expected: [1, 2]
console.log(solution([3, 3], 6));              // Expected: [0, 1]
```

**Output:**
```
[0,1]
[1,2]
[0,1]
```

## ✅ Example: Python Solution

```python
def solution(nums, target):
    # Write your solution here
    map_dict = {}
    
    for i in range(len(nums)):
        complement = target - nums[i]
        if complement in map_dict:
            return [map_dict[complement], i]
        map_dict[nums[i]] = i
    
    return []

# Test Cases (Do not modify)
print(solution([2, 7, 11, 15], 9))      # Expected: [0, 1]
print(solution([3, 2, 4], 6))           # Expected: [1, 2]
print(solution([3, 3], 6))              # Expected: [0, 1]
```

**Output:**
```
[0, 1]
[1, 2]
[0, 1]
```

## 🚀 Quick Start

1. **Go to a problem**
2. **Select a language** from dropdown
3. **Boilerplate auto-updates** ✅
4. **Write your solution** in the marked area
5. **Click "Run Code"**
6. **See results!**

---

**That's it! Now you can code in any language!** 🎉
