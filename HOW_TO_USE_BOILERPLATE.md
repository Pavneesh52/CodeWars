# How to Use the Boilerplate with main()

## 🎯 Understanding the Structure

The boilerplate has TWO parts:

### Part 1: Solution Function (What YOU Write)
```cpp
class Solution {
public:
    vector<int> solution(vector<int>& nums, int target) {
        // ✏️ WRITE YOUR SOLUTION HERE
        return {};
    }
};
```

### Part 2: Main Function (For Testing)
```cpp
int main() {
    Solution sol;
    
    // Test Case 1
    vector<int> nums1 = {2, 7, 11, 15};
    int target1 = 9;
    vector<int> result1 = sol.solution(nums1, target1);
    // ... prints output
    
    // Test Case 2
    // ... more test cases
    
    return 0;
}
```

---

## 📝 How to Use

### Step 1: Write Your Solution
Replace the `// Write your solution here` with your code:

```cpp
class Solution {
public:
    vector<int> solution(vector<int>& nums, int target) {
        vector<int> result;
        for (int i = 0; i < nums.size(); i++) {
            for (int j = i + 1; j < nums.size(); j++) {
                if (nums[i] + nums[j] == target) {
                    result.push_back(i);
                    result.push_back(j);
                    return result;
                }
            }
        }
        return result;
    }
};
```

### Step 2: (Optional) Modify Test Cases
The main() has 3 test cases. You can:
- **Keep them as is** - they match the problem examples
- **Modify them** - change nums and target values
- **Add more** - add Test Case 4, 5, etc.

Example - modify Test Case 1:
```cpp
// Test Case 1
vector<int> nums1 = {1, 2, 3, 4};  // Changed from {2, 7, 11, 15}
int target1 = 5;                    // Changed from 9
vector<int> result1 = sol.solution(nums1, target1);
```

### Step 3: Click "Run Code"
The main() function will:
1. Create a Solution object
2. Call your solution() with test data
3. Print the results
4. Show output

---

## 🎯 Expected Output

For the Two Sum problem:

```
0 1
1 2
0 1
```

This is:
- Test Case 1: `[2, 7, 11, 15]`, target=9 → `[0, 1]`
- Test Case 2: `[3, 2, 4]`, target=6 → `[1, 2]`
- Test Case 3: `[3, 3]`, target=6 → `[0, 1]`

---

## ✅ Why We Need main()

Judge0 compiles code as **standalone programs**:
- ❌ Without main() → Compilation Error
- ✅ With main() → Works!

The main() function:
1. Creates an instance of your Solution class
2. Calls your solution() function
3. Prints the output
4. Allows Judge0 to compile and run

---

## 💡 Tips

1. **Don't modify the Solution class signature** - keep `vector<int> solution(vector<int>& nums, int target)`
2. **Only write code inside the solution() function** - that's your actual solution
3. **The main() is just for testing** - it calls your solution with test data
4. **You can modify test cases** - change the values in main() to test different inputs

---

## 🚀 Example: Complete Solution

```cpp
#include <vector>
#include <iostream>
using namespace std;

class Solution {
public:
    vector<int> solution(vector<int>& nums, int target) {
        // YOUR SOLUTION
        vector<int> result;
        for (int i = 0; i < nums.size(); i++) {
            for (int j = i + 1; j < nums.size(); j++) {
                if (nums[i] + nums[j] == target) {
                    result.push_back(i);
                    result.push_back(j);
                    return result;
                }
            }
        }
        return result;
    }
};

// Main function - modify test cases as needed
int main() {
    Solution sol;
    
    // Test Case 1
    vector<int> nums1 = {2, 7, 11, 15};
    int target1 = 9;
    vector<int> result1 = sol.solution(nums1, target1);
    for (int num : result1) cout << num << " ";
    cout << endl;
    
    // Test Case 2
    vector<int> nums2 = {3, 2, 4};
    int target2 = 6;
    vector<int> result2 = sol.solution(nums2, target2);
    for (int num : result2) cout << num << " ";
    cout << endl;
    
    // Test Case 3
    vector<int> nums3 = {3, 3};
    int target3 = 6;
    vector<int> result3 = sol.solution(nums3, target3);
    for (int num : result3) cout << num << " ";
    cout << endl;
    
    return 0;
}
```

---

**Now you understand how to use the boilerplate!** 🎉
