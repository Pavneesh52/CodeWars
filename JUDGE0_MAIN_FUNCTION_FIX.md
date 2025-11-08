# Judge0 Main Function Fix

## ✅ Problem Identified

Judge0 API compiles code as **standalone programs**, not as libraries. This means:
- ❌ Code WITHOUT main() → Compilation Error
- ✅ Code WITH main() → Works!

Error was:
```
undefined reference to `main'
collect2: error: ld returned 1 exit status
```

---

## ✅ What I Fixed

### C++ Boilerplate - NOW INCLUDES main()
```cpp
#include <vector>
#include <iostream>
using namespace std;

class Solution {
public:
    vector<int> solution(vector<int>& nums, int target) {
        // Write your solution here
        return {};
    }
};

// Main function for testing
int main() {
    Solution sol;
    vector<int> result = sol.solution({2, 7, 11, 15}, 9);
    for (int num : result) {
        cout << num << " ";
    }
    cout << endl;
    return 0;
}
```

### Java Boilerplate - NOW INCLUDES main()
```java
import java.util.*;

class Solution {
    public int[] solution(int[] nums, int target) {
        // Write your solution here
        return new int[]{};
    }
    
    // Main function for testing
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] result = sol.solution(new int[]{2, 7, 11, 15}, 9);
        for (int num : result) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}
```

---

## 🚀 Now Test Again

1. **Refresh browser** (Ctrl+R)
2. **Go to problem**
3. **Select C++**
4. **Write your solution** in the `solution()` function:
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
5. **Click "Run Code"**
6. **Should work now!** ✅

---

## 📝 How It Works

1. **You write code** in the `solution()` function
2. **main() calls your function** with test data
3. **main() prints the output**
4. **Judge0 compiles and runs** the entire program
5. **Output is displayed** ✅

---

## ✅ Files Updated

- `/frontend/src/components/CodeEditor.jsx` - Added main() to C++ and Java

---

**Refresh and test now!** 🎉
